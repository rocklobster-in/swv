import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function MaxFilesizeRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MaxFilesizeRule.RULE_NAME = "maxfilesize";

MaxFilesizeRule.prototype = {
  /**
   * Validates the form data according to the logic defined by the rule.
   *
   * @param {Object} formDataTree - FormDataTree object to validate.
   * @param {Object} context - Optional context.
   */
  validate(formDataTree, context) {
    const files = flatten(formDataTree.getAllFiles(this.field));

    if (!files.length) {
      return true;
    }

    const threshold = parseInt(this.threshold);

    const totalVolume = files.reduce((accumulator, current) => {
      if (current instanceof File) {
        accumulator += current.size;
      }

      return accumulator;
    }, 0);

    if (!Number.isNaN(threshold) && threshold < totalVolume) {
      throw new Invalidity(this, { cause: totalVolume });
    }

    return true;
  },
};

Object.setPrototypeOf(MaxFilesizeRule.prototype, AbstractRule.prototype);

import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule";
import { InvalidityException as Invalidity } from "../invalidity-exception";

export function MinFilesizeRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MinFilesizeRule.RULE_NAME = "minfilesize";

MinFilesizeRule.prototype = {
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

    if (!Number.isNaN(threshold) && totalVolume < threshold) {
      throw new Invalidity(this, { cause: totalVolume });
    }

    return true;
  },
};

Object.setPrototypeOf(MinFilesizeRule.prototype, AbstractRule.prototype);

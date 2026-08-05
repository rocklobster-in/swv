import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function MinLengthRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MinLengthRule.RULE_NAME = "minlength";

MinLengthRule.prototype = {
  /**
   * Validates the form data according to the logic defined by the rule.
   *
   * @param {Object} formDataTree - FormDataTree object to validate.
   * @param {Object} context - Optional context.
   */
  validate(formDataTree, context) {
    const values = flatten(formDataTree.getAll(this.field));

    if (!values.length) {
      return true;
    }

    const threshold = parseInt(this.threshold);

    const totalLength = values.reduce((accumulator, current) => {
      return accumulator + current.length;
    }, 0);

    if (!Number.isNaN(threshold) && totalLength < threshold) {
      throw new Invalidity(this, { cause: totalLength });
    }

    return true;
  },
};

Object.setPrototypeOf(MinLengthRule.prototype, AbstractRule.prototype);

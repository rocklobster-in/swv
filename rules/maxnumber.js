import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { NumberRule } from "./number.js";
import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function MaxNumberRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MaxNumberRule.RULE_NAME = "maxnumber";

MaxNumberRule.prototype = {
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

    const threshold = parseFloat(this.threshold);

    if (Number.isNaN(threshold)) {
      return true;
    }

    for (const value of values) {
      if (NumberRule.isNumber(value) && threshold < parseFloat(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(MaxNumberRule.prototype, AbstractRule.prototype);

import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { DateRule } from "./date.js";
import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function MaxDateRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MaxDateRule.RULE_NAME = "maxdate";

MaxDateRule.prototype = {
  /**
   * Validates the form data according to the logic defined by the rule.
   *
   * @param {Object} formDataTree - FormDataTree object to validate.
   * @param {Object} context - Optional context.
   */
  validate(formDataTree, context) {
    const values = flatten(formDataTree.getAll(this.field));

    if (!values.length || !DateRule.isDate(this.threshold)) {
      return true;
    }

    for (const value of values) {
      if (DateRule.isDate(value) && this.threshold < value) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(MaxDateRule.prototype, AbstractRule.prototype);

import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function EnumRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.accept = properties.accept;
}

EnumRule.RULE_NAME = "enum";

EnumRule.prototype = {
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

    for (const value of values) {
      if (!this.accept?.map(String).includes(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(EnumRule.prototype, AbstractRule.prototype);

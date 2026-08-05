import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function NumberRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

NumberRule.RULE_NAME = "number";

NumberRule.prototype = {
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
      if (!NumberRule.isNumber(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(NumberRule.prototype, AbstractRule.prototype);

/**
 * Returns true if the given string is a well-formed number.
 *
 * @link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
 *
 * @param {string} text - String to check.
 */
NumberRule.isNumber = (text) => {
  if (/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(text)) {
    return true;
  }

  if (/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(text)) {
    return true;
  }

  return false;
};

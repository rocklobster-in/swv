import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function DateRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

DateRule.RULE_NAME = "date";

DateRule.prototype = {
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
      if (!DateRule.isDate(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(DateRule.prototype, AbstractRule.prototype);

/**
 * Returns true if the given string is a valid Gregorian date in
 * the YYYY-MM-DD format.
 *
 * @param {string} text - String to check.
 */
DateRule.isDate = (text) => {
  const result = /^(?<y>[0-9]{4,})-(?<m>[0-9]{2})-(?<d>[0-9]{2})$/.exec(text);

  if (null === result) {
    return false;
  }

  const date = new Date(text);

  return (
    !Number.isNaN(date.valueOf()) &&
    result.groups.y == date.getFullYear() &&
    result.groups.m == date.getMonth() + 1 &&
    result.groups.d == date.getDate()
  );
};

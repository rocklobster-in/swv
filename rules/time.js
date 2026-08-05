import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function TimeRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

TimeRule.RULE_NAME = "time";

TimeRule.prototype = {
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
      if (!TimeRule.isTime(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(TimeRule.prototype, AbstractRule.prototype);

/**
 * Returns true if the given string is a valid time.
 *
 * @link https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time)
 *
 * @param {string} text - String to check.
 */
TimeRule.isTime = (text) => {
  const pattern = /^([0-9]{2})\:([0-9]{2})(?:\:([0-9]{2}))?$/;
  const matches = text.match(pattern);

  if (!matches) {
    return false;
  }

  const hour = parseInt(matches[1]);
  const minute = parseInt(matches[2]);
  const second = matches[3] ? parseInt(matches[3]) : 0;

  return (
    0 <= hour &&
    hour <= 23 &&
    0 <= minute &&
    minute <= 59 &&
    0 <= second &&
    second <= 59
  );
};

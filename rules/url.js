import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function URLRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

URLRule.RULE_NAME = "url";

URLRule.prototype = {
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
      if (!URLRule.isUrl(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(URLRule.prototype, AbstractRule.prototype);

/**
 * Returns true if the given string is a well-formed URL.
 *
 * @param {string} text - String to check.
 */
URLRule.isUrl = (text) => {
  const allowedProtocols = ["http", "https"];

  try {
    const urlObj = new URL(text);
    const protocol = urlObj.protocol.replace(/:$/, "");
    return allowedProtocols.includes(protocol);
  } catch {
    return false;
  }
};

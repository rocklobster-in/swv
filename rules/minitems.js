import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule";
import { InvalidityException as Invalidity } from "../invalidity-exception";

export function MinItemsRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MinItemsRule.RULE_NAME = "minitems";

MinItemsRule.prototype = {
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

    if (!Number.isNaN(threshold) && values.length < threshold) {
      throw new Invalidity(this, { cause: values.length });
    }

    return true;
  },
};

Object.setPrototypeOf(MinItemsRule.prototype, AbstractRule.prototype);

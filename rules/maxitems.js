import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule";
import { InvalidityException as Invalidity } from "../invalidity-exception";

export function MaxItemsRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.threshold = properties.threshold;
}

MaxItemsRule.RULE_NAME = "maxitems";

MaxItemsRule.prototype = {
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

    if (!Number.isNaN(threshold) && threshold < values.length) {
      throw new Invalidity(this, { cause: values.length });
    }

    return true;
  },
};

Object.setPrototypeOf(MaxItemsRule.prototype, AbstractRule.prototype);

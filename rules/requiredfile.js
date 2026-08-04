import FormDataTree from "@rocklobsterinc/form-data-tree";

import { flatten } from "@rocklobsterinc/functions";

import { AbstractRule } from "../abstract-rule";
import { InvalidityException as Invalidity } from "../invalidity-exception";

export function RequiredFileRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

RequiredFileRule.RULE_NAME = "requiredfile";

RequiredFileRule.prototype = {
  /**
   * Validates the form data according to the logic defined by the rule.
   *
   * @param {Object} formDataTree - FormDataTree object to validate.
   * @param {Object} context - Optional context.
   */
  validate(formDataTree, context) {
    const files = flatten(formDataTree.getAllFiles(this.field));

    if (!files.length) {
      throw new Invalidity(this);
    }

    return true;
  },
};

Object.setPrototypeOf(RequiredFileRule.prototype, AbstractRule.prototype);

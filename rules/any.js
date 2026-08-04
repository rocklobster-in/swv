import FormDataTree from "@rocklobsterinc/form-data-tree";

import { CompositeRule } from "../composite-rule";
import { InvalidityException as Invalidity } from "../invalidity-exception";

export function AnyRule(properties) {
  CompositeRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
}

AnyRule.RULE_NAME = "any";

AnyRule.prototype = {
  /**
   * Validates the form data according to the logic defined by the rule.
   *
   * @param {Object} formDataTree - FormDataTree object to validate.
   * @param {Object} context - Optional context.
   */
  validate(formDataTree, context) {
    const rules = (this.rules ?? []).filter((rule) => rule.matches(context));

    if (!rules.length) {
      return true;
    }

    let isValid = null;

    for (const rule of rules) {
      try {
        isValid = true;
        rule.validate(formDataTree, context);
      } catch (error) {
        if (error instanceof Invalidity) {
          isValid = false;
        } else {
          throw error;
        }
      }

      if (isValid) {
        break;
      }
    }

    if (false === isValid) {
      throw new Invalidity(this);
    }

    return true;
  },
};

Object.setPrototypeOf(AnyRule.prototype, CompositeRule.prototype);

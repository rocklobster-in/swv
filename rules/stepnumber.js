import FormDataTree from "@rocklobsterinc/form-data-tree";
import { flatten } from "@rocklobsterinc/functions";

import { NumberRule } from "./number.js";
import { AbstractRule } from "../abstract-rule.js";
import { InvalidityException as Invalidity } from "../invalidity-exception.js";

export function StepNumberRule(properties) {
  AbstractRule.call(this);

  this.field = properties.field;
  this.error = properties.error;
  this.base = properties.base;
  this.interval = properties.interval;
}

StepNumberRule.RULE_NAME = "stepnumber";

StepNumberRule.prototype = {
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

    const base = parseFloat(this.base);
    const interval = parseFloat(this.interval);

    if (Number.isNaN(base) || Number.isNaN(interval) || !(0 < interval)) {
      return true;
    }

    const matchesStep = (text) => {
      const remainder = (parseFloat(text) - base) % interval;

      if (
        "0.000000" === Math.abs(remainder).toFixed(6) ||
        "0.000000" === Math.abs(remainder - interval).toFixed(6)
      ) {
        return true;
      }

      return false;
    };

    for (const value of values) {
      if (NumberRule.isNumber(value) && !matchesStep(value)) {
        throw new Invalidity(this, { cause: value });
      }
    }

    return true;
  },
};

Object.setPrototypeOf(StepNumberRule.prototype, AbstractRule.prototype);

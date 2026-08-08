import { strict as assert } from "node:assert";
import FormDataTree from "@rocklobsterinc/form-data-tree";
import { rulesDictionary } from "../../rules/index.js";
import { InvalidityException } from "../../invalidity-exception.js";

const ruleName = "dayofweek";
const ruleConstructor = rulesDictionary.get(ruleName);

const valids = [
  { value: "", accept: [1, 3, 5] }, // blank
  { value: "Monday", accept: [1, 3, 5] }, // non-date
  { value: "2026-07-27", accept: [1, 3, 5] }, // valid
];

const invalids = [
  { value: "2026-07-26", accept: [1, 3, 5] }, // invalid
];

describe(ruleConstructor.name, function () {
  const testValidity = ({ value, accept }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
        accept,
      });

      const formData = new FormData();
      formData.append("the-field-name", value);

      const formDataTree = FormDataTree.from(formData);

      let result;

      try {
        result = rule.validate(formDataTree);
      } catch (error) {
        if (!(error instanceof InvalidityException)) {
          throw error;
        }
      }

      assert(result);
    };

  const testInvalidity = ({ value, accept }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
        accept,
        error: "Just another error message.",
      });

      const formData = new FormData();
      formData.append("the-field-name", value);

      const formDataTree = FormDataTree.from(formData);

      let invalidity;

      try {
        rule.validate(formDataTree);
      } catch (error) {
        if (error instanceof InvalidityException) {
          invalidity = error;
        } else {
          throw error;
        }
      }

      assert(invalidity instanceof InvalidityException);
      assert(invalidity.message === rule.error);
    };

  valids.forEach((params) => {
    it(`should validate ${JSON.stringify(params)}`, testValidity(params));
  });

  invalids.forEach((params) => {
    it(`should invalidate ${JSON.stringify(params)}`, testInvalidity(params));
  });
});

import { strict as assert } from "node:assert";
import FormDataTree from "@rocklobsterinc/form-data-tree";
import { rulesDictionary } from "../../rules/index.js";
import { InvalidityException } from "../../invalidity-exception.js";

const ruleName = "maxlength";
const ruleConstructor = rulesDictionary.get(ruleName);

const valids = [
  { value: "", threshold: 6 }, // blank
  { value: "abc一二三", threshold: 6 }, // valid
];

const invalids = [
  { value: "abc一二🥺", threshold: 6 }, // invalid
];

describe(ruleConstructor.name, function () {
  const testValidity = ({ value, threshold }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
        threshold,
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

  const testInvalidity = ({ value, threshold }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
        threshold,
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

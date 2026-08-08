import { strict as assert } from "node:assert";
import FormDataTree from "@rocklobsterinc/form-data-tree";
import { rulesDictionary } from "../../rules/index.js";
import { InvalidityException } from "../../invalidity-exception.js";

const ruleName = "tel";
const ruleConstructor = rulesDictionary.get(ruleName);

const valids = [
  { value: "" }, // blank
  { value: "1234567" }, // valid
  { value: "+81 1234567" }, // country-coded
  { value: "1234567#abcdef" }, // with-extension
];

const invalids = [
  { value: "invalid tel" }, // invalid
  { value: "1234567890123456" }, // too-long
  { value: "12345" }, // too-short
];

describe(ruleConstructor.name, function () {
  const testValidity = ({ value }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
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

  const testInvalidity = ({ value }) =>
    function () {
      const rule = new ruleConstructor({
        field: "the-field-name",
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

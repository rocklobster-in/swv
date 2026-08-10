import { strict as assert } from "node:assert";
import FormDataTree from "@rocklobsterinc/form-data-tree";
import { rulesDictionary } from "../../rules/index.js";
import { InvalidityException } from "../../invalidity-exception.js";

const ruleName = "file";
const ruleConstructor = rulesDictionary.get(ruleName);

const testFile = new File(["foo"], "foo.txt", {
  type: "text/plain",
});

const valids = [
  { value: null, accept: ["text/plain"] }, // blank
  { value: testFile, accept: ["text/plain"] }, // valid
  { value: testFile, accept: ["text/*"] }, // wildcard
  { value: testFile, accept: [".txt"] }, // extension
];

const invalids = [
  { value: testFile, accept: ["text/plane"] }, // invalid
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

import { strict as assert } from "node:assert";
import FormDataTree from "@rocklobsterinc/form-data-tree";
import { rulesDictionary } from "../../rules/index.js";
import { InvalidityException } from "../../invalidity-exception.js";

const ruleName = "any";
const ruleConstructor = rulesDictionary.get(ruleName);

describe(ruleConstructor.name, function () {
  const createRule = () => {
    const rule = new ruleConstructor({
      field: "field-3",
      error: "Just another error message.",
    });

    const RequiredRule = rulesDictionary.get("required");

    rule.addRule(
      new RequiredRule({
        field: "field-1",
        error: "Error in field-1.",
      }),
    );

    rule.addRule(
      new RequiredRule({
        field: "field-2",
        error: "Error in field-2.",
      }),
    );

    rule.addRule(
      new RequiredRule({
        field: "field-3",
        error: "Error in field-3.",
      }),
    );

    return rule;
  };

  const testValidity = () =>
    function () {
      const rule = createRule();

      const formData = new FormData();
      formData.append("field-1", "");
      formData.append("field-2", "1");
      formData.append("field-3", "");

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

  const testInvalidity = () =>
    function () {
      const rule = createRule();

      const formData = new FormData();
      formData.append("field-1", "");
      formData.append("field-2", "");
      formData.append("field-3", "");

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
      assert(invalidity.field === "field-3");
      assert(invalidity.message === "Just another error message.");
    };

  it("should validate when all rules are valid", testValidity());
  it("should invalidate when not all rules are valid", testInvalidity());
});

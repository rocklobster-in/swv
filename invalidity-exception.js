export function InvalidityException(rule, options = {}) {
  Error.call(this, rule.error ?? "");

  this.cause = options.cause;
  this.rule = rule;
}

InvalidityException.prototype = {
  get name() {
    return "InvalidityException";
  },

  get message() {
    if (this.cause instanceof InvalidityException) {
      return this.cause.message;
    }

    return this.rule.error ?? "";
  },

  get field() {
    if (this.cause instanceof InvalidityException) {
      return this.cause.field;
    }

    return this.rule.field ?? "";
  },
};

Object.setPrototypeOf(InvalidityException.prototype, Error.prototype);

export function InvalidityException(rule, options = {}) {
  const { error } = rule;

  Error.call(this, error, options);

  this.rule = rule;
}

InvalidityException.prototype = {
  get name() {
    return "InvalidityException";
  },

  get message() {
    return this.cause?.error ?? this.rule.error ?? "";
  },

  get field() {
    return this.cause?.field ?? this.rule.field ?? "";
  },
};

Object.setPrototypeOf(InvalidityException.prototype, Error.prototype);

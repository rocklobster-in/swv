export function InvalidityException( { rule, field, error, ...properties } ) {
	this.name = 'InvalidityException';
	this.message = error;
	this.rule = rule;
	this.field = field;
	this.properties = properties;
}

Object.setPrototypeOf( InvalidityException.prototype, Error.prototype );

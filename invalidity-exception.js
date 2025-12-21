export function InvalidityException( options ) {
	{ message: error, cause, rule, field, ...properties } = options;

	Error.call( this, message, { cause } );

	this.name = 'InvalidityException';
	this.rule = rule;
	this.field = field;
	this.properties = properties;
}

Object.setPrototypeOf( InvalidityException.prototype, Error.prototype );

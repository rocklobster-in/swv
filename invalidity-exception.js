export function InvalidityException( rule, options = {} ) {
	const { error } = rule;

	Error.call( this, error, options );

	this.rule = rule;
}

InvalidityException.prototype.name = 'InvalidityException';

Object.setPrototypeOf( InvalidityException.prototype, Error.prototype );

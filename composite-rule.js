import { AbstractRule } from './abstract-rule';

export function CompositeRule() {
	this.rules = [];
}

CompositeRule.prototype.addRule = function ( rule ) {
	if ( ! ( rule instanceof AbstractRule ) ) {
		throw new TypeError( "'rule' is not a rule object" );
	}

	this.rules.push( rule );

	return true;
}

Object.setPrototypeOf( CompositeRule.prototype, AbstractRule.prototype );

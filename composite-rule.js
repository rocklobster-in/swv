import { AbstractRule } from './abstract-rule';

export function CompositeRule() {
	this.rules = [];
}


CompositeRule.prototype = {

	addRule( rule ) {
		if ( ! ( rule instanceof AbstractRule ) ) {
			throw new TypeError( "'rule' is not a rule object" );
		}

		this.rules.push( rule );

		return true;
	},

	toJSON() {
		const properties = [];

		Object.entries( this ).forEach( ( [ key, value ] ) => {
			if ( 'rules' === key ) {
				properties.push( [ key, value.map( rule => rule.toJSON() ) ] );
			} else {
				properties.push( [ key, value ] );
			}
		} );

		if ( this.constructor.RULE_NAME ) {
			properties.unshift( [ 'rule', this.constructor.RULE_NAME ] );
		}

		return Object.fromEntries( properties );
	},

};


Object.setPrototypeOf( CompositeRule.prototype, AbstractRule.prototype );

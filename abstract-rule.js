export function AbstractRule() {}


AbstractRule.prototype = {

	matches( context ) {
		return true;
	},

	validate( formDataTree, context ) {
		return true;
	},

	toJSON() {
		const properties = [];

		Object.entries( this ).forEach( ( [ key, value ] ) => {
			properties.push( [ key, value ] );
		} );

		if ( this.constructor.RULE_NAME ) {
			properties.unshift( [ 'rule', this.constructor.RULE_NAME ] );
		}

		return Object.fromEntries( properties );
	},

};

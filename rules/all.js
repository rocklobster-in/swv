import FormDataTree from '@rocklobsterinc/form-data-tree';

import { CompositeRule } from '../composite-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';

export function AllRule( properties ) {
	CompositeRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
}

AllRule.RULE_NAME = 'all';

AllRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {
		const rules = ( this.rules ?? [] ).filter( rule => rule.matches( context ) );

		if ( ! rules.length ) {
			return true;
		}

		for ( const rule of rules ) {
			try {
				rule.validate( formDataTree, context );
			} catch ( error ) {
				if ( error instanceof Invalidity ) {
					throw new Invalidity( this, { cause: error } );
				} else {
					throw error;
				}
			}
		}

		return true;
	},

};

Object.setPrototypeOf( AllRule.prototype, CompositeRule.prototype );

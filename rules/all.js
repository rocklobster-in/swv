import FormDataTree from '@rocklobsterinc/form-data-tree';

import { CompositeRule } from '../composite-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { rules as availableRules } from './index';

export function AllRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;

	for ( const rule of properties.rules ) {
		if ( availableRules.has( rule.rule ) ) {
			const Constructor = availableRules.get( rule.rule );
			this.addRule( new Constructor( rule ) );
		}
	}
}

AllRule.RULE_NAME = 'all';

Object.setPrototypeOf( AllRule.prototype, CompositeRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
AllRule.prototype.validate = function ( formDataTree, context ) {
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
}

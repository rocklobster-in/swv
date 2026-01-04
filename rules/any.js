import FormDataTree from '@rocklobsterinc/form-data-tree';

import { CompositeRule } from '../composite-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { rules as availableRules } from './index';

export function AnyRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;

	for ( const rule of properties.rules ) {
		if ( availableRules.has( rule.rule ) ) {
			const Constructor = availableRules.get( rule.rule );
			this.addRule( new Constructor( rule ) );
		}
	}
}

AnyRule.RULE_NAME = 'any';

Object.setPrototypeOf( AnyRule.prototype, CompositeRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
AnyRule.prototype.validate = function ( formDataTree, context ) {
	const rules = ( this.rules ?? [] ).filter( rule => rule.matches( context ) );

	if ( ! rules.length ) {
		return true;
	}

	let isValid = null;

	for ( const rule of rules ) {
		try {
			isValid = true;
			rule.validate( formDataTree, context );
		} catch ( error ) {
			if ( error instanceof Invalidity ) {
				isValid = false;
			} else {
				throw error;
			}
		}

		if ( isValid ) {
			break;
		}
	}

	if ( false === isValid ) {
		throw new Invalidity( this );
	}

	return true;
}

import FormDataTree from '@rocklobsterinc/form-data-tree';

import { NumberRule } from './number';
import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MinNumberRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

MinNumberRule.RULE_NAME = 'minnumber';

Object.setPrototypeOf( MinNumberRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MinNumberRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseFloat( this.threshold );

	if ( Number.isNaN( threshold ) ) {
		return true;
	}

	for ( const value of values ) {
		if ( NumberRule.isNumber( value ) && parseFloat( value ) < threshold ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

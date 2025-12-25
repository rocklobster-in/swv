import FormDataTree from '@rocklobsterinc/form-data-tree';

import { NumberRule } from './number';
import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MaxNumberRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

Object.setPrototypeOf( MaxNumberRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MaxNumberRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseFloat( this.threshold );

	if ( Number.isNaN( threshold ) ) {
		return true;
	}

	for ( const value of values ) {
		if ( NumberRule.isNumber( value ) && threshold < parseFloat( value ) ) {
			throw new Invalidity( { ...this, cause: value } );
		}
	}

	return true;
}

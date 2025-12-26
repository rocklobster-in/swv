import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MaxLengthRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

Object.setPrototypeOf( MaxLengthRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MaxLengthRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseInt( this.threshold );

	const totalLength = values.reduce( ( accumulator, current ) => {
		return accumulator + current.length;
	}, 0 );

	if ( ! Number.isNaN( threshold ) && threshold < totalLength ) {
		throw new Invalidity( this, { cause: totalLength } );
	}

	return true;
}

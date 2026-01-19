import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MinLengthRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

MinLengthRule.RULE_NAME = 'minlength';

Object.setPrototypeOf( MinLengthRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MinLengthRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseInt( this.threshold );

	const totalLength = values.reduce( ( accumulator, current ) => {
		return accumulator + current.length;
	}, 0 );

	if ( ! Number.isNaN( threshold ) && totalLength < threshold ) {
		throw new Invalidity( this, { cause: totalLength } );
	}

	return true;
}

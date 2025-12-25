import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MinItemsRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

Object.setPrototypeOf( MinItemsRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MinItemsRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseInt( this.threshold );

	if ( ! Number.isNaN( threshold ) && values.length < threshold ) {
		throw new Invalidity( { ...this, cause: values.length } );
	}

	return true;
}

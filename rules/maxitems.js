import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MaxItemsRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

MaxItemsRule.RULE_NAME = 'maxitems';

MaxItemsRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {

	},

};

Object.setPrototypeOf( MaxItemsRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MaxItemsRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const threshold = parseInt( this.threshold );

	if ( ! Number.isNaN( threshold ) && threshold < values.length ) {
		throw new Invalidity( this, { cause: values.length } );
	}

	return true;
}

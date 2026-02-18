import FormDataTree from '@rocklobsterinc/form-data-tree';

import { DateRule } from './date';
import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MinDateRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

MinDateRule.RULE_NAME = 'mindate';

MinDateRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {

	},

};

Object.setPrototypeOf( MinDateRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MinDateRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length || ! DateRule.isDate( this.threshold ) ) {
		return true;
	}

	for ( const value of values ) {
		if ( DateRule.isDate( value ) && value < this.threshold ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

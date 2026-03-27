import FormDataTree from '@rocklobsterinc/form-data-tree';

import { flatten } from '@rocklobsterinc/functions';

import { DateRule } from './date';
import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';

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
		const values = flatten( formDataTree.getAll( this.field ) );

		if ( ! values.length || ! DateRule.isDate( this.threshold ) ) {
			return true;
		}

		for ( const value of values ) {
			if ( DateRule.isDate( value ) && value < this.threshold ) {
				throw new Invalidity( this, { cause: value } );
			}
		}

		return true;
	},

};

Object.setPrototypeOf( MinDateRule.prototype, AbstractRule.prototype );

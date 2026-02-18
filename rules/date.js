import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function DateRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
}

DateRule.RULE_NAME = 'date';

DateRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {

	},

};

Object.setPrototypeOf( DateRule.prototype, AbstractRule.prototype );


/**
 * Returns true if the given string is a valid Gregorian date in
 * the YYYY-MM-DD format.
 *
 * @param {string} text - String to check.
 */
DateRule.isDate = text => {
	if ( ! /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text ) ) {
		return false;
	}

	const date = new Date( text );

	return ! Number.isNaN( date.valueOf() );
};


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
DateRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	for ( const value of values ) {
		if ( ! DateRule.isDate( value ) ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

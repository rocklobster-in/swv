import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function NumberRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
}

NumberRule.RULE_NAME = 'number';

Object.setPrototypeOf( NumberRule.prototype, AbstractRule.prototype );


/**
 * Returns true if the given string is a well-formed number.
 *
 * @link https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
 *
 * @param {string} text - String to check.
 */
NumberRule.isNumber = text => {
	if ( /^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test( text ) ) {
		return true;
	}

	if ( /^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test( text ) ) {
		return true;
	}

	return false;
};


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
NumberRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	for ( const value of values ) {
		if ( ! NumberRule.isNumber( value ) ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

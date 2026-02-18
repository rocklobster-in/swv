import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function TelRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
}

TelRule.RULE_NAME = 'tel';

TelRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {
		const values = flattenTree( formDataTree.getAll( this.field ) );

		if ( ! values.length ) {
			return true;
		}

		for ( const value of values ) {
			if ( ! TelRule.isTel( value ) ) {
				throw new Invalidity( this, { cause: value } );
			}
		}

		return true;
	},

};

Object.setPrototypeOf( TelRule.prototype, AbstractRule.prototype );


/**
 * Returns true if the given string is a well-formed telephone number.
 *
 * @param {string} text - String to check.
 */
TelRule.isTel = text => {
	text = text.replace( /[#*].*$/, '' ); // Remove extension
	text = text.replaceAll( /[()/.*#\s-]+/g, '' );

	const international = text.startsWith( '+' ) || text.startsWith( '00' );

	if ( international ) {
		text = `+${ text.replace( /^[+0]+/, '' ) }`;
	}

	if ( ! /^[+]?[0-9]+$/.test( text ) ) {
		return false;
	}

	if ( ! ( 5 < text.length && text.length < 16 ) ) {
		return false;
	}

	return true;
};

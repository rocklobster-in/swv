import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function EmailRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
}

Object.setPrototypeOf( EmailRule.prototype, AbstractRule.prototype );


/**
 * Returns true if the given string is a valid email address. This method
 * follows WordPress's is_email() implementation.
 *
 * @link https://developer.wordpress.org/reference/functions/is_email/
 *
 * @param {string} text - String to check.
 */
EmailRule.isEmail = text => {
	if ( text.length < 6 ) {
		return false;
	}

	if ( text.indexOf( '@', 1 ) === -1 ) {
		return false;
	}

	if ( text.indexOf( '@' ) !== text.lastIndexOf( '@' ) ) {
		return false;
	}

	const [ local, domain ] = text.split( '@', 2 );

	if ( ! /^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test( local ) ) {
		return false;
	}

	if ( /\.{2,}/.test( domain ) ) {
		return false;
	}

	if ( /(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test( domain ) ) {
		return false;
	}

	const subs = domain.split( '.' );

	if ( subs.length < 2 ) {
		return false;
	}

	for ( const sub of subs ) {
		if ( /(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test( sub ) ) {
			return false;
		}

		if ( ! /^[a-z0-9-]+$/i.test( sub ) ) {
			return false;
		}
	}

	return true;
};


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
EmailRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	for ( const value of values ) {
		if ( ! EmailRule.isEmail( value ) ) {
			throw new Invalidity( { ...this, cause: value } );
		}
	}

	return true;
}

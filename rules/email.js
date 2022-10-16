import { ValidationError } from '../error';

/**
 * Verifies email fields have email values.
 */
export const email = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	// Equivalent to is_email()
	// https://developer.wordpress.org/reference/functions/is_email/
	const isValidEmail = text => {
		text = text.trim();

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

	if ( ! values.every( isValidEmail ) ) {
		throw new ValidationError( this );
	}
};
import { ValidationError } from '../error';

/**
 * Verifies required fields are filled in.
 */
export const required = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	if ( 0 === values.length ) {
		throw new ValidationError( this );
	}
};

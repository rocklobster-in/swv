import { ValidationError } from '../error';

/**
 * Verifies string values are not longer than threshold.
 */
export const maxlength = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	let totalLength = 0;

	values.forEach( text => {
		if ( 'string' === typeof text ) {
			totalLength += text.length;
		}
	} );

	if ( parseInt( this.threshold ) < totalLength ) {
		throw new ValidationError( this );
	}
};

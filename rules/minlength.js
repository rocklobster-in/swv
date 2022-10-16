import { ValidationError } from '../error';

/**
 * Verifies string values are not shorter than threshold.
 */
export const minlength = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	let totalLength = 0;

	values.forEach( text => {
		if ( 'string' === typeof text ) {
			totalLength += text.length;
		}
	} );

	if ( 0 !== totalLength && totalLength < parseInt( this.threshold ) ) {
		throw new ValidationError( this );
	}
};
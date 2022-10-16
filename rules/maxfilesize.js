import { ValidationError } from '../error';

/**
 * Verifies file values are not larger in file size than threshold.
 */
export const maxfilesize = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	let totalVolume = 0;

	values.forEach( file => {
		if ( file instanceof File ) {
			totalVolume += file.size;
		}
	} );

	if ( parseInt( this.threshold ) < totalVolume ) {
		throw new ValidationError( this );
	}
};

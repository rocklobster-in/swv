import { ValidationError } from '../error';

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

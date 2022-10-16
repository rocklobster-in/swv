import { ValidationError } from '../error';

export const minfilesize = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	let totalVolume = 0;

	values.forEach( file => {
		if ( file instanceof File ) {
			totalVolume += file.size;
		}
	} );

	if ( totalVolume < parseInt( this.threshold ) ) {
		throw new ValidationError( this );
	}
};

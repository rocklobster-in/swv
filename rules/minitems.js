import { ValidationError } from '../error';

export const minitems = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	if ( values.length < parseInt( this.threshold ) ) {
		throw new ValidationError( this );
	}
};

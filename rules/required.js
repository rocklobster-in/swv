import { ValidationError } from '../error';

export const required = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field ).filter(
		val => '' !== val.trim()
	);

	if ( 0 === values.length ) {
		throw new ValidationError( this );
	}
};

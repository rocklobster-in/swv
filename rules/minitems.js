import { ValidationError } from '../error';

export const minitems = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field ).filter(
		val => '' !== val.trim()
	);

	if ( values.length < parseInt( this.threshold ) ) {
		throw new ValidationError( this );
	}
};

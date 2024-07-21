import { ValidationError } from '../error';

export const maxitems = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field ).filter(
		val => '' !== val.trim()
	);

	if ( parseInt( this.threshold ) < values.length ) {
		throw new ValidationError( this );
	}
};

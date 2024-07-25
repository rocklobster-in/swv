import { ValidationError } from '../error';

export const tel = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isTelephoneNumber = text => {
		text = text.replaceAll( /[()/.*#\s-]+/g, '' );

		return /^[+]?[0-9]+$/.test( text );
	};

	if ( ! values.every( isTelephoneNumber ) ) {
		throw new ValidationError( this );
	}
};

import { ValidationError } from '../error';

export const tel = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isTelephoneNumber = text => {
		text = text.trim();
		text = text.replaceAll( /[()/.*#\s-]+/g, '' );

		return /^[+]?[0-9]+$/.test( text );
	};

	if ( ! values.every( isTelephoneNumber ) ) {
		throw new ValidationError( this );
	}
};

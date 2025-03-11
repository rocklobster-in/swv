import { ValidationError } from '../error';

export const tel = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isTelephoneNumber = text => {
		text = text.replace( /[#*].*$/, '' ); // Remove extension
		text = text.replaceAll( /[()/.*#\s-]+/g, '' );

		const international = text.startsWith( '+' ) || text.startsWith( '00' );

		if ( international ) {
			text = `+${ text.replace( /^[+0]+/, '' ) }`;
		}

		if ( ! /^[+]?[0-9]+$/.test( text ) ) {
			return false;
		}

		if ( ! ( 5 < text.length && text.length < 16 ) ) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isTelephoneNumber ) ) {
		throw new ValidationError( this );
	}
};

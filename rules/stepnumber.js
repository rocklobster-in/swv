import { ValidationError } from '../error';

export const stepnumber = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const base = parseFloat( this.base );
	const interval = parseFloat( this.interval );

	if ( ! ( 0 < interval ) ) {
		return true;
	}

	const matchesStep = text => {
		const remainder = ( parseFloat( text ) - base ) % interval;

		if (
			'0.000000' === Math.abs( remainder ).toFixed( 6 ) ||
			'0.000000' === Math.abs( remainder - interval ).toFixed( 6 )
		) {
			return true;
		}

		return false;
	};

	if ( ! values.every( matchesStep ) ) {
		throw new ValidationError( this );
	}
};

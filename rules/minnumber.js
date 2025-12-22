import { InvalidityException as Invalidity } from '../invalidity-exception';

export const minnumber = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isAcceptableNumber = text => {
		if ( parseFloat( text ) < parseFloat( this.threshold ) ) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableNumber ) ) {
		throw new Invalidity( this );
	}
};

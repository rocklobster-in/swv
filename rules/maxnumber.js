import { InvalidityException as Invalidity } from '../invalidity-exception';

export const maxnumber = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isAcceptableNumber = text => {
		if ( parseFloat( this.threshold ) < parseFloat( text ) ) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableNumber ) ) {
		throw new Invalidity( this );
	}
};

import { InvalidityException as Invalidity } from '../invalidity-exception';

export const date = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	// https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)
	const isValidDateString = text => {
		if ( ! /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text ) ) {
			return false;
		}

		const date = new Date( text );

		return ! Number.isNaN( date.valueOf() );
	};

	if ( ! values.every( isValidDateString ) ) {
		throw new Invalidity( this );
	}
};

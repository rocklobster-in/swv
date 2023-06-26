import { ValidationError } from '../error';

export const date = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	// https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)
	const isValidDateString = text => {
		text = text.trim();

		if ( ! /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text ) ) {
			return false;
		}

		const date = new Date( text );

		return ! Number.isNaN( date.valueOf() );
	};

	if ( ! values.every( isValidDateString ) ) {
		throw new ValidationError( this );
	}
};

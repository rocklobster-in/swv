import { ValidationError } from '../error';

export const date = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	// https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)
	const isValidDateString = text => {
		return /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text.trim() );
	};

	if ( ! values.every( isValidDateString ) ) {
		throw new ValidationError( this );
	}
};

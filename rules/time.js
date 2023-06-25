import { ValidationError } from '../error';

export const time = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	// https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time)
	const isValidTimeString = text => {
		const pattern = /^([0-9]{2})\:([0-9]{2})(?:\:([0-9]{2}))?$/;
		const matches = text.trim().match( pattern );

		if ( ! matches ) {
			return false;
		}

		const hour = parseInt( matches[1] );
		const minute = parseInt( matches[2] );
		const second = matches[3] ? parseInt( matches[3] ) : 0;

		return 0 <= hour && hour <= 23 &&
			0 <= minute && minute <= 59 &&
			0 <= second && second <= 59;
	};

	if ( ! values.every( isValidTimeString ) ) {
		throw new ValidationError( this );
	}
};

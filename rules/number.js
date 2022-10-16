import { ValidationError } from '../error';

export const number = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	// https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
	const isValidFloatingPointNumber = text => {
		text = text.trim();

		if ( /^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test( text ) ) {
			return true;
		}

		if ( /^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test( text ) ) {
			return true;
		}

		return false;
	};

	if ( ! values.every( isValidFloatingPointNumber ) ) {
		throw new ValidationError( this );
	}
};

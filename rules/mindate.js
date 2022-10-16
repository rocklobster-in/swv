import { ValidationError } from '../error';

/**
 * Verifies date values are not earlier than threshold.
 */
export const mindate = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableDate = text => {
		text = text.trim();

		if (
			/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text ) &&
			/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( this.threshold ) &&
			text < this.threshold
		) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableDate ) ) {
		throw new ValidationError( this );
	}
};

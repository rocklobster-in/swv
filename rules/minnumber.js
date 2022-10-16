import { ValidationError } from '../error';

/**
 * Verifies numerical values are not smaller than threshold.
 */
export const minnumber = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableNumber = text => {
		if ( parseFloat( text ) < parseFloat( this.threshold ) ) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableNumber ) ) {
		throw new ValidationError( this );
	}
};

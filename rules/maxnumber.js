import { ValidationError } from '../error';

/**
 * Verifies numerical values are not larger than threshold.
 */
export const maxnumber = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableNumber = text => {
		if ( parseFloat( this.threshold ) < parseFloat( text ) ) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableNumber ) ) {
		throw new ValidationError( this );
	}
};

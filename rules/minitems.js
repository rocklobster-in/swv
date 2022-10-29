import { ValidationError } from '../error';

export const minitems = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	if ( values.length < parseInt( this.threshold ) ) {
		throw new ValidationError( this );
	}
};

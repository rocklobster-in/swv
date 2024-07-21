import { ValidationError } from '../error';

export const enumeration = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableValue = value => this.accept?.some(
		acceptableValue => value.trim() === String( acceptableValue )
	);

	if ( ! values.every( isAcceptableValue ) ) {
		throw new ValidationError( this );
	}
};

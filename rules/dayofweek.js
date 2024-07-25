import { ValidationError } from '../error';

export const dayofweek = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const convertToIso8601 = jsDow => ( 0 === jsDow ) ? 7 : jsDow;

	const isAcceptableValue = value => {
		const date = new Date( value );
		const day = convertToIso8601( date.getDay() );

		return this.accept?.some(
			acceptableValue => day === parseInt( acceptableValue )
		);
	};

	if ( ! values.every( isAcceptableValue ) ) {
		throw new ValidationError( this );
	}
};

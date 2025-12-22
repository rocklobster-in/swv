import { InvalidityException as Invalidity } from '../invalidity-exception';

export const enumeration = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isAcceptableValue = value => this.accept?.some(
		acceptableValue => value === String( acceptableValue )
	);

	if ( ! values.every( isAcceptableValue ) ) {
		throw new Invalidity( this );
	}
};

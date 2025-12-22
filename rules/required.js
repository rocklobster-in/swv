import { InvalidityException as Invalidity } from '../invalidity-exception';

export const required = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	if ( 0 === values.length ) {
		throw new Invalidity( this );
	}
};

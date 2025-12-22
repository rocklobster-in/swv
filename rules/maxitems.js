import { InvalidityException as Invalidity } from '../invalidity-exception';

export const maxitems = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	if ( parseInt( this.threshold ) < values.length ) {
		throw new Invalidity( this );
	}
};

import { InvalidityException as Invalidity } from '../invalidity-exception';

export const maxlength = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	let totalLength = 0;

	values.forEach( text => {
		if ( 'string' === typeof text ) {
			totalLength += text.length;
		}
	} );

	if ( parseInt( this.threshold ) < totalLength ) {
		throw new Invalidity( this );
	}
};

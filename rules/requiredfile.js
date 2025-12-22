import { InvalidityException as Invalidity } from '../invalidity-exception';

export const requiredfile = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	if ( 0 === values.length ) {
		throw new Invalidity( this );
	}
};

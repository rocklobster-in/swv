import { InvalidityException as Invalidity } from '../invalidity-exception';

export const maxdate = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field )
		.map( val => val.trim() ).filter( val => '' !== val );

	const isAcceptableDate = text => {
		if (
			/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( text ) &&
			/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test( this.threshold ) &&
			this.threshold < text
		) {
			return false;
		}

		return true;
	};

	if ( ! values.every( isAcceptableDate ) ) {
		throw new Invalidity( this );
	}
};

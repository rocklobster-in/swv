import { ValidationError } from '../error';

export const maxdate = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableDate = text => {
		text = text.trim();

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
		throw new ValidationError( this );
	}
};

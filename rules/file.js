import { ValidationError } from '../error';
import { convertMimeToExt } from '../helpers';

/**
 * Verifies file fields have file values.
 */
export const file = function ( formDataTree ) {
	const values = formDataTree.getAll( this.field );

	const isAcceptableFile = file => {
		if ( file instanceof File ) {
			return this.accept?.some( fileType => {
				if ( /^\.[a-z0-9]+$/i.test( fileType ) ) {
					return file.name.toLowerCase().endsWith( fileType.toLowerCase() );
				} else {
					return convertMimeToExt( fileType ).some( ext => {
						ext = '.' + ext.trim();
						return file.name.toLowerCase().endsWith( ext.toLowerCase() );
					} );
				}
			} );
		}

		return false;
	};

	if ( ! values.every( isAcceptableFile ) ) {
		throw new ValidationError( this );
	}
};
import * as validators from '../rules';
import { ValidationError } from '../error';

export const all = function ( formDataTree, options = {} ) {
	const rules = ( this.rules ?? [] ).filter(
		( { rule, ...properties } ) => {
			if ( 'function' !== typeof validators[ rule ] ) {
				return false;
			}

			if ( 'function' === typeof validators[ rule ].matches ) {
				return validators[ rule ].matches( properties, options );
			}

			return true;
		}
	);

	const errors = [];

	const result = rules.every( ( { rule, ...properties } ) => {
		try {
			validators[ rule ].call( { rule, ...properties }, formDataTree, options );
		} catch ( error ) {
			if ( error instanceof ValidationError ) {
				errors.push( error );
				return false;
			}
		}

		return true;
	} );

	if ( ! result ) {
		throw new ValidationError(
			{ ...this, ...{ error: errors.shift().error } }
		);
	}
};

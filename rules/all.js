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

	rules.every( ( { rule, ...properties } ) => {
		try {
			validators[ rule ].call( { rule, ...properties }, formDataTree, options );
		} catch ( error ) {
			if ( error instanceof ValidationError ) {
				if ( undefined !== error.error ) {
					throw error;
				} else {
					return false;
				}
			}
		}

		return true;
	} );
};

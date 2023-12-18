import FormDataTree from '@contactable/form-data-tree';

import * as validators from './rules';
import * as helpers from './helpers';
import { ValidationError } from './error';

const validate = ( schema, formData, options = {} ) => {
	const rules = ( schema.rules ?? [] ).filter(
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

	if ( ! rules.length ) { // There is no rule to validate.
		return new Map();
	}

	const formDataTree = new FormDataTree( formData );

	const result = rules.reduce( ( result, current ) => {
		const { rule, ...properties } = current;

		if ( result.get( properties.field )?.error ) {
			return result;
		}

		try {
			validators[ rule ].call( { rule, ...properties }, formDataTree, options );
		} catch ( error ) {
			if ( error instanceof ValidationError ) {
				return result.set( properties.field, error );
			}
		}

		return result;
	}, new Map() );

	for ( const key of formDataTree.keys() ) {
		if ( ! result.has( key ) ) {
			result.set( key, { validInputs: formDataTree.getAll( key ) } );
		}
	}

	return result;
};

export {
	validators,
	validate,
	helpers,
	ValidationError
};

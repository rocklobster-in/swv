import FormDataTree from '@contactable/form-data-tree';

import * as validators from './rules';
import * as helpers from './helpers';
import { ruleMatches, defaultRuleHandler } from './rule-handler';
import { registerMiddleware, applyMiddlewares } from './middleware';
import { ValidationError } from './error';

const validate = ( schema, formData, options = {} ) => {
	const rules = ( schema.rules ?? [] ).filter(
		ruleObj => ruleMatches( { ruleObj, options } )
	);

	if ( ! rules.length ) { // There is no rule to validate.
		return new Map();
	}

	const enhancedRuleHandler = applyMiddlewares( defaultRuleHandler );

	const formDataTree = new FormDataTree( formData );

	const result = rules.reduce( ( result, current ) => {
		try {
			enhancedRuleHandler( { ruleObj: current, formDataTree, options } );
		} catch ( error ) {
			if ( error instanceof ValidationError ) {
				if (
					undefined !== error.field &&
					! result.has( error.field ) &&
					undefined !== error.error
				) {
					return result.set( error.field, error );
				}
			} else {
				throw error;
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
	registerMiddleware as use,
	helpers,
	ValidationError
};

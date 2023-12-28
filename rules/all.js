import { ruleMatches, defaultRuleHandler } from '../rule-handler';
import { applyMiddlewares } from '../middleware';
import { ValidationError } from '../error';

export const all = function ( formDataTree, options = {} ) {
	const rules = ( this.rules ?? [] ).filter(
		ruleObj => ruleMatches( { ruleObj, options } )
	);

	const enhancedRuleHandler = applyMiddlewares( defaultRuleHandler );

	const result = rules.every( ruleObj => {
		try {
			enhancedRuleHandler( { ruleObj, formDataTree, options } );
		} catch ( error ) {
			if ( error instanceof ValidationError ) {
				if ( undefined !== error.error ) {
					throw error;
				}
			} else {
				throw error;
			}

			return false;
		}

		return true;
	} );

	if ( ! result ) {
		throw new ValidationError( this );
	}
};

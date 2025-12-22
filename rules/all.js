import { ruleMatches, defaultRuleHandler } from '../rule-handler';
import { applyMiddlewares } from '../middleware';
import { InvalidityException as Invalidity } from '../invalidity-exception';

export const all = function ( formDataTree, options = {} ) {
	const rules = ( this.rules ?? [] ).filter(
		ruleObj => ruleMatches( { ruleObj, options } )
	);

	const enhancedRuleHandler = applyMiddlewares( defaultRuleHandler );

	const result = rules.every( ruleObj => {
		try {
			enhancedRuleHandler( { ruleObj, formDataTree, options } );
		} catch ( error ) {
			if ( error instanceof Invalidity ) {
				if ( undefined !== error.message ) {
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
		throw new Invalidity( this );
	}
};

import * as validators from './rules';

export const ruleMatches = ( { ruleObj, options } ) => {
	const { rule, ...properties } = ruleObj;

	if ( 'function' !== typeof validators[ rule ] ) {
		return false;
	}

	if ( 'function' === typeof validators[ rule ].matches ) {
		return validators[ rule ].matches( properties, options );
	}

	return true;
};

export const defaultRuleHandler = ( { ruleObj, formDataTree, options } ) => {
	const { rule } = ruleObj;

	validators[ rule ].call( ruleObj, formDataTree, options );
};

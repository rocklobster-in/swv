
/**
 * Converts a multi-layered map to a flat array.
 */
export const flattenTree = ( tree ) => {
	if ( tree instanceof Map ) {
		const result = [];

		for ( const [ key, value ] of tree ) {
			result.push( ...flattenTree( value ) );
		}

		return result;
	}

	return [ tree ];
};

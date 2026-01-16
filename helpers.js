
/**
 * Converts a multi-layered object to a flat array.
 */
export const flattenTree = ( tree ) => {
	if ( Object === tree.constructor ) {
		const result = [];

		for ( const value of Object.values( tree ) ) {
			result.push( ...flattenTree( value ) );
		}

		return result;
	}

	if ( tree instanceof Map ) {
		const result = [];

		for ( const [ key, value ] of tree ) {
			result.push( ...flattenTree( value ) );
		}

		return result;
	}

	if ( Array.isArray( tree ) ) {
		const result = [];

		for ( const value of tree ) {
			result.push( ...flattenTree( value ) );
		}

		return result;
	}

	return [ tree ];
};


/**
 * Converts a multi-layered object to a flat array.
 */
export const flattenTree = ( tree ) => {
	const result = [];

	if ( Object === tree.constructor ) {
		for ( const value of Object.values( tree ) ) {
			result.push( ...flattenTree( value ) );
		}
	} else if ( tree instanceof Map ) {
		for ( const [ key, value ] of tree ) {
			result.push( ...flattenTree( value ) );
		}
	} else if ( Array.isArray( tree ) ) {
		for ( const value of tree ) {
			result.push( ...flattenTree( value ) );
		}
	} else {
		result.push( tree );
	}

	return result;
};

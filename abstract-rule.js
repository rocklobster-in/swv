export function AbstractRule() {}

AbstractRule.prototype.matches = function ( context ) {
	return true;
}

AbstractRule.prototype.validate = function ( formDataTree, context ) {
	return true;
}

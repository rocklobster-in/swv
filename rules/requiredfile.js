import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function RequiredFileRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
}

Object.setPrototypeOf( RequiredFileRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
RequiredFileRule.prototype.validate = function ( formDataTree, context ) {
	const files = flattenTree( formDataTree.getAllFiles( this.field ) );

	if ( ! files.length ) {
		throw new Invalidity( this );
	}

	return true;
}

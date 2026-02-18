import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function RequiredRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
}

RequiredRule.RULE_NAME = 'required';

RequiredRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {
		const values = flattenTree( formDataTree.getAll( this.field ) );

		if ( ! values.length ) {
			throw new Invalidity( this );
		}

		return true;
	},

};

Object.setPrototypeOf( RequiredRule.prototype, AbstractRule.prototype );

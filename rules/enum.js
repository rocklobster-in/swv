import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function EnumRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.accept = properties.accept;
}

EnumRule.RULE_NAME = 'enum';

Object.setPrototypeOf( EnumRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
EnumRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	for ( const value of values ) {
		if ( ! this.accept?.map( String ).includes( value ) ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function MinFilesizeRule( properties ) {
	this.field = properties.field;
	this.error = properties.error;
	this.threshold = properties.threshold;
}

Object.setPrototypeOf( MinFilesizeRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
MinFilesizeRule.prototype.validate = function ( formDataTree, context ) {
	const files = flattenTree( formDataTree.getAllFiles( this.field ) );

	if ( ! files.length ) {
		return true;
	}

	const threshold = parseInt( this.threshold );

	const totalVolume = files.reduce( ( accumulator, current ) => {
		if ( current instanceof File ) {
			accumulator += current.size;
		}

		return accumulator;
	}, 0 );

	if ( ! Number.isNaN( threshold ) && totalVolume < threshold ) {
		throw new Invalidity( { ...this, cause: totalVolume } );
	}

	return true;
}

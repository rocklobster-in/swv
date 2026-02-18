import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function StepNumberRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
	this.base = properties.base;
	this.interval = properties.interval;
}

StepNumberRule.RULE_NAME = 'stepnumber';

StepNumberRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {

	},

};

Object.setPrototypeOf( StepNumberRule.prototype, AbstractRule.prototype );


/**
 * Validates the form data according to the logic defined by the rule.
 *
 * @param {Object} formDataTree - FormDataTree object to validate.
 */
StepNumberRule.prototype.validate = function ( formDataTree, context ) {
	const values = flattenTree( formDataTree.getAll( this.field ) );

	if ( ! values.length ) {
		return true;
	}

	const base = parseFloat( this.base );
	const interval = parseFloat( this.interval );

	if ( ! ( 0 < interval ) ) {
		return true;
	}

	const matchesStep = text => {
		const remainder = ( parseFloat( text ) - base ) % interval;

		if (
			'0.000000' === Math.abs( remainder ).toFixed( 6 ) ||
			'0.000000' === Math.abs( remainder - interval ).toFixed( 6 )
		) {
			return true;
		}

		return false;
	};

	for ( const value of values ) {
		if ( ! matchesStep( value ) ) {
			throw new Invalidity( this, { cause: value } );
		}
	}

	return true;
}

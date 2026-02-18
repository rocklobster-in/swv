import FormDataTree from '@rocklobsterinc/form-data-tree';

import { AbstractRule } from '../abstract-rule';
import { InvalidityException as Invalidity } from '../invalidity-exception';
import { flattenTree } from '../helpers';

export function DayofweekRule( properties ) {
	AbstractRule.call( this );

	this.field = properties.field;
	this.error = properties.error;
	this.accept = properties.accept;
}

DayofweekRule.RULE_NAME = 'dayofweek';

DayofweekRule.prototype = {

	/**
	 * Validates the form data according to the logic defined by the rule.
	 *
	 * @param {Object} formDataTree - FormDataTree object to validate.
	 * @param {Object} context - Optional context.
	 */
	validate( formDataTree, context ) {
		const values = flattenTree( formDataTree.getAll( this.field ) );

		if ( ! values.length ) {
			return true;
		}

		const convertToIso8601 = jsDow => ( 0 === jsDow ) ? 7 : jsDow;

		for ( const value of values ) {
			const date = new Date( value );
			const day = convertToIso8601( date.getDay() );

			if ( ! this.accept?.map( String ).includes( String( day ) ) ) {
				throw new Invalidity( this, { cause: value } );
			}
		}

		return true;
	},

};

Object.setPrototypeOf( DayofweekRule.prototype, AbstractRule.prototype );

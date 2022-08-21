# Schema-Woven Validation

This is a JavaScript implementation of [Schema-Woven Validation (SWV)](https://contactform7.com/schema-woven-validation/), the next generation of web form validation mechanism.


## Installation

```
npm install @contactable/swv --save
```


## Validating user input based on schema

```
import { validate } from '@contactable/swv';

// schema: SWV schema object
// formData: FormData object
const result = validate( schema, formData );

for ( const [ field, { error } ] of result ) {
	if ( undefined !== error ) {
		// Add validation error message to the field
	}
}
```

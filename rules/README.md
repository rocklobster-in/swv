# Predefined rule types


## required

A `required` rule verifies that the field specified by the `field` property has a value that is not a zero-length string.

You cannot use this rule type for file uploading fields. For file uploading fields, use the `requiredfile` rule type instead.


## requiredfile

A `requiredfile` rule verifies that the field specified by the `field` property has a file object value.


## email

An `email` rule verifies that the field specified by the `field` property is empty or has a valid email address value.

If no `format` property is specified, a valid email address is an email address that passes the [`is_email()`](https://developer.wordpress.org/reference/functions/is_email/) function’s test.


## url

A `url` rule verifies that the field specified by the `field` property is empty or has a valid URL value.


## tel

A `tel` rule verifies that the field specified by the `field` property is empty or has a telephone number value.


## number

A `number` rule verifies that the field specified by the `field` property is empty or has a string value representing a floating-point number.

The definition of a valid floating-point number is according to the [HTML5 specification](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-floating-point-number).


## date

A `date` rule verifies that the field specified by the `field` property is empty or has a date value in the [YYYY-MM-DD format](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string).


## time

A `time` rule verifies that the field specified by the `field` property is empty or has a time value in the [hh:mm or hh:mm:ss format](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-time-string).


## file

A `file` rule verifies that the field specified by the `field` property is empty or has a file object value.

If an `accept` property is specified, the file type must match one of file types that the property defines.


## enum

An `enum` rule verifies that the field specified by the `field` property is empty or that it has a value exactly the same as one of the array items specified by the `accept` property.


## dayofweek

A `dayofweek` rule verifies that the field specified by the `field` property is empty or has a date value which is on the day of the week specified by the `accept` property.

The `accept` property must have an array of integer values representing the day of the week (from 1 through 7, beginning with Monday and ending with Sunday). This weekday numbering is based on ISO 8601.


## minitems

A `minitems` rule verifies that the field specified by the `field` property has values, and the number of values is more than or equal to the number specified by the `threshold` property.


## maxitems

A `maxitems` rule verifies that the field specified by the `field` property has values, and the number of values is less than or equal to the number specified by the `threshold` property.


## minlength

A `minlength` rule verifies that the total number of characters (as UTF-16 code units) in value of the fields specified by the `field` property is more than or equal to the number specified by the `threshold` property.


## maxlength

A `maxlength` rule verifies that the total number of characters (as UTF-16 code units) in value of the fields specified by the `field` property is less than or equal to the number specified by the `threshold` property.


## minnumber

A `minnumber` rule verifies that the numerical value of the field specified by the `field` property is equal to or greater than the number specified by the `threshold` property.


## maxnumber

A `maxnumber` rule verifies that the numerical value of the field specified by the `field` property is equal to or lower than the number specified by the `threshold` property.


## mindate

A `mindate` rule verifies that the date value of the field specified by the `field` property is not earlier than the date specified by the `threshold` property.


## maxdate

A `maxdate` rule verifies that the date value of the field specified by the `field` property is not later than the date specified by the `threshold` property.


## minfilesize

A `minfilesize` rule verifies that the size of the file object value of the field specified by the `field` property is not smaller than the size specified by the `threshold` property.


## maxfilesize

A `maxfilesize` rule verifies that the size of the file object value of the field specified by the `field` property is not larger than the size specified by the `threshold` property.


## all

An `all` rule verifies that all of the child rules in the `rules` property are verified. Child rules are evaluated in order from the top, and if one of the rules fails, the iteration will terminate there.

The failed child rule's `error` and `field` properties override the parent's counterparts.


## any

An `any` rule verifies that any of the child rules in the `rules` property are verified. Child rules are evaluated in order from the top, and if one of the rules passes, the iteration will terminate there.


# Meta schema

This is the meta schema for SWV schemas based on [JSON Schema](https://json-schema.org/).

```
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Contact Form 7 SWV",
    "description": "Contact Form 7 SWV meta-schema",
    "type": "object",
    "properties": {
        "version": {
            "type": "string"
        },
        "locale": {
            "type": "string"
        },
        "rules": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "rule": {
                        "type": "string",
                        "enum": [
                            "required",
                            "requiredfile",
                            "email",
                            "url",
                            "tel",
                            "number",
                            "date",
                            "time",
                            "file",
                            "enum",
                            "dayofweek",
                            "minitems",
                            "maxitems",
                            "minlength",
                            "maxlength",
                            "minnumber",
                            "maxnumber",
                            "mindate",
                            "maxdate",
                            "minfilesize",
                            "maxfilesize"
                        ]
                    },
                    "field": {
                        "type": "string",
                        "pattern": "^[A-Za-z][-A-Za-z0-9_:]*$"
                    },
                    "error": {
                        "type": "string"
                    },
                    "accept": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "threshold": {
                        "type": "string"
                    }
                },
                "required": [
                    "rule"
                ]
            }
        }
    }
}
```

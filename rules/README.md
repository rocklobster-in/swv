# Predefined rule types


## required

A `required` rule verifies that the field specified by the `field` property has a string value.


## requiredfile

A `requiredfile` rule verifies that the field specified by the `field` property has a file object value.


## email

An `email` rule verifies that the field specified by the `field` property is empty or contains a valid email address.


## url

A `url` rule verifies that the field specified by the `field` property is empty or contains a valid URL (only 'http' and 'https' protocols are acceptable).


## tel

A `tel` rule verifies that the field specified by the `field` property is empty or contains a telephone number.


## number

A `number` rule verifies that the field specified by the `field` property is empty or contains a string value that represents a floating-point number.


## date

A `date` rule verifies that the field specified by the `field` property is empty or contains a date value in the YYYY-MM-DD format.


## time

A `time` rule verifies that the field specified by the `field` property is empty or contains a time value in the hh:mm or hh:mm:ss format.


## file

A `file` rule verifies that the field specified by the `field` property is empty or contains a file object value, and its file type matches one of the file types specified by the `accept` property.


## enum

An `enum` rule verifies that the field specified by the `field` property is empty or contains a string value that matches one of the values specified by the `accept` property.


## dayofweek

A `dayofweek` rule verifies that the field specified by the `field` property is empty or contains a date value that is on the day of the week specified by the `accept` property.

The `accept` property accepts an array of ISO 8601 integer values representing the days of the week (1 through 7, with 1 being Monday and 7 being Sunday).


## minitems

A `minitems` rule verifies that the number of selected fields (specified by the `field` property) is zero or a number not smaller than the number specified by the `threshold` property.


## maxitems

A `maxitems` rule verifies that the number of selected fields (specified by the `field` property) is zero or a number not larger than the number specified by the `threshold` property.


## minlength

A `minlength` rule counts the characters (as UTF-16 code units) in the fields specified by the `field` property. It verifies that the total number of characters is zero or a number not smaller than the number specified by the `threshold` property.


## maxlength

A `maxlength` rule counts the characters (as UTF-16 code units) in the fields specified by the `field` property. It verifies that the total number of characters is zero or a number not larger than the number specified by the `threshold` property.


## minnumber

A `minnumber` rule verifies that the field specified by the `field` property is empty or contains a numerical value that is not lower than the number specified by the `threshold` property.


## maxnumber

A `maxnumber` rule verifies that the field specified by the `field` property is empty or contains a numerical value that is not greater than the number specified by the `threshold` property.


## mindate

A `mindate` rule verifies that the field specified by the `field` property is empty or contains a date value that is not earlier than the date specified by the `threshold` property.


## maxdate

A `maxdate` rule verifies that the field specified by the `field` property is empty or contains a date value that is not later than the date specified by the `threshold` property.


## minfilesize

A `minfilesize` rule verifies that the field specified by the `field` property is empty or contains a file object value, and if it's filled, the file size (in bytes) is not smaller than the size specified by the `threshold` property.


## maxfilesize

A `maxfilesize` rule verifies that the field specified by the `field` property is empty or contains a file object value, and if it's filled, the file size (in bytes) is not larger than the size specified by the `threshold` property.


## stepnumber

A `stepnumber` rule verifies that the field specified by the `field` property is empty or has a numerical value that matches one of the allowed values calculated based on the `base` and `interval` properties. Specifically, when the field value is equal to the base value plus an integral multiple of the interval value, the rule is validated.

Both the `base` and `interval` properties must have an integer or a floating-point number value. The use of an `any` keyword, which HTML supports as the `step` attribute value, is not supported.


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
                            "maxfilesize",
                            "stepnumber",
                            "all",
                            "any"
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
                    "base": {
                        "type": "string"
                    },
                    "interval": {
                        "type": "number",
                        "minimum": 0
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

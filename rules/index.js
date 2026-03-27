import { AllRule } from './all';
import { AnyRule } from './any';
import { DateRule } from './date';
import { DayofweekRule } from './dayofweek';
import { EmailRule } from './email';
import { EnumRule } from './enum';
import { FileRule } from './file';
import { MaxDateRule } from './maxdate';
import { MaxFilesizeRule } from './maxfilesize';
import { MaxItemsRule } from './maxitems';
import { MaxLengthRule } from './maxlength';
import { MaxNumberRule } from './maxnumber';
import { MinDateRule } from './mindate';
import { MinFilesizeRule } from './minfilesize';
import { MinItemsRule } from './minitems';
import { MinLengthRule } from './minlength';
import { MinNumberRule } from './minnumber';
import { NumberRule } from './number';
import { RequiredRule } from './required';
import { RequiredFileRule } from './requiredfile';
import { StepNumberRule } from './stepnumber';
import { TelRule } from './tel';
import { TimeRule } from './time';
import { URLRule } from './url';

export const rulesDictionary = new Map( [
	[ 'all', AllRule ],
	[ 'any', AnyRule ],
	[ 'date', DateRule ],
	[ 'dayofweek', DayofweekRule ],
	[ 'email', EmailRule ],
	[ 'enum', EnumRule ],
	[ 'file', FileRule ],
	[ 'maxdate', MaxDateRule ],
	[ 'maxfilesize', MaxFilesizeRule ],
	[ 'maxitems', MaxItemsRule ],
	[ 'maxlength', MaxLengthRule ],
	[ 'maxnumber', MaxNumberRule ],
	[ 'mindate', MinDateRule ],
	[ 'minfilesize', MinFilesizeRule ],
	[ 'minitems', MinItemsRule ],
	[ 'minlength', MinLengthRule ],
	[ 'minnumber', MinNumberRule ],
	[ 'number', NumberRule ],
	[ 'required', RequiredRule ],
	[ 'requiredfile', RequiredFileRule ],
	[ 'stepnumber', StepNumberRule ],
	[ 'tel', TelRule ],
	[ 'time', TimeRule ],
	[ 'url', URLRule ],
] );

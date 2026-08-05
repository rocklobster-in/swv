import { AllRule } from "./all.js";
import { AnyRule } from "./any.js";
import { DateRule } from "./date.js";
import { DayofweekRule } from "./dayofweek.js";
import { EmailRule } from "./email.js";
import { EnumRule } from "./enum.js";
import { FileRule } from "./file.js";
import { MaxDateRule } from "./maxdate.js";
import { MaxFilesizeRule } from "./maxfilesize.js";
import { MaxItemsRule } from "./maxitems.js";
import { MaxLengthRule } from "./maxlength.js";
import { MaxNumberRule } from "./maxnumber.js";
import { MinDateRule } from "./mindate.js";
import { MinFilesizeRule } from "./minfilesize.js";
import { MinItemsRule } from "./minitems.js";
import { MinLengthRule } from "./minlength.js";
import { MinNumberRule } from "./minnumber.js";
import { NumberRule } from "./number.js";
import { RequiredRule } from "./required.js";
import { RequiredFileRule } from "./requiredfile.js";
import { StepNumberRule } from "./stepnumber.js";
import { TelRule } from "./tel.js";
import { TimeRule } from "./time.js";
import { URLRule } from "./url.js";

export const rulesDictionary = new Map([
  ["all", AllRule],
  ["any", AnyRule],
  ["date", DateRule],
  ["dayofweek", DayofweekRule],
  ["email", EmailRule],
  ["enum", EnumRule],
  ["file", FileRule],
  ["maxdate", MaxDateRule],
  ["maxfilesize", MaxFilesizeRule],
  ["maxitems", MaxItemsRule],
  ["maxlength", MaxLengthRule],
  ["maxnumber", MaxNumberRule],
  ["mindate", MinDateRule],
  ["minfilesize", MinFilesizeRule],
  ["minitems", MinItemsRule],
  ["minlength", MinLengthRule],
  ["minnumber", MinNumberRule],
  ["number", NumberRule],
  ["required", RequiredRule],
  ["requiredfile", RequiredFileRule],
  ["stepnumber", StepNumberRule],
  ["tel", TelRule],
  ["time", TimeRule],
  ["url", URLRule],
]);

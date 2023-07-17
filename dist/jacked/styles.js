"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strings = exports.Common = exports.Styles = void 0;
var Styles;
(function (Styles) {
    Styles["Reset"] = "\u001B[0m";
    Styles["Bold"] = "\u001B[1m";
    Styles["Underline"] = "\u001B[4m";
    Styles["FgBlack"] = "\u001B[30m";
    Styles["FgRed"] = "\u001B[31m";
    Styles["FgGreen"] = "\u001B[32m";
    Styles["FgBrightYellow"] = "\u001B[93m";
    Styles["FgYellow"] = "\u001B[33m";
    Styles["FgBlue"] = "\u001B[34m";
    Styles["FgCyan"] = "\u001B[36m";
    Styles["FgWhite"] = "\u001B[37m";
})(Styles = exports.Styles || (exports.Styles = {}));
var Common;
(function (Common) {
    Common["error"] = "\u001B[31mERROR \u001B[0m";
    Common["info"] = "\u001B[36mINFO \u001B[0m";
    Common["success"] = "\u001B[32mSUCCESS \u001B[0m";
    Common["PASSED"] = "\u001B[32mPASSED \u001B[0m";
    Common["FAILED"] = "\u001B[31mFAILED \u001B[0m";
    Common["NEXTLINE"] = "\n";
})(Common = exports.Common || (exports.Common = {}));
var Strings;
(function (Strings) {
    Strings["JACKEDASSESSMENT"] = "JACKED ASSESSMENT: ";
    Strings["RECOMMENDATION"] = "Please see recommendations to fix vulnerabilities.";
    Strings["NOTE"] = "NOTE: ";
    Strings["SKIPFAILBUILD"] = "Skip build fail is ON";
    Strings["FAILCRITERIA"] = "Severity found equal or higher than: ";
})(Strings = exports.Strings || (exports.Strings = {}));

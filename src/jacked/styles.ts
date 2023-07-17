
export enum Styles {

    Reset = "\x1b[0m",
    Bold = "\x1b[1m",
    Underline = "\x1b[4m",

    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgBrightYellow = "\x1b[93m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m"

}

export enum Common {
    error = "\x1b[31mERROR \x1b[0m",
    info = "\x1b[36mINFO \x1b[0m",
    success = "\x1b[32mSUCCESS \x1b[0m",
    PASSED = "\x1b[32mPASSED \x1b[0m",
    FAILED = "\x1b[31mFAILED \x1b[0m",
    NEXTLINE = "\n"
}

export enum Strings {
    JACKEDASSESSMENT = "JACKED ASSESSMENT: ",
    RECOMMENDATION = "Please see recommendations to fix vulnerabilities.",
    NOTE = "NOTE: ",
    SKIPFAILBUILD = "Skip build fail is ON",
    FAILCRITERIA = "Severity found equal or higher than: "
}
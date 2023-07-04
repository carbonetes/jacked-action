"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var https = require("https");
var fs = require("fs");
var core = require("@actions/core");
var exec = require("@actions/exec");
var directoryInput;
var scanOption;
var failCriteria;
var DIRECTORY = 'directory';
var SEVERITY_TYPE = ["unknown", "negligible", "low", "medium", "high", "critical"];
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var options, request;
        var _this = this;
        return __generator(this, function (_a) {
            try {
                options = {
                    hostname: 'raw.githubusercontent.com',
                    path: '/carbonetes/jacked/main/install.sh',
                    method: 'GET'
                };
                request = https.request(options, function (response) {
                    var script = '';
                    response.on('data', function (chunk) {
                        script += chunk;
                    });
                    response.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs.promises.writeFile('./install.sh', script)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, exec.exec('chmod', ['+x', './install.sh'])];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, exec.exec('./install.sh')];
                                case 3:
                                    _a.sent();
                                    core.info('Jacked has been installed');
                                    scanOption = checkUserInput();
                                    return [4 /*yield*/, constructCommandExec(scanOption)];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                request.on('error', function (error) {
                    core.setFailed(error.message);
                });
                request.end();
            }
            catch (error) {
                if (error instanceof Error) {
                    core.setFailed(error.message);
                }
                else {
                    core.setFailed(String(error));
                }
            }
            return [2 /*return*/];
        });
    });
}
function checkUserInput() {
    directoryInput = core.getInput('directory', { required: true });
    if (directoryInput !== null && directoryInput !== '') {
        return DIRECTORY;
    }
    throw new Error("Invalid directory input");
}
function checkConfig() {
    failCriteria = core.getInput('fail-criteria');
    failCriteria = failCriteria.toLowerCase();
    SeverityCheck(failCriteria, SEVERITY_TYPE);
}
function constructCommandExec(scanOption) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = scanOption;
                    switch (_a) {
                        case DIRECTORY: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 6];
                case 1:
                    if (!(failCriteria !== "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, exec.exec('./bin/jacked', ['-q', '--fail-criteria', failCriteria, '-d', directoryInput])];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, exec.exec('./bin/jacked', ['-q', '-d', directoryInput])];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    core.setFailed('Scan Option not found');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function SeverityCheck(failCriteria, severity_type) {
    if (failCriteria !== "") {
        if (!severity_type.includes(failCriteria)) {
            throw new Error("Undefined Severity ".concat(failCriteria, " -> Please choose: unknown, negligible, low, medium, high, or critical"));
        }
    }
}
checkConfig();
run();

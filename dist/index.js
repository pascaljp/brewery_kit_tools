/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./maintenance/escape_hatch.ts":
/*!*************************************!*\
  !*** ./maintenance/escape_hatch.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EscapeHatch = void 0;\nvar child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\nvar firebase_1 = __importDefault(__webpack_require__(/*! firebase */ \"firebase\"));\nvar EscapeHatch = /** @class */ (function () {\n    function EscapeHatch() {\n    }\n    EscapeHatch.prototype.init = function (machineId) {\n        var _this = this;\n        // Anyone can read.\n        // Admin of the system can write.\n        var reqRoot = firebase_1.default\n            .database()\n            .ref(\"/admin/escape_hatch/\" + machineId + \"/request\");\n        // Admin of the system can read.\n        // Anyone can write under the following conditions:\n        // - The key needs to exist in reqRoot.\n        // - The value should be a string with length <= 4096.\n        // - Existing value cannot be overwritten.\n        var resRoot = firebase_1.default\n            .database()\n            .ref(\"/admin/escape_hatch/\" + machineId + \"/response\");\n        var callback = function (snapshot) { return __awaiter(_this, void 0, void 0, function () {\n            var command, result, o, key, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        command = snapshot.val();\n                        console.log(command);\n                        result = null;\n                        try {\n                            result = child_process_1.execSync(command + ' 2>/dev/null').toString();\n                        }\n                        catch (e) {\n                            console.log(e.stdout.toString());\n                            console.warn(e.stderr.toString());\n                        }\n                        o = {};\n                        key = snapshot.key;\n                        o[key] = result;\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, resRoot.update(o)];\n                    case 2:\n                        _a.sent();\n                        return [3 /*break*/, 4];\n                    case 3:\n                        e_1 = _a.sent();\n                        console.warn(e_1);\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        }); };\n        reqRoot\n            .orderByKey()\n            .limitToLast(1)\n            .once('value')\n            .then(function (snapshot) {\n            var lastKey = snapshot.val()\n                ? Object.keys(snapshot.val())[0] || ''\n                : '';\n            reqRoot.orderByKey().startAfter(lastKey).on('child_added', callback);\n            reqRoot.orderByKey().startAfter(lastKey).on('child_changed', callback);\n        })\n            .catch(function (err) {\n            console.log(err);\n        });\n    };\n    return EscapeHatch;\n}());\nexports.EscapeHatch = EscapeHatch;\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/escape_hatch.ts?");

/***/ }),

/***/ "./maintenance/index.ts":
/*!******************************!*\
  !*** ./maintenance/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar firebase_1 = __importDefault(__webpack_require__(/*! firebase */ \"firebase\"));\nvar fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nvar os = __importStar(__webpack_require__(/*! os */ \"os\"));\nvar escape_hatch_1 = __webpack_require__(/*! ./escape_hatch */ \"./maintenance/escape_hatch.ts\");\nvar installer_1 = __webpack_require__(/*! ./installer */ \"./maintenance/installer.ts\");\nvar util_1 = __webpack_require__(/*! ./util */ \"./maintenance/util.ts\");\nfunction getUserName() {\n    return os.userInfo().username;\n}\nfunction isOnDocker() {\n    return getUserName() == 'docker';\n}\nfunction getRootDir() {\n    if (isOnDocker()) {\n        var userName = getUserName();\n        util_1.run(\"sudo chown \" + userName + \":\" + userName + \" -R /mnt/inkbird\");\n        return '/mnt/inkbird';\n    }\n    else {\n        util_1.run('mkdir -p /tmp/inkbird');\n        return '/tmp/inkbird';\n    }\n}\nfunction main() {\n    try {\n        firebase_1.default.initializeApp({\n            apiKey: 'AIzaSyBT6_J6eKuV1gX5zJZQHMyCsb4LSxfi68Y',\n            appId: '1:567787916313:web:b31c427a013911da88ee88',\n            projectId: 'brewery-kit',\n            // authDomain: 'brewery-kit.firebaseapp.com',\n            databaseURL: 'https://brewery-kit.firebaseio.com',\n            // storageBucket: 'brewery-kit.appspot.com',\n            // messagingSenderId: '567787916313',\n        });\n        var rootDir_1 = getRootDir();\n        var machineId = JSON.parse(fs.readFileSync(rootDir_1 + \"/config.json\", { encoding: 'utf8' })).machineId;\n        var escapeHatch = new escape_hatch_1.EscapeHatch();\n        escapeHatch.init(machineId);\n        firebase_1.default\n            .database()\n            .ref('/admin/firmware_url')\n            .on('value', function (snapshot) {\n            // e.g. https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/1.0\n            var firmwareUrl = snapshot.val();\n            if (typeof firmwareUrl == 'string') {\n                console.log(\"Installing \" + firmwareUrl);\n                installer_1.install(rootDir_1, firmwareUrl);\n                // TODO: Restart the job.\n            }\n        });\n    }\n    catch (e) {\n        console.error(e);\n    }\n}\nmain();\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/index.ts?");

/***/ }),

/***/ "./maintenance/installer.ts":
/*!**********************************!*\
  !*** ./maintenance/installer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n// Tools this program depends on:\n// - curl\n// - npm\n// - git\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.install = void 0;\nvar util_1 = __webpack_require__(/*! ./util */ \"./maintenance/util.ts\");\nfunction install(rootDir, firmwareZipUrl) {\n    try {\n        util_1.run(\"touch \" + rootDir + \"/firmwareZipUrl\");\n        var currentFirmwareZipUrl = util_1.run(\"cat \" + rootDir + \"/firmwareZipUrl\").split('\\n')[0];\n        if (currentFirmwareZipUrl == firmwareZipUrl) {\n            return;\n        }\n        util_1.run(\"curl -sS \" + firmwareZipUrl + \" -o /tmp/firmware.zip\");\n        util_1.run('ls -la', rootDir);\n        util_1.run('rm -rf brewery_kit*', rootDir);\n        util_1.run(\"unzip /tmp/firmware.zip -d \" + rootDir);\n        util_1.run(\"mv brewery_kit* brewery_kit\", rootDir);\n        util_1.run('npm install', rootDir + \"/brewery_kit/monitoring\");\n        util_1.run(\"echo \" + firmwareZipUrl + \" > \" + rootDir + \"/firmwareZipUrl\");\n    }\n    catch (e) {\n        console.error(e);\n    }\n}\nexports.install = install;\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/installer.ts?");

/***/ }),

/***/ "./maintenance/util.ts":
/*!*****************************!*\
  !*** ./maintenance/util.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.run = void 0;\nvar child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\nfunction run(command, cwd) {\n    var result = child_process_1.execSync(\"\" + command, { cwd: cwd, encoding: 'utf8' });\n    console.log(\"$ \" + command + \"\\n\" + result);\n    return result;\n}\nexports.run = run;\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/util.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");;

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("firebase");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./maintenance/index.ts");
/******/ 	
/******/ })()
;
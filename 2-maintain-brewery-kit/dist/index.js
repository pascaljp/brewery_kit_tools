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

/***/ "./maintenance/common/config.ts":
/*!**************************************!*\
  !*** ./maintenance/common/config.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getDataDir = exports.getConfigPath = void 0;\nvar os = __importStar(__webpack_require__(/*! os */ \"os\"));\nvar path = __importStar(__webpack_require__(/*! path */ \"path\"));\nvar fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nfunction getConfigPath() {\n    try {\n        fs.mkdirSync(path.join(os.homedir(), '.inkbird'), { recursive: true });\n    }\n    catch (_a) { }\n    return path.join(os.homedir(), '.inkbird', 'config.json');\n}\nexports.getConfigPath = getConfigPath;\nfunction getDataDir() {\n    try {\n        fs.mkdirSync(path.join(os.homedir(), '.inkbird'), { recursive: true });\n    }\n    catch (_a) { }\n    return path.join(os.homedir(), '.inkbird', 'data');\n}\nexports.getDataDir = getDataDir;\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/common/config.ts?");

/***/ }),

/***/ "./maintenance/server/escape_hatch.ts":
/*!********************************************!*\
  !*** ./maintenance/server/escape_hatch.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EscapeHatch = void 0;\nvar child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\nvar app_1 = __importDefault(__webpack_require__(/*! @firebase/app */ \"@firebase/app\"));\n__webpack_require__(/*! @firebase/database */ \"@firebase/database\");\nvar EscapeHatch = /** @class */ (function () {\n    function EscapeHatch() {\n    }\n    EscapeHatch.prototype.init = function (machineId) {\n        var _this = this;\n        if (!app_1.default.database) {\n            throw new Error('Firebase realtime database is not available');\n        }\n        // Special path that anyone can write under the following conditions.\n        // - The key needs to be ' '.\n        // - The value needs to be a string 'fake'.\n        //\n        // The purpose is to create a path\n        // '/admin/escape_hatch/${machineId}/request' so that reqRoot can listen\n        // the changes to the path.\n        app_1.default\n            .database()\n            .ref(\"/admin/escape_hatch/\" + machineId + \"/request\")\n            .child(' ')\n            .set('fake');\n        console.log(\"machine id: \" + machineId);\n        // Anyone can read.\n        // Admin of the system can write.\n        var reqRoot = app_1.default\n            .database()\n            .ref(\"/admin/escape_hatch/\" + machineId + \"/request\");\n        // Admin of the system can read.\n        // Anyone can write under the following conditions:\n        // - The key needs to exist in reqRoot.\n        // - The value should be a string with length <= 4096.\n        // - Existing value cannot be overwritten.\n        var resRoot = app_1.default\n            .database()\n            .ref(\"/admin/escape_hatch/\" + machineId + \"/response\");\n        var callback = function (snapshot) { return __awaiter(_this, void 0, void 0, function () {\n            var command, result, o, key, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        command = snapshot.val();\n                        console.log(command);\n                        result = null;\n                        try {\n                            result = child_process_1.execSync(command + ' 2>/dev/null').toString();\n                        }\n                        catch (e) {\n                            console.log(e.stdout.toString());\n                            console.warn(e.stderr.toString());\n                        }\n                        o = {};\n                        key = snapshot.key;\n                        o[key] = result;\n                        _a.label = 1;\n                    case 1:\n                        _a.trys.push([1, 3, , 4]);\n                        return [4 /*yield*/, resRoot.update(o)];\n                    case 2:\n                        _a.sent();\n                        return [3 /*break*/, 4];\n                    case 3:\n                        e_1 = _a.sent();\n                        console.warn(e_1);\n                        return [3 /*break*/, 4];\n                    case 4: return [2 /*return*/];\n                }\n            });\n        }); };\n        reqRoot\n            .orderByKey()\n            .limitToLast(1)\n            .once('value')\n            .then(function (snapshot) {\n            console.log(snapshot.val());\n            var lastKey = snapshot.val()\n                ? Object.keys(snapshot.val())[0] || ''\n                : '';\n            console.log(lastKey);\n            reqRoot.orderByKey().startAfter(lastKey).on('child_added', callback);\n            reqRoot.orderByKey().startAfter(lastKey).on('child_changed', callback);\n        })\n            .catch(function (err) {\n            console.log(err);\n        });\n    };\n    return EscapeHatch;\n}());\nexports.EscapeHatch = EscapeHatch;\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/server/escape_hatch.ts?");

/***/ }),

/***/ "./maintenance/server/index.ts":
/*!*************************************!*\
  !*** ./maintenance/server/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar app_1 = __importDefault(__webpack_require__(/*! @firebase/app */ \"@firebase/app\"));\n__webpack_require__(/*! @firebase/database */ \"@firebase/database\");\nvar fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nvar config_1 = __webpack_require__(/*! ../common/config */ \"./maintenance/common/config.ts\");\nvar escape_hatch_1 = __webpack_require__(/*! ./escape_hatch */ \"./maintenance/server/escape_hatch.ts\");\n// import {install} from './installer';\nfunction getConfig() {\n    return JSON.parse(fs.readFileSync(config_1.getConfigPath(), { encoding: 'utf8' }));\n}\nfunction main() {\n    try {\n        app_1.default.initializeApp({\n            apiKey: 'AIzaSyBT6_J6eKuV1gX5zJZQHMyCsb4LSxfi68Y',\n            appId: '1:567787916313:web:b31c427a013911da88ee88',\n            projectId: 'brewery-kit',\n            databaseURL: 'https://brewery-kit.firebaseio.com',\n        });\n        var config = getConfig();\n        // Run the escape hatch service.\n        var escapeHatch = new escape_hatch_1.EscapeHatch();\n        escapeHatch.init(config.machineId);\n        // Temporary disabled. We want to check escape-hatch logic first.\n        // firebase\n        //   .database()\n        //   .ref('/admin/firmware_url')\n        //   .on('value', (snapshot) => {\n        //     // e.g. https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/1.0\n        //     const firmwareUrl: string = snapshot.val();\n        //     if (typeof firmwareUrl == 'string') {\n        //       console.log(`Installing ${firmwareUrl}`);\n        //       install(rootDir, firmwareUrl);\n        //       // TODO: Restart the job.\n        //     }\n        //   });\n    }\n    catch (e) {\n        console.error(e);\n    }\n}\nmain();\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/server/index.ts?");

/***/ }),

/***/ "@firebase/app":
/*!********************************!*\
  !*** external "@firebase/app" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@firebase/app");;

/***/ }),

/***/ "@firebase/database":
/*!*************************************!*\
  !*** external "@firebase/database" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@firebase/database");;

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");;

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

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./maintenance/server/index.ts");
/******/ 	
/******/ })()
;
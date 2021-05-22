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

/***/ "./maintenance/create_config/index.ts":
/*!********************************************!*\
  !*** ./maintenance/create_config/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nvar crypto = __importStar(__webpack_require__(/*! crypto */ \"crypto\"));\nvar config_1 = __webpack_require__(/*! ../common/config */ \"./maintenance/common/config.ts\");\nfunction createMachineId() {\n    var S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';\n    return ('random-' +\n        Array.from(crypto.randomFillSync(new Uint8Array(16)))\n            .map(function (n) { return S[n % S.length]; })\n            .join(''));\n}\nfunction initializeConfig() {\n    var updated = false;\n    var config = {};\n    try {\n        config = JSON.parse(fs.readFileSync(config_1.getConfigPath(), { encoding: 'utf8' }));\n    }\n    catch (_a) { }\n    if (!config.machineId) {\n        config.machineId = createMachineId();\n        updated = true;\n    }\n    if (!config.dataDir) {\n        config.dataDir = config_1.getDataDir();\n        updated = true;\n    }\n    if (updated) {\n        fs.writeFileSync(config_1.getConfigPath(), JSON.stringify(config));\n    }\n}\ninitializeConfig();\n\n\n//# sourceURL=webpack://brewery_kit_tools/./maintenance/create_config/index.ts?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./maintenance/create_config/index.ts");
/******/ 	
/******/ })()
;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.tsx","vendors~app~phaser","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/GameStats/styles.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/GameStats/styles.css ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \".GameStats {}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/components/GameStats/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/PlayerStats/styles.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/PlayerStats/styles.css ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/components/PlayerStats/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/TileStats/styles.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/TileStats/styles.css ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \".TileStats {\\n  margin-bottom: 2rem;\\n}\\n.TileStats .UnitStats {\\n  margin-bottom: 2rem;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/components/TileStats/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/UnitCard/styles.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/UnitCard/styles.css ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \".UnitCard .card-0 {\\n  border-top: 1rem solid #03a9f4;\\n}\\n.UnitCard .card-1 {\\n  border-top: 1rem solid #f44336;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/components/UnitCard/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/styles.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/styles.css ***!
  \*************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \".Game .gameContainer {\\n  padding: 4rem;\\n}\\n.Game .play-buttons {\\n  margin-top: 1rem;\\n}\\n.Game .play-buttons .play {\\n  margin-right: 1rem;\\n  vertical-align: top;\\n}\\n.Game .gameContainer .phaser-wrapper {\\n  /* height: 640px; */\\n}\\n\\n.Game .gameContainer .phaser-wrapper.Loading #content {\\n  display: none;\\n}\\n.Game .link a{\\n  color: #ef5350;\\n  text-decoration: none;\\n}\\n.Game .team0 {\\n  color: blue;\\n}\\n.Game .team1 {\\n  color: #ef5350;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/components/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"html {\\n  font-size: 12pt;\\n}\\n\\nhtml,\\nbody,\\nh1 {\\n  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/styles/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar Game_1 = __webpack_require__(/*! ./components/Game */ \"./src/components/Game.tsx\");\n__webpack_require__(/*! ./styles/index.css */ \"./src/styles/index.css\");\nfunction App() {\n    return (react_1.default.createElement(\"div\", null,\n        react_1.default.createElement(Game_1.GameComponent, null)));\n}\nexports.default = App;\n\n\n//# sourceURL=webpack:///./src/App.tsx?");

/***/ }),

/***/ "./src/components/Energium/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/Energium/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Energium = void 0;\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nexports.Energium = function () {\n    return react_1.default.createElement(\"span\", { style: { color: 'rgb(226, 210, 42)' } }, \"Energium\");\n};\n\n\n//# sourceURL=webpack:///./src/components/Energium/index.tsx?");

/***/ }),

/***/ "./src/components/Game.tsx":
/*!*********************************!*\
  !*** ./src/components/Game.tsx ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameComponent = void 0;\n__webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar query_string_1 = __importDefault(__webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\"));\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar classnames_1 = __importDefault(__webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\"));\nvar game_1 = __webpack_require__(/*! ../game */ \"./src/game/index.ts\");\nvar jszip_1 = __importDefault(__webpack_require__(/*! jszip */ \"./node_modules/jszip/dist/jszip.min.js\"));\nvar PlayerStats_1 = __importDefault(__webpack_require__(/*! ./PlayerStats */ \"./src/components/PlayerStats/index.tsx\"));\nvar GameStats_1 = __importDefault(__webpack_require__(/*! ./GameStats */ \"./src/components/GameStats/index.tsx\"));\nvar core_1 = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\nvar Close_1 = __importDefault(__webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\"));\nvar Alert_1 = __importDefault(__webpack_require__(/*! @material-ui/lab/Alert */ \"./node_modules/@material-ui/lab/esm/Alert/index.js\"));\nvar red_1 = __importDefault(__webpack_require__(/*! @material-ui/core/colors/red */ \"./node_modules/@material-ui/core/colors/red.js\"));\n__webpack_require__(/*! ./styles.css */ \"./src/components/styles.css\");\nvar TileStats_1 = __importDefault(__webpack_require__(/*! ./TileStats */ \"./src/components/TileStats/index.tsx\"));\nfunction Alert(props) {\n    return react_1.default.createElement(Alert_1.default, __assign({ elevation: 6, variant: \"filled\" }, props));\n}\nexports.GameComponent = function () {\n    var queryParams = query_string_1.default.parse(window.location.search);\n    var _a = react_1.useState(false), notifWindowOpen = _a[0], setNotifWindowOpen = _a[1];\n    var _b = react_1.useState(\"\"), notifMsg = _b[0], setNotifMsg = _b[1];\n    var _c = react_1.useState(false), isReady = _c[0], setReady = _c[1];\n    var _d = react_1.useState(null), selectedTileData = _d[0], setTileData = _d[1];\n    var _e = react_1.useState(null), game = _e[0], setGame = _e[1];\n    var _f = react_1.useState(null), main = _f[0], setMain = _f[1];\n    var _g = react_1.useState(null), configs = _g[0], setConfigs = _g[1];\n    var _h = react_1.useState(false), running = _h[0], setRunning = _h[1];\n    var _j = react_1.useState(1), playbackSpeed = _j[0], setPlaybackSpeed = _j[1];\n    var _k = react_1.useState({\n        step: 1,\n        min: 0,\n        max: 1000,\n    }), sliderConfigs = _k[0], setSliderConfigs = _k[1];\n    react_1.useEffect(function () {\n        if (game) {\n            game.events.on('setup', function () {\n                var main = game.scene.scenes[0];\n                setMain(main);\n                var configs = main.pseudomatch.state.game.configs;\n                setConfigs(configs);\n                setSliderConfigs({\n                    min: 0,\n                    max: configs.parameters.MAX_TURNS,\n                    step: 1,\n                });\n                setReady(true);\n            });\n        }\n    }, [game]);\n    react_1.useEffect(function () {\n        if (isReady) {\n            moveToTurn(0);\n        }\n    }, [isReady]);\n    var _l = react_1.useState(0), turn = _l[0], setTurn = _l[1];\n    var _m = react_1.useState(null), currentFrame = _m[0], setFrame = _m[1];\n    var _o = react_1.useState(false), uploading = _o[0], setUploading = _o[1];\n    var handleChange = function (_event, newValue) {\n        moveToTurn(newValue);\n    };\n    var fileInput = react_1.default.createRef();\n    var moveToTurn = function (turn) {\n        setTurn(turn);\n        main.renderFrame(turn);\n        setFrame(main.frames[turn]);\n    };\n    react_1.useEffect(function () {\n        if (running) {\n            var currTurn_1 = turn;\n            var interval_1 = setInterval(function () {\n                if (currTurn_1 >= configs.parameters.MAX_TURNS) {\n                    setRunning(false);\n                    return;\n                }\n                moveToTurn(currTurn_1);\n                currTurn_1 += 1;\n                setTurn(currTurn_1);\n            }, 1000 / playbackSpeed);\n            return function () { return clearInterval(interval_1); };\n        }\n    }, [running, playbackSpeed]);\n    var setNewGame = function (replayData) {\n        if (game) {\n            game.destroy(true, false);\n        }\n        setReady(false);\n        var newgame = game_1.createGame({\n            replayData: replayData,\n            handleTileClicked: handleTileClicked,\n        });\n        setGame(newgame);\n        setUploading(false);\n    };\n    react_1.useEffect(function () {\n        var id = queryParams.matchID;\n        if (id) {\n            var url = \"http://34.120.177.157/api/dimensions/acmdim/tournaments/tourney/match/\" + id + \"/replay\";\n            fetch(url).then(function (res) {\n                if (res.status == 200) {\n                    return res.json();\n                }\n                else if (res.status === 400) {\n                    console.error(id + \" is an invalid match id\");\n                    setNotifMsg(id + \" is an invalid match id\");\n                    setNotifWindowOpen(true);\n                    throw Error;\n                }\n                else {\n                    console.error(\"Something wrong happened\");\n                    setNotifMsg(\"Something wrong happened\");\n                    setNotifWindowOpen(true);\n                    throw Error;\n                }\n            }).then(function (data) {\n                console.log(data);\n                var proxyUrl = 'https://cors-anywhere.herokuapp.com/';\n                fetch(proxyUrl + data.url).then(function (res) { return res.blob(); }).then(function (res) {\n                    var unzip = new jszip_1.default();\n                    unzip.loadAsync(res).then(function (data) {\n                        Object.values(data.files).forEach(function (info) {\n                            console.log(info);\n                            if (info.dir === false) {\n                                info.async('string').then(function (json) {\n                                    var replayData = JSON.parse(json);\n                                    setNewGame(replayData);\n                                });\n                            }\n                        });\n                    });\n                });\n            }).catch(function () { });\n        }\n    }, []);\n    var handleUpload = function () {\n        setUploading(true);\n        if (fileInput.current.files.length) {\n            var file = fileInput.current.files[0];\n            var name_1 = file.name;\n            var meta = name_1.split('.');\n            if (meta[meta.length - 1] === 'json') {\n                file\n                    .text()\n                    .then(JSON.parse)\n                    .then(function (data) {\n                    setNewGame(data);\n                });\n            }\n            else {\n                var unzip = new jszip_1.default();\n                unzip.loadAsync(file).then(function (data) {\n                    Object.values(data.files).forEach(function (info) {\n                        console.log(info);\n                        if (info.dir === false) {\n                            info.async('string').then(function (json) {\n                                var replayData = JSON.parse(json);\n                                setNewGame(replayData);\n                            });\n                        }\n                    });\n                });\n            }\n        }\n    };\n    var renderUploadButton = function () {\n        return (react_1.default.createElement(core_1.Button, { variant: \"contained\", component: \"label\" },\n            \"Upload Replay\",\n            ' ',\n            react_1.default.createElement(\"input\", { accept: \".json, .replay\", type: \"file\", style: { display: 'none' }, onChange: handleUpload, ref: fileInput })));\n    };\n    var noUpload = !uploading && game === null;\n    var gameLoading = (uploading && game === null) || (!isReady && game !== null);\n    var handleTileClicked = function (data) {\n        setTileData(data);\n    };\n    var handleTextOverlayCheckChange = function () {\n        main.toggleTextOverlay();\n    };\n    var theme = core_1.createMuiTheme({\n        palette: {\n            primary: {\n                main: red_1.default[400],\n            }\n        }\n    });\n    return (react_1.default.createElement(\"div\", { className: \"Game\" },\n        react_1.default.createElement(\"div\", { className: \"gameContainer\" },\n            react_1.default.createElement(core_1.Snackbar, { anchorOrigin: {\n                    vertical: 'top',\n                    horizontal: 'left',\n                }, open: notifWindowOpen, autoHideDuration: 6000, onClose: function () {\n                    setNotifWindowOpen(false);\n                }, action: react_1.default.createElement(core_1.IconButton, { size: \"small\", \"aria-label\": \"close\", color: \"inherit\", onClick: function () {\n                        setNotifWindowOpen(false);\n                    } },\n                    react_1.default.createElement(Close_1.default, { fontSize: \"small\" })) },\n                react_1.default.createElement(Alert, { onClose: function () {\n                        setNotifWindowOpen(false);\n                    }, severity: \"warning\" }, notifMsg)),\n            react_1.default.createElement(\"h1\", null, \"Energium AI Competition\"),\n            react_1.default.createElement(\"p\", { className: \"link\" },\n                react_1.default.createElement(\"a\", { href: \"https://ai.acmucsd.com/competitions\", target: \"_blank\", rel: \"noopener noreferrer\" }, \"By ACM AI Competitions\")),\n            react_1.default.createElement(core_1.ThemeProvider, { theme: theme },\n                react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 },\n                    react_1.default.createElement(core_1.Grid, { item: true, xs: 6 },\n                        react_1.default.createElement(core_1.Card, { className: classnames_1.default({\n                                'phaser-wrapper': true,\n                                Loading: gameLoading,\n                            }) },\n                            react_1.default.createElement(core_1.CardContent, null,\n                                noUpload && renderUploadButton(),\n                                gameLoading && react_1.default.createElement(core_1.CircularProgress, null),\n                                isReady && react_1.default.createElement(\"div\", null,\n                                    react_1.default.createElement(\"p\", null,\n                                        react_1.default.createElement(\"span\", { className: \"team0\" }, main.replayData.agents[0].name),\n                                        \" vs. \",\n                                        react_1.default.createElement(\"span\", { className: \"team1\" }, main.replayData.agents[1].name),\n                                        \" | \",\n                                        main.winningTeam === -1 ? 'Result: Tie' : \"Result: \" + main.replayData.agents[main.winningTeam].name + \" won\")),\n                                react_1.default.createElement(\"div\", { id: \"content\" }),\n                                react_1.default.createElement(\"div\", { className: \"play-buttons\" },\n                                    react_1.default.createElement(core_1.Button, { className: \"play\", color: \"primary\", variant: \"contained\", disabled: !isReady, onClick: function () {\n                                            setRunning(!running);\n                                        } }, running ? 'Pause' : 'Play'),\n                                    react_1.default.createElement(core_1.ButtonGroup, { disabled: !isReady }, [1, 2, 4, 8, 16].map(function (speed) {\n                                        var variant = playbackSpeed === speed ? \"contained\" : \"outlined\";\n                                        return react_1.default.createElement(core_1.Button, { color: \"primary\", variant: variant, onClick: function () {\n                                                setPlaybackSpeed(speed);\n                                            } },\n                                            speed,\n                                            \"x\");\n                                    }))),\n                                react_1.default.createElement(\"br\", null),\n                                react_1.default.createElement(core_1.Slider, { value: turn, disabled: !isReady, onChange: handleChange, \"aria-labelledby\": \"continuous-slider\", min: sliderConfigs.min, step: sliderConfigs.step, max: sliderConfigs.max }),\n                                react_1.default.createElement(core_1.ButtonGroup, { color: \"primary\" },\n                                    react_1.default.createElement(core_1.Button, { disabled: !isReady, onClick: function () {\n                                            if (turn > 0) {\n                                                moveToTurn(turn - 1);\n                                            }\n                                        } }, '<'),\n                                    react_1.default.createElement(core_1.Button, { disabled: !isReady, onClick: function () {\n                                            if (turn < configs.parameters.MAX_TURNS) {\n                                                moveToTurn(turn + 1);\n                                            }\n                                        } }, '>')),\n                                react_1.default.createElement(\"br\", null),\n                                react_1.default.createElement(core_1.FormControlLabel, { value: \"Toggle Energium Values Overlay\", control: react_1.default.createElement(core_1.Checkbox, { onChange: handleTextOverlayCheckChange }), disabled: !isReady, label: \"Toggle Energium Values Overlay\", labelPlacement: 'end' })))),\n                    react_1.default.createElement(core_1.Grid, { item: true, xs: 6 },\n                        react_1.default.createElement(core_1.Card, { className: \"stats\" },\n                            react_1.default.createElement(core_1.CardContent, null,\n                                selectedTileData && (react_1.default.createElement(TileStats_1.default, __assign({}, selectedTileData))),\n                                react_1.default.createElement(GameStats_1.default, { turn: turn }),\n                                currentFrame !== null &&\n                                    [0, 1].map(function (team) {\n                                        return (react_1.default.createElement(PlayerStats_1.default, { key: team, points: currentFrame.teamStates[team].points, team: team, unitCount: currentFrame.teamStates[team].unitCount }));\n                                    }),\n                                currentFrame !== null && react_1.default.createElement(\"p\", null,\n                                    currentFrame.errors.length,\n                                    \" warnings / events this turn \"),\n                                currentFrame !== null && currentFrame.errors.map(function (m) {\n                                    return react_1.default.createElement(\"p\", null, m);\n                                })))),\n                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, !noUpload && renderUploadButton()))))));\n};\n\n\n//# sourceURL=webpack:///./src/components/Game.tsx?");

/***/ }),

/***/ "./src/components/GameStats/index.tsx":
/*!********************************************!*\
  !*** ./src/components/GameStats/index.tsx ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Divider_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/esm/Divider/index.js\"));\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n__webpack_require__(/*! ./styles.css */ \"./src/components/GameStats/styles.css\");\nvar PlayerStats = function (_a) {\n    var turn = _a.turn;\n    return (react_1.default.createElement(\"div\", { className: \"GameStats\" },\n        react_1.default.createElement(\"p\", null,\n            \"Turn \",\n            turn,\n            \" \"),\n        react_1.default.createElement(Divider_1.default, null)));\n};\nexports.default = PlayerStats;\n\n\n//# sourceURL=webpack:///./src/components/GameStats/index.tsx?");

/***/ }),

/***/ "./src/components/GameStats/styles.css":
/*!*********************************************!*\
  !*** ./src/components/GameStats/styles.css ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/GameStats/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/GameStats/styles.css?");

/***/ }),

/***/ "./src/components/PlayerStats/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/PlayerStats/index.tsx ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Divider_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/esm/Divider/index.js\"));\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n__webpack_require__(/*! ./styles.css */ \"./src/components/PlayerStats/styles.css\");\nvar PlayerStats = function (_a) {\n    var team = _a.team, points = _a.points, unitCount = _a.unitCount;\n    return (react_1.default.createElement(\"div\", { className: \"PlayerStats\" },\n        react_1.default.createElement(\"h3\", null,\n            \"Team \",\n            team,\n            \" Stats\"),\n        react_1.default.createElement(\"p\", null,\n            \"Points: \",\n            points),\n        react_1.default.createElement(\"p\", null,\n            \"# of Collectors: \",\n            unitCount),\n        react_1.default.createElement(Divider_1.default, null)));\n};\nexports.default = PlayerStats;\n\n\n//# sourceURL=webpack:///./src/components/PlayerStats/index.tsx?");

/***/ }),

/***/ "./src/components/PlayerStats/styles.css":
/*!***********************************************!*\
  !*** ./src/components/PlayerStats/styles.css ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/PlayerStats/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/PlayerStats/styles.css?");

/***/ }),

/***/ "./src/components/TileStats/index.tsx":
/*!********************************************!*\
  !*** ./src/components/TileStats/index.tsx ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Divider_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/esm/Divider/index.js\"));\nvar Grid_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Grid */ \"./node_modules/@material-ui/core/esm/Grid/index.js\"));\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n__webpack_require__(/*! ./styles.css */ \"./src/components/TileStats/styles.css\");\nvar UnitCard_1 = __importDefault(__webpack_require__(/*! ../UnitCard */ \"./src/components/UnitCard/index.tsx\"));\nvar Energium_1 = __webpack_require__(/*! ../Energium */ \"./src/components/Energium/index.tsx\");\nvar TileStats = function (_a) {\n    var pos = _a.pos, units = _a.units, pointsPerTurn = _a.pointsPerTurn;\n    return (react_1.default.createElement(\"div\", { className: \"TileStats\" },\n        react_1.default.createElement(\"p\", null,\n            \"Tile at (\",\n            pos.x,\n            \", \",\n            pos.y,\n            \")\"),\n        pointsPerTurn >= 0 ?\n            react_1.default.createElement(\"p\", null,\n                react_1.default.createElement(Energium_1.Energium, null),\n                \" Here: \",\n                pointsPerTurn) :\n            react_1.default.createElement(\"p\", null,\n                react_1.default.createElement(Energium_1.Energium, null),\n                \" Cost Here: \",\n                pointsPerTurn),\n        react_1.default.createElement(Grid_1.default, { container: true, className: \"UnitStats\" }, Array.from(units.values()).map(function (v) {\n            return (react_1.default.createElement(Grid_1.default, { item: true, className: \"UnitData\", xs: 3, key: v.id },\n                react_1.default.createElement(UnitCard_1.default, __assign({}, v))));\n        })),\n        react_1.default.createElement(Divider_1.default, null)));\n};\nexports.default = TileStats;\n\n\n//# sourceURL=webpack:///./src/components/TileStats/index.tsx?");

/***/ }),

/***/ "./src/components/TileStats/styles.css":
/*!*********************************************!*\
  !*** ./src/components/TileStats/styles.css ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/TileStats/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/TileStats/styles.css?");

/***/ }),

/***/ "./src/components/UnitCard/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/UnitCard/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar CardContent_1 = __importDefault(__webpack_require__(/*! @material-ui/core/CardContent */ \"./node_modules/@material-ui/core/esm/CardContent/index.js\"));\nvar Card_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Card */ \"./node_modules/@material-ui/core/esm/Card/index.js\"));\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n__webpack_require__(/*! ./styles.css */ \"./src/components/UnitCard/styles.css\");\nvar UnitCard = function (_a) {\n    var pos = _a.pos, id = _a.id, breakdownLevel = _a.breakdownLevel, lastRepaired = _a.lastRepaired, team = _a.team;\n    return (react_1.default.createElement(Card_1.default, { className: \"UnitCard\" },\n        react_1.default.createElement(CardContent_1.default, { className: \"card-\" + team },\n            react_1.default.createElement(\"p\", null,\n                \"Collector Bot ID: \",\n                id),\n            react_1.default.createElement(\"p\", null,\n                \"Breakdown: \",\n                breakdownLevel),\n            react_1.default.createElement(\"p\", null,\n                \"Last Repaired: \",\n                lastRepaired))));\n};\nexports.default = UnitCard;\n\n\n//# sourceURL=webpack:///./src/components/UnitCard/index.tsx?");

/***/ }),

/***/ "./src/components/UnitCard/styles.css":
/*!********************************************!*\
  !*** ./src/components/UnitCard/styles.css ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/UnitCard/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/UnitCard/styles.css?");

/***/ }),

/***/ "./src/components/styles.css":
/*!***********************************!*\
  !*** ./src/components/styles.css ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/styles.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/components/styles.css?");

/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createGame = exports.config = void 0;\n__webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar MainScene_1 = __importDefault(__webpack_require__(/*! ../scenes/MainScene */ \"./src/scenes/MainScene.ts\"));\nexports.config = {\n    type: Phaser.AUTO,\n    parent: 'content',\n    width: 640,\n    height: 640,\n    zoom: 0.5,\n    render: {\n        pixelArt: true,\n    },\n    backgroundColor: '#EDEEC9',\n    scene: [],\n};\nexports.createGame = function (configs) {\n    var mapWidth = configs.replayData.map[0].length;\n    exports.config.width = 32 * mapWidth;\n    exports.config.height = 32 * mapWidth;\n    if (mapWidth <= 12) {\n        exports.config.zoom = 1.5;\n    }\n    else if (mapWidth <= 16) {\n        exports.config.zoom = 1;\n    }\n    else if (mapWidth <= 20) {\n        exports.config.zoom = 0.75;\n    }\n    else {\n        exports.config.zoom = 0.5;\n    }\n    var game = new Phaser.Game(exports.config);\n    game.scene.add('MainScene', MainScene_1.default, true, configs);\n    return game;\n};\n\n\n//# sourceURL=webpack:///./src/game/index.ts?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\"));\nvar App_1 = __importDefault(__webpack_require__(/*! ./App */ \"./src/App.tsx\"));\nreact_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.querySelector('#root'));\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/scenes/MainScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/MainScene.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar defaults_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/defaults */ \"./node_modules/@acmucsd/energium-2020/lib/es6/defaults.js\");\nvar logic_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/logic */ \"./node_modules/@acmucsd/energium-2020/lib/es6/logic.js\");\nvar Game_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/Game */ \"./node_modules/@acmucsd/energium-2020/lib/es6/Game/index.js\");\nvar Unit_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/Unit */ \"./node_modules/@acmucsd/energium-2020/lib/es6/Unit/index.js\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/scenes/utils.ts\");\nvar position_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/Tile/position */ \"./node_modules/@acmucsd/energium-2020/lib/es6/Tile/position.js\");\nvar GameMap_1 = __webpack_require__(/*! @acmucsd/energium-2020/lib/es6/GameMap */ \"./node_modules/@acmucsd/energium-2020/lib/es6/GameMap/index.js\");\nvar tileMapping_1 = __webpack_require__(/*! ./tileMapping */ \"./src/scenes/tileMapping.ts\");\nvar MainScene = /** @class */ (function (_super) {\n    __extends(MainScene, _super);\n    function MainScene() {\n        var _this = _super.call(this, {\n            key: 'MainScene',\n        }) || this;\n        _this.workers = [];\n        _this.unitSprites = new Map();\n        _this.currentTurn = 0;\n        _this.frames = [];\n        _this.currentTurnErrors = [];\n        _this.pseudomatch = {\n            state: {},\n            configs: {\n                storeReplay: false,\n                debug: false,\n            },\n            throw: function (id, err) {\n                _this.currentTurnErrors.push(\"Team \" + id + \" - \" + err);\n            },\n            sendAll: function () { },\n            send: function () { },\n            log: {\n                detail: function () { },\n                warn: function (m) {\n                    _this.currentTurnErrors.push(m);\n                },\n            },\n            agents: [],\n        };\n        _this.text = [];\n        _this.showTextOverlay = false;\n        _this.winningTeam = 0;\n        _this.turn = 0;\n        _this.currentSelectedTilePos = null;\n        return _this;\n    }\n    MainScene.prototype.preload = function () {\n        this.load.image('space', 'assets/tilemaps/kothtiles.png');\n        this.load.image('worker0', 'assets/sprites/worker0.png');\n        this.load.image('worker1', 'assets/sprites/worker1.png');\n    };\n    MainScene.prototype.onTileClicked = function (v) {\n        var f = this.frames[this.turn];\n        var unitDataAtXY = new Map();\n        f.unitData.forEach(function (unit) {\n            if (unit.pos.x === v.x && unit.pos.y === v.y) {\n                unitDataAtXY.set(unit.id, unit);\n            }\n        });\n        var clickedPos = new position_1.Position(v.x, v.y);\n        this.handleTileClicked({\n            pos: clickedPos,\n            units: unitDataAtXY,\n            pointsPerTurn: this.replayData.map[v.y][v.x].ppt\n        });\n        this.currentSelectedTilePos = clickedPos;\n    };\n    MainScene.prototype.getTileIndexForPoints = function (pts) {\n        if (pts === 0) {\n            return 1;\n        }\n        if (pts < 0) {\n            return Math.min(8 - Math.round(pts / 2), 19);\n        }\n        if (pts > 0) {\n            return Math.max(6 - Math.round(pts / 2), 2);\n        }\n    };\n    MainScene.prototype.toggleTextOverlay = function () {\n        var _this = this;\n        this.showTextOverlay = !this.showTextOverlay;\n        this.text.forEach(function (a) {\n            a.setVisible(_this.showTextOverlay);\n        });\n    };\n    MainScene.prototype.loadReplayData = function (replayData) {\n        var _this = this;\n        this.replayData = replayData;\n        this.kothgame = new Game_1.Game(defaults_1.DEFAULT_CONFIGS);\n        var width = replayData.map[0].length;\n        var height = replayData.map.length;\n        this.kothgame.map = new GameMap_1.GameMap(width, height);\n        this.replayData.bases.forEach(function (b) {\n            _this.kothgame.map.setBase(b.team, b.x, b.y);\n        });\n        var level = [];\n        for (var y = 0; y < height; y++) {\n            level.push([]);\n            for (var x = 0; x < width; x++) {\n                // const c = [4, 14, 15, 16][Math.floor(Math.random() *  4)];\n                var c = this.getTileIndexForPoints(replayData.map[y][x].ppt);\n                level[y].push(c);\n            }\n        }\n        this.map = this.make.tilemap({\n            data: level,\n            tileWidth: 8,\n            tileHeight: 8,\n        });\n        var tileset = this.map.addTilesetImage('space');\n        this.map.createStaticLayer(0, tileset, 0, 0).setScale(4);\n        this.input.on(Phaser.Input.Events.POINTER_DOWN, function (d) {\n            var v = _this.map.worldToTileXY(d.worldX, d.worldY);\n            _this.onTileClicked(new position_1.Position(v.x, v.y));\n        });\n        this.dynamicLayer = this.map\n            .createBlankDynamicLayer('bases', tileset)\n            .setScale(4);\n        for (var y = 0; y < height; y++) {\n            for (var x = 0; x < width; x++) {\n                var pixels = utils_1.mapPosToPixels(new position_1.Position(x, y));\n                var text = this.add.text(pixels[0] - 8, pixels[1] - 8, replayData.map[y][x].ppt);\n                text.setVisible(false);\n                this.text.push(text);\n            }\n        }\n        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);\n        // load the initial state from replay\n        // this.pseudomatch.configs.preLoadedGame = this.kothgame;\n        this.pseudomatch.configs.seed = this.replayData.seed;\n        // setTimeout(() => {\n        logic_1.EnergiumLogic.initialize(this.pseudomatch).then(function () {\n            _this.generateGameFrames(replayData).then(function () {\n                _this.renderFrame(0);\n                _this.storeResults();\n                _this.game.events.emit('setup');\n            });\n        });\n        // }, 1000);\n    };\n    MainScene.prototype.storeResults = function () {\n        var lastFrame = this.frames[this.frames.length - 1];\n        var apts = lastFrame.teamStates[Unit_1.Unit.TEAM.A].points;\n        var bpts = lastFrame.teamStates[Unit_1.Unit.TEAM.B].points;\n        if (bpts > apts) {\n            this.winningTeam = 1;\n        }\n        else if (bpts === apts) {\n            this.winningTeam = -1;\n        }\n    };\n    /**\n     * Creates a snapshot of the game state\n     * @param game\n     */\n    MainScene.prototype.createFrame = function (game, commands) {\n        var _a;\n        var teamStates = (_a = {},\n            _a[Unit_1.Unit.TEAM.A] = {\n                points: game.state.teamStates[Unit_1.Unit.TEAM.A].points,\n                unitCount: game.getTeamsUnits(Unit_1.Unit.TEAM.A).size\n            },\n            _a[Unit_1.Unit.TEAM.B] = {\n                points: game.state.teamStates[Unit_1.Unit.TEAM.B].points,\n                unitCount: game.getTeamsUnits(Unit_1.Unit.TEAM.B).size\n            },\n            _a);\n        var unitData = new Map();\n        __spreadArrays(Array.from(game.getTeamsUnits(Unit_1.Unit.TEAM.A).values()), Array.from(game.getTeamsUnits(Unit_1.Unit.TEAM.B).values())).forEach(function (unit) {\n            unitData.set(unit.id, {\n                team: unit.team,\n                id: unit.id,\n                pos: unit.pos,\n                lastRepaired: unit.lastRepairTurn,\n                breakdownLevel: unit.getBreakdownLevel(game.state.turn, game.configs.parameters.BREAKDOWN_TURNS)\n            });\n        });\n        return {\n            unitData: unitData,\n            teamStates: teamStates,\n            errors: this.currentTurnErrors,\n            commands: commands,\n        };\n    };\n    MainScene.prototype.create = function (configs) {\n        console.log(configs);\n        this.loadReplayData(configs.replayData);\n        this.handleTileClicked = configs.handleTileClicked;\n        this.events.emit('created');\n    };\n    MainScene.prototype.addUnitSprite = function (x, y, team, id) {\n        var p = utils_1.mapCoordsToPixels(x, y);\n        var sprite = this.add.sprite(p[0], p[1], 'worker' + team).setScale(1.5);\n        this.unitSprites.set(id, sprite);\n        return sprite;\n    };\n    MainScene.prototype.renderFrame = function (turn) {\n        var _this = this;\n        this.turn = turn;\n        var f = this.frames[turn];\n        if (!f) {\n            return;\n        }\n        var visibleUnits = new Set();\n        f.unitData.forEach(function (data) {\n            var id = data.id;\n            var sprite = _this.unitSprites.get(id);\n            sprite.setVisible(true);\n            var p = utils_1.mapPosToPixels(data.pos);\n            sprite.x = p[0];\n            sprite.y = p[1];\n            visibleUnits.add(id);\n        });\n        this.unitSprites.forEach(function (sprite, key) {\n            if (!visibleUnits.has(key)) {\n                sprite.setVisible(false);\n            }\n        });\n        if (this.currentSelectedTilePos !== null) {\n            this.onTileClicked(this.currentSelectedTilePos);\n        }\n        this.replayData.bases.forEach(function (b) {\n            var n = tileMapping_1.TILE_MAPPING.BASE0;\n            if (b.team === Unit_1.Unit.TEAM.B) {\n                n = tileMapping_1.TILE_MAPPING.BASE1;\n            }\n            _this.dynamicLayer.putTileAt(n, b.x, b.y, true);\n        });\n    };\n    MainScene.prototype.generateGameFrames = function (replayData) {\n        return __awaiter(this, void 0, void 0, function () {\n            var commands, state, game, frame;\n            var _this = this;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        if (!(this.currentTurn <= this.kothgame.configs.parameters.MAX_TURNS)) return [3 /*break*/, 2];\n                        this.currentTurnErrors = [];\n                        commands = replayData.allCommands[this.currentTurn];\n                        state = this.pseudomatch.state;\n                        game = state.game;\n                        return [4 /*yield*/, logic_1.EnergiumLogic.update(this.pseudomatch, commands)];\n                    case 1:\n                        _a.sent();\n                        __spreadArrays(Array.from(game.getTeamsUnits(Unit_1.Unit.TEAM.A).values()), Array.from(game.getTeamsUnits(Unit_1.Unit.TEAM.B).values())).forEach(function (unit) {\n                            if (_this.unitSprites.has(unit.id)) {\n                                // const sprite = this.unitSprites.get(unit.id);\n                                // const p = mapPosToPixels(unit.pos);\n                                // this.tweens.add({\n                                //   targets: sprite,\n                                //   x: p[0],\n                                //   y: p[1],\n                                //   ease: 'Linear',\n                                //   duration: 100,\n                                //   repeat: 0,\n                                //   yoyo: false,\n                                // });\n                            }\n                            else {\n                                _this.addUnitSprite(unit.pos.x, unit.pos.y, unit.team, unit.id).setVisible(false);\n                            }\n                        });\n                        frame = this.createFrame(this.pseudomatch.state.game, commands);\n                        // console.log(\n                        //   { turn: this.currentTurn },\n                        //   'frame size',\n                        //   memorySizeOf(frame)\n                        // );\n                        this.frames.push(frame);\n                        this.currentTurn++;\n                        return [3 /*break*/, 0];\n                    case 2:\n                        console.log(this.frames);\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    MainScene.prototype.update = function (time, delta) { };\n    return MainScene;\n}(Phaser.Scene));\nexports.default = MainScene;\n\n\n//# sourceURL=webpack:///./src/scenes/MainScene.ts?");

/***/ }),

/***/ "./src/scenes/tileMapping.ts":
/*!***********************************!*\
  !*** ./src/scenes/tileMapping.ts ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TILE_MAPPING = void 0;\nexports.TILE_MAPPING = {\n    BASE0: 24,\n    BASE1: 25,\n};\n\n\n//# sourceURL=webpack:///./src/scenes/tileMapping.ts?");

/***/ }),

/***/ "./src/scenes/utils.ts":
/*!*****************************!*\
  !*** ./src/scenes/utils.ts ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.memorySizeOf = exports.hashMapCoords = exports.mapCoordsToPixels = exports.mapPosToPixels = void 0;\nexports.mapPosToPixels = function (pos) {\n    return exports.mapCoordsToPixels(pos.x, pos.y);\n};\nexports.mapCoordsToPixels = function (x, y) {\n    return [x * 32 + 16, y * 32 + 16];\n};\nexports.hashMapCoords = function (pos, map) {\n    // return pos.x * Math.max(map.width, map.height) + pos.y;\n    if (map.width > map.height) {\n        return pos.x * map.width + pos.y;\n    }\n    else {\n        return pos.y * map.height + pos.x;\n    }\n};\nexports.memorySizeOf = function (obj) {\n    var bytes = 0;\n    function sizeOf(obj) {\n        if (obj !== null && obj !== undefined) {\n            switch (typeof obj) {\n                case 'number':\n                    bytes += 8;\n                    break;\n                case 'string':\n                    bytes += obj.length * 2;\n                    break;\n                case 'boolean':\n                    bytes += 4;\n                    break;\n                case 'object':\n                    var objClass = Object.prototype.toString.call(obj).slice(8, -1);\n                    if (objClass === 'Object' || objClass === 'Array') {\n                        for (var key in obj) {\n                            if (!obj.hasOwnProperty(key))\n                                continue;\n                            sizeOf(obj[key]);\n                        }\n                    }\n                    else\n                        bytes += obj.toString().length * 2;\n                    break;\n            }\n        }\n        return bytes;\n    }\n    function formatByteSize(bytes) {\n        if (bytes < 1024)\n            return bytes + ' bytes';\n        else if (bytes < 1048576)\n            return (bytes / 1024).toFixed(3) + ' KiB';\n        else if (bytes < 1073741824)\n            return (bytes / 1048576).toFixed(3) + ' MiB';\n        else\n            return (bytes / 1073741824).toFixed(3) + ' GiB';\n    }\n    return formatByteSize(sizeOf(obj));\n};\n\n\n//# sourceURL=webpack:///./src/scenes/utils.ts?");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/index.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/index.css?");

/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ })

/******/ });
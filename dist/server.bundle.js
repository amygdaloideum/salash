/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "daed21cc24c1cedc8be2"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, (function(name) {
/******/ 					return {
/******/ 						configurable: true,
/******/ 						enumerable: true,
/******/ 						get: function() {
/******/ 							return __webpack_require__[name];
/******/ 						},
/******/ 						set: function(value) {
/******/ 							__webpack_require__[name] = value;
/******/ 						}
/******/ 					};
/******/ 				}(name)));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailableFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailableFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(__webpack_require__.s === moduleId) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					dependency = moduleOutdatedDependencies[j];
/******/ 					idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(108)(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 2 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 3 */
/*!*****************************!*\
  !*** external "react-intl" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./server/config/config.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/salash',
	  port: process.env.PORT || 8000,
	  secret: 'hehuhe'
	};
	
	exports.default = config;

/***/ },
/* 5 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 7 */
/*!**********************************!*\
  !*** ./client/util/apiCaller.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 117);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(/*! ../../server/config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';
	
	function callApi(endpoint) {
	  var method = arguments.length <= 1 || arguments[1] === undefined ? 'get' : arguments[1];
	  var body = arguments[2];
	
	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	    credentials: 'same-origin',
	    headers: { 'content-type': 'application/json' },
	    method: method,
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref) {
	    var json = _ref.json;
	    var response = _ref.response;
	
	    if (!response.ok) {
	      return Promise.reject(json);
	    }
	
	    return json;
	  }).then(function (response) {
	    return response;
	  }, function (error) {
	    return error;
	  });
	}

/***/ },
/* 8 */
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 9 */
/*!************************!*\
  !*** external "limax" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("limax");

/***/ },
/* 10 */
/*!***********************!*\
  !*** external "cuid" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 11 */
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 12 */
/*!*****************************!*\
  !*** external "redux-form" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 13 */
/*!******************************************!*\
  !*** ./client/modules/App/AppActions.js ***!
  \******************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toggleAddPost = toggleAddPost;
	exports.toggleAddRecipe = toggleAddRecipe;
	// Export Constants
	var TOGGLE_ADD_POST = exports.TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
	var TOGGLE_ADD_RECIPE = exports.TOGGLE_ADD_RECIPE = 'TOGGLE_ADD_RECIPE';
	
	// Export Actions
	function toggleAddPost() {
	  return {
	    type: TOGGLE_ADD_POST
	  };
	}
	
	function toggleAddRecipe() {
	  return {
	    type: TOGGLE_ADD_RECIPE
	  };
	}

/***/ },
/* 14 */
/*!****************************************************!*\
  !*** ./client/modules/Category/CategoryActions.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_CATEGORIES = undefined;
	exports.addCategories = addCategories;
	exports.fetchCategories = fetchCategories;
	
	var _apiCaller = __webpack_require__(/*! ../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_CATEGORIES = exports.ADD_CATEGORIES = 'ADD_CATEGORIES';
	
	// Export Actions
	function addCategories(categories) {
	  return {
	    type: ADD_CATEGORIES,
	    categories: categories
	  };
	}
	
	function fetchCategories() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('categories').then(function (res) {
	      dispatch(addCategories(res.categories));
	    });
	  };
	}

/***/ },
/* 15 */
/*!****************************************************!*\
  !*** ./client/modules/Category/CategoryReducer.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCategories = undefined;
	
	var _CategoryActions = __webpack_require__(/*! ./CategoryActions */ 14);
	
	// Initial State
	var initialState = { data: [] }; // Import Actions
	
	
	var CategoryReducer = function CategoryReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _CategoryActions.ADD_CATEGORIES:
	      return {
	        data: action.categories
	      };
	
	    default:
	      return state;
	  }
	};
	
	exports.default = CategoryReducer;
	var getCategories = exports.getCategories = function getCategories(state) {
	  return state.categories.data;
	};

/***/ },
/* 16 */
/*!************************************************!*\
  !*** ./client/modules/Recipe/RecipeActions.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_RECIPES = exports.ADD_RECIPE = undefined;
	exports.addRecipes = addRecipes;
	exports.addRecipe = addRecipe;
	exports.fetchRecipes = fetchRecipes;
	exports.fetchRecipe = fetchRecipe;
	exports.searchRecipes = searchRecipes;
	exports.addRecipeRequest = addRecipeRequest;
	
	var _apiCaller = __webpack_require__(/*! ../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _queryBuilder = __webpack_require__(/*! ../../util/queryBuilder */ 99);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_RECIPE = exports.ADD_RECIPE = 'ADD_RECIPE';
	var ADD_RECIPES = exports.ADD_RECIPES = 'ADD_RECIPES';
	// Export Actions
	
	function addRecipes(recipes) {
	  return {
	    type: ADD_RECIPES,
	    recipes: recipes
	  };
	}
	
	function addRecipe(recipe) {
	  return {
	    type: ADD_RECIPE,
	    recipe: recipe
	  };
	}
	
	function fetchRecipes() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes').then(function (res) {
	      dispatch(addRecipes(res.recipes));
	    });
	  };
	}
	
	function fetchRecipe(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes/' + cuid).then(function (res) {
	      return dispatch(addRecipe(res.recipe));
	    });
	  };
	}
	
	function searchRecipes(query) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)((0, _queryBuilder.build)(query)).then(function (res) {
	      dispatch(addRecipes(res.recipes));
	    });
	  };
	}
	
	function addRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes', 'post', { recipe: recipe }).then(function (res) {
	      _reactRouter.browserHistory.push('/created');
	    });
	  };
	}

/***/ },
/* 17 */
/*!******************************************!*\
  !*** ./client/modules/App/AppReducer.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getShowAddRecipe = exports.getShowAddPost = undefined;
	
	var _AppActions = __webpack_require__(/*! ./AppActions */ 13);
	
	// Initial State
	var initialState = {
	  showAddPost: false,
	  showAddRecipe: false
	}; // Import Actions
	
	
	var AppReducer = function AppReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _AppActions.TOGGLE_ADD_POST:
	      return {
	        showAddPost: !state.showAddPost
	      };
	
	    case _AppActions.TOGGLE_ADD_RECIPE:
	      return {
	        showAddRecipe: !state.showAddRecipe
	      };
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get showAddPost
	var getShowAddPost = exports.getShowAddPost = function getShowAddPost(state) {
	  return state.app.showAddPost;
	};
	
	var getShowAddRecipe = exports.getShowAddRecipe = function getShowAddRecipe(state) {
	  return state.app.showAddRecipe;
	};
	
	// Export Reducer
	exports.default = AppReducer;

/***/ },
/* 18 */
/*!********************************************!*\
  !*** ./client/modules/Post/PostActions.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DELETE_POST = exports.ADD_POSTS = exports.ADD_POST = undefined;
	exports.addPost = addPost;
	exports.addPostRequest = addPostRequest;
	exports.addPosts = addPosts;
	exports.fetchPosts = fetchPosts;
	exports.fetchPost = fetchPost;
	exports.deletePost = deletePost;
	exports.deletePostRequest = deletePostRequest;
	
	var _apiCaller = __webpack_require__(/*! ../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_POST = exports.ADD_POST = 'ADD_POST';
	var ADD_POSTS = exports.ADD_POSTS = 'ADD_POSTS';
	var DELETE_POST = exports.DELETE_POST = 'DELETE_POST';
	
	// Export Actions
	function addPost(post) {
	  return {
	    type: ADD_POST,
	    post: post
	  };
	}
	
	function addPostRequest(post) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts', 'post', {
	      post: {
	        name: post.name,
	        title: post.title,
	        content: post.content
	      }
	    }).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}
	
	function addPosts(posts) {
	  return {
	    type: ADD_POSTS,
	    posts: posts
	  };
	}
	
	function fetchPosts() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts').then(function (res) {
	      dispatch(addPosts(res.posts));
	    });
	  };
	}
	
	function fetchPost(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}
	
	function deletePost(cuid) {
	  return {
	    type: DELETE_POST,
	    cuid: cuid
	  };
	}
	
	function deletePostRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid, 'delete').then(function () {
	      return dispatch(deletePost(cuid));
	    });
	  };
	}

/***/ },
/* 19 */
/*!********************************************!*\
  !*** ./client/modules/Post/PostReducer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPost = exports.getPosts = undefined;
	
	var _PostActions = __webpack_require__(/*! ./PostActions */ 18);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Initial State
	var initialState = { data: [] };
	
	var PostReducer = function PostReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _PostActions.ADD_POST:
	      return {
	        data: [action.post].concat(_toConsumableArray(state.data))
	      };
	
	    case _PostActions.ADD_POSTS:
	      return {
	        data: action.posts
	      };
	
	    case _PostActions.DELETE_POST:
	      return {
	        data: state.data.filter(function (post) {
	          return post.cuid !== action.cuid;
	        })
	      };
	
	    default:
	      return state;
	  }
	};
	
	/* Selectors */
	
	// Get all posts
	var getPosts = exports.getPosts = function getPosts(state) {
	  return state.posts.data;
	};
	
	// Get post by cuid
	var getPost = exports.getPost = function getPost(state, cuid) {
	  return state.posts.data.filter(function (post) {
	    return post.cuid === cuid;
	  })[0];
	};
	
	// Export Reducer
	exports.default = PostReducer;

/***/ },
/* 20 */
/*!************************************************!*\
  !*** ./client/modules/Recipe/RecipeReducer.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRecipe = exports.getRecipes = undefined;
	
	var _RecipeActions = __webpack_require__(/*! ./RecipeActions */ 16);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Import Actions
	
	
	// Initial State
	var initialState = { data: [] };
	
	var RecipeReducer = function RecipeReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	
	    case _RecipeActions.ADD_RECIPE:
	      return {
	        data: [action.recipe].concat(_toConsumableArray(state.data))
	      };
	
	    case _RecipeActions.ADD_RECIPES:
	      return {
	        data: action.recipes
	      };
	
	    default:
	      return state;
	  }
	};
	
	var getRecipes = exports.getRecipes = function getRecipes(state) {
	  return state.recipes.data;
	};
	
	var getRecipe = exports.getRecipe = function getRecipe(state, cuid) {
	  return state.recipes.data.filter(function (recipe) {
	    return recipe.cuid === cuid;
	  })[0];
	};
	
	exports.default = RecipeReducer;

/***/ },
/* 21 */
/*!****************************!*\
  !*** ./client/reducers.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 53);
	
	var _AppReducer = __webpack_require__(/*! ./modules/App/AppReducer */ 17);
	
	var _AppReducer2 = _interopRequireDefault(_AppReducer);
	
	var _PostReducer = __webpack_require__(/*! ./modules/Post/PostReducer */ 19);
	
	var _PostReducer2 = _interopRequireDefault(_PostReducer);
	
	var _RecipeReducer = __webpack_require__(/*! ./modules/Recipe/RecipeReducer */ 20);
	
	var _RecipeReducer2 = _interopRequireDefault(_RecipeReducer);
	
	var _CategoryReducer = __webpack_require__(/*! ./modules/Category/CategoryReducer */ 15);
	
	var _CategoryReducer2 = _interopRequireDefault(_CategoryReducer);
	
	var _IntlReducer = __webpack_require__(/*! ./modules/Intl/IntlReducer */ 88);
	
	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);
	
	var _AuthReducer = __webpack_require__(/*! ./modules/Auth/AuthReducer */ 32);
	
	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);
	
	var _UserReducer = __webpack_require__(/*! ./modules/User/UserReducer */ 45);
	
	var _UserReducer2 = _interopRequireDefault(_UserReducer);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 52);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	  routing: _reactRouterRedux.routerReducer,
	  form: _reduxForm.reducer,
	  app: _AppReducer2.default,
	  posts: _PostReducer2.default,
	  recipes: _RecipeReducer2.default,
	  categories: _CategoryReducer2.default,
	  auth: _AuthReducer2.default,
	  intl: _IntlReducer2.default,
	  user: _UserReducer2.default
	});
	
	// Import Reducers

/***/ },
/* 22 */
/*!***********************************!*\
  !*** ./server/models/category.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var categorySchema = new Schema({
	  _id: { type: 'String', required: true },
	  title: { type: 'String', required: true },
	  plural: { type: 'String', required: true }
	});
	
	exports.default = _mongoose2.default.model('Category', categorySchema);

/***/ },
/* 23 */
/*!********************************!*\
  !*** ./server/util/dbUtils.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSession = getSession;
	
	var _neo4j = __webpack_require__(/*! ../config/neo4j */ 100);
	
	var _neo4j2 = _interopRequireDefault(_neo4j);
	
	var _neo4jDriver = __webpack_require__(/*! neo4j-driver */ 118);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var driver = _neo4jDriver.v1.driver(_neo4j2.default.URL_LOCAL, _neo4jDriver.v1.auth.basic(_neo4j2.default.USERNAME, _neo4j2.default.PASSWORD));
	
	function getSession(context) {
	  if (context.neo4jSession) {
	    return context.neo4jSession;
	  } else {
	    context.neo4jSession = driver.session();
	    return context.neo4jSession;
	  }
	}

/***/ },
/* 24 */
/*!**************************!*\
  !*** external "cookies" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("cookies");

/***/ },
/* 25 */
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 26 */
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 27 */
/*!***********************!*\
  !*** ./Intl/setup.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _intl = __webpack_require__(/*! intl */ 113);
	
	var _intl2 = _interopRequireDefault(_intl);
	
	var _intlLocalesSupported = __webpack_require__(/*! intl-locales-supported */ 114);
	
	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);
	
	__webpack_require__(/*! intl/locale-data/jsonp/en */ 115);
	
	var _en = __webpack_require__(/*! react-intl/locale-data/en */ 126);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _en3 = __webpack_require__(/*! ./localizationData/en */ 77);
	
	var _en4 = _interopRequireDefault(_en3);
	
	__webpack_require__(/*! intl/locale-data/jsonp/fr */ 116);
	
	var _fr = __webpack_require__(/*! react-intl/locale-data/fr */ 127);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(/*! ./localizationData/fr */ 78);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en', 'fr'];
	
	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};
	
	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
	
	
	// need Intl polyfill, Intl not supported in Safari
	
	
	if (global.Intl) {
	  // Determine if the built-in `Intl` has the locale data we need.
	  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
	    // `Intl` exists, but it doesn't have the data we need, so load the
	    // polyfill and patch the constructors we need with the polyfill's.
	    global.Intl.NumberFormat = _intl2.default.NumberFormat;
	    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
	  }
	} else {
	  // No `Intl`, so use and load the polyfill.
	  global.Intl = _intl2.default;
	}
	
	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;
	
	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }
	
	    return messages;
	  }, {});
	}
	
	// bring in intl polyfill, react-intl, and app-specific language data
	
	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);
	
	(0, _reactIntl.addLocaleData)(_fr2.default);
	localizationData.fr = _fr4.default;
	localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ },
/* 28 */
/*!**********************************************!*\
  !*** ./client/components/form/formInputs.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SubmitButton = exports.renderTextarea = exports.renderInput = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _forminputs = {
	  "text-container": "forminputs__text-container__2KV1A",
	  "label-row": "forminputs__label-row__sQeCT",
	  "input-field": "forminputs__input-field__1EVAk",
	  "submit-button": "forminputs__submit-button__2ZSEb",
	  "validation-error": "forminputs__validation-error__Nu7Jb"
	};
	
	var _forminputs2 = _interopRequireDefault(_forminputs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderInput = exports.renderInput = function renderInput(_ref) {
	  var input = _ref.input;
	  var label = _ref.label;
	  var icon = _ref.icon;
	  var type = _ref.type;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  return _jsx('div', {
	    className: _forminputs2.default['text-container']
	  }, void 0, _jsx('div', {
	    className: _forminputs2.default['label-row']
	  }, void 0, _jsx('label', {}, void 0, label), ' ', touched && error && _jsx('span', {
	    className: _forminputs2.default['validation-error']
	  }, void 0, error)), _jsx('div', {
	    className: _forminputs2.default['input-field']
	  }, void 0, icon ? _jsx('i', {
	    className: 'fa ' + icon
	  }) : null, _react2.default.createElement('input', _extends({}, input, { type: type }))));
	};
	
	var renderTextarea = exports.renderTextarea = function renderTextarea(_ref2) {
	  var input = _ref2.input;
	  var label = _ref2.label;
	  var type = _ref2.type;
	  var _ref2$meta = _ref2.meta;
	  var touched = _ref2$meta.touched;
	  var error = _ref2$meta.error;
	  return _jsx('div', {
	    className: _forminputs2.default['text-container']
	  }, void 0, _jsx('label', {}, void 0, label), _jsx('div', {}, void 0, _react2.default.createElement('textarea', _extends({}, input, { type: type, placeholder: label })), touched && error && _jsx('span', {}, void 0, error)));
	};
	
	var SubmitButton = exports.SubmitButton = function SubmitButton(_ref3) {
	  var text = _ref3.text;
	  var _ref3$disabled = _ref3.disabled;
	  var invalid = _ref3$disabled.invalid;
	  var submitting = _ref3$disabled.submitting;
	  var pristine = _ref3$disabled.pristine;
	  return _jsx('button', {
	    className: _forminputs2.default['submit-button'],
	    disabled: invalid || submitting || pristine,
	    type: 'submit'
	  }, void 0, text);
	};

/***/ },
/* 29 */
/*!***************************************************!*\
  !*** ./client/modules/App/components/DevTools.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxDevtools = __webpack_require__(/*! redux-devtools */ 128);
	
	var _reduxDevtoolsLogMonitor = __webpack_require__(/*! redux-devtools-log-monitor */ 130);
	
	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);
	
	var _reduxDevtoolsDockMonitor = __webpack_require__(/*! redux-devtools-dock-monitor */ 129);
	
	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 30 */
/*!*********************************************************!*\
  !*** ./client/modules/App/pages/StartPage/StartPage.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _RecipeQuickSearch = __webpack_require__(/*! ../../../Recipe/components/RecipeQuickSearch/RecipeQuickSearch */ 39);
	
	var _RecipeQuickSearch2 = _interopRequireDefault(_RecipeQuickSearch);
	
	var _Menu = __webpack_require__(/*! ../../components/Menu/Menu */ 82);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _StartPage = {
	  "wrapper": "StartPage__wrapper__2rkdi",
	  "search": "StartPage__search__3FlCt",
	  "menu": "StartPage__menu__22pK5",
	  "bottom": "StartPage__bottom__19oKH"
	};
	
	var _StartPage2 = _interopRequireDefault(_StartPage);
	
	var _CategoryActions = __webpack_require__(/*! ../../../Category/CategoryActions */ 14);
	
	var _CategoryReducer = __webpack_require__(/*! ../../../Category/CategoryReducer */ 15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var _ref2 = _jsx('h1', {}, void 0, ' salash ');
	
	var _ref3 = _jsx('h2', {}, void 0, 'raw food recipe hub');
	
	var StartPage = function (_Component) {
	  _inherits(StartPage, _Component);
	
	  function StartPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, StartPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StartPage.__proto__ || Object.getPrototypeOf(StartPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleQuickSearch = function (fields) {
	      var ingredient1 = (0, _limax2.default)(encodeURIComponent(fields.ingredient1.replace(/\s/g, "-")));
	      var ingredient2 = (0, _limax2.default)(encodeURIComponent(fields.ingredient2.replace(/\s/g, "-")));
	      _reactRouter.browserHistory.push('/search?category=' + fields.category + '&ingredient=' + ingredient1 + '&ingredient=' + ingredient2);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(StartPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _CategoryActions.fetchCategories)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _StartPage2.default.wrapper
	      }, void 0, _jsx('div', {
	        className: _StartPage2.default.menu
	      }, void 0, _jsx(_Menu2.default, {
	        user: this.props.user
	      })), _ref2, _ref3, _jsx('div', {
	        className: _StartPage2.default.bottom
	      }, void 0, _jsx('div', {
	        className: _StartPage2.default.search
	      }, void 0, _jsx(_RecipeQuickSearch2.default, {
	        handleQuickSearch: this.handleQuickSearch,
	        categories: this.props.categories
	      }))));
	    }
	  }]);
	
	  return StartPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	StartPage.need = [function () {
	  return (0, _CategoryActions.fetchCategories)();
	}];
	
	//Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    categories: (0, _CategoryReducer.getCategories)(state),
	    user: state.auth.user
	  };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(StartPage);

/***/ },
/* 31 */
/*!********************************************!*\
  !*** ./client/modules/Auth/AuthActions.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RESET_PASSWORD_REQUEST = exports.FORGOT_PASSWORD_REQUEST = exports.AUTH_ERROR = exports.UNAUTH_USER = exports.AUTH_USER = undefined;
	exports.loginUser = loginUser;
	exports.authError = authError;
	exports.loginUserRequest = loginUserRequest;
	exports.facebookLoginRequest = facebookLoginRequest;
	
	var _apiCaller = __webpack_require__(/*! ../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _reactCookie = __webpack_require__(/*! react-cookie */ 125);
	
	var _reactCookie2 = _interopRequireDefault(_reactCookie);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 52);
	
	var _parseUrl = __webpack_require__(/*! ../../util/parse-url */ 98);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var AUTH_USER = exports.AUTH_USER = 'AUTH_USER';
	var UNAUTH_USER = exports.UNAUTH_USER = 'UNAUTH_USER';
	var AUTH_ERROR = exports.AUTH_ERROR = 'AUTH_ERROR';
	var FORGOT_PASSWORD_REQUEST = exports.FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST ';
	var RESET_PASSWORD_REQUEST = exports.RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST ';
	
	function loginUser(token, user) {
	  return {
	    type: AUTH_USER,
	    token: token,
	    user: user
	  };
	}
	
	function authError(message) {
	  return {
	    type: AUTH_ERROR,
	    message: message
	  };
	}
	
	function loginUserRequest(_ref) {
	  var email = _ref.email;
	  var password = _ref.password;
	
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('users/authenticate', 'post', { email: email, password: password }).then(function (res) {
	      if (res.success) {
	        _reactCookie2.default.save('token', res.token, { path: '/' });
	        dispatch(loginUser(res.token, res.user));
	        _reactRouter.browserHistory.push('/');
	      } else {
	        dispatch(authError(res.message));
	      }
	    });
	  };
	}
	
	var listenForCredentials = function listenForCredentials(popup, dispatch, resolve, reject) {
	  if (!resolve) {
	    return new Promise(function (resolve, reject) {
	      listenForCredentials(popup, dispatch, resolve, reject);
	    });
	  } else {
	    (function () {
	      var creds = void 0;
	      try {
	        creds = (0, _parseUrl.getAllParams)(popup.location);
	      } catch (err) {}
	
	      if (creds && creds.token) {
	        popup.close();
	        _reactCookie2.default.save('token', creds.token, { path: '/' });
	        (0, _apiCaller2.default)('auth/unwraptoken').then(function (user) {
	          return dispatch(loginUser(creds.token, user));
	        }).then(function () {
	          return resolve();
	        });
	      } else if (popup.closed) {
	        reject({ errors: "Authentication was cancelled." });
	      } else {
	        setTimeout(function () {
	          listenForCredentials(popup, dispatch, resolve, reject);
	        }, 0);
	      }
	    })();
	  }
	};
	
	function facebookLoginRequest() {
	  return function (dispatch) {
	    var settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no,width=580,height=400";
	    var popup = window.open('http://localhost:8000/api/auth/facebook', 'facebook', settings);
	    return listenForCredentials(popup, dispatch);
	  };
	}

/***/ },
/* 32 */
/*!********************************************!*\
  !*** ./client/modules/Auth/AuthReducer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMessage = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _AuthActions = __webpack_require__(/*! ./AuthActions */ 31);
	
	var initialState = {
	  error: '',
	  message: '',
	  content: '',
	  authenticated: false,
	  token: '',
	  user: {}
	};
	
	var AuthReducer = function AuthReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _AuthActions.AUTH_USER:
	      return _extends({}, state, { error: '', message: '', authenticated: true, token: action.token, user: action.user });
	
	    case _AuthActions.AUTH_ERROR:
	      return _extends({}, state, { error: '', message: action.message, authenticated: false });
	
	    default:
	      return state;
	  }
	};
	
	var getMessage = exports.getMessage = function getMessage(state) {
	  return state.auth.message;
	};
	
	exports.default = AuthReducer;

/***/ },
/* 33 */
/*!**********************************************************!*\
  !*** ./client/modules/Auth/pages/LoginPage/LoginPage.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _AuthActions = __webpack_require__(/*! ../../AuthActions */ 31);
	
	var _loginform = __webpack_require__(/*! ../../components/loginform/loginform */ 85);
	
	var _loginform2 = _interopRequireDefault(_loginform);
	
	var _SocialSignInButtons = __webpack_require__(/*! ../../components/SocialSignInButtons/SocialSignInButtons */ 84);
	
	var _AuthReducer = __webpack_require__(/*! ../../AuthReducer */ 32);
	
	var _LoginPage = {
	  "wrapper": "LoginPage__wrapper__2QFbR",
	  "loginwrapper": "LoginPage__loginwrapper__2AGWy",
	  "local": "LoginPage__local__2Gnkr",
	  "social": "LoginPage__social__thg1K",
	  "form": "LoginPage__form__1bd8g",
	  "separator": "LoginPage__separator__3eUv-"
	};
	
	var _LoginPage2 = _interopRequireDefault(_LoginPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref3 = _jsx(_reactHelmet2.default, {
	  title: 'Login'
	});
	
	var _ref4 = _jsx('header', {}, void 0, _jsx('h1', {}, void 0, 'login'));
	
	var _ref5 = _jsx('div', {}, void 0, 'or log in with');
	
	var _ref6 = _jsx(_SocialSignInButtons.GoogleButton, {});
	
	var _ref7 = _jsx(_SocialSignInButtons.TwitterButton, {
	  auth: _AuthActions.facebookLoginRequest
	});
	
	var LoginPage = function (_Component) {
	  _inherits(LoginPage, _Component);
	
	  function LoginPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, LoginPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleLogin = function (_ref2) {
	      var email = _ref2.email;
	      var password = _ref2.password;
	
	      _this.props.dispatch((0, _AuthActions.loginUserRequest)({ email: email, password: password }));
	    }, _this.handleFacebookLogin = function () {
	      _this.props.dispatch((0, _AuthActions.facebookLoginRequest)());
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(LoginPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _LoginPage2.default.wrapper
	      }, void 0, _jsx('div', {
	        className: _LoginPage2.default.loginwrapper
	      }, void 0, _jsx('section', {
	        className: _LoginPage2.default.local
	      }, void 0, _ref3, _ref4, _jsx('div', {
	        className: _LoginPage2.default.form
	      }, void 0, _jsx(_loginform2.default, {
	        login: this.handleLogin,
	        facebookLogin: this.handleFacebookLogin,
	        message: this.props.message
	      }))), _ref5, _jsx('section', {
	        className: _LoginPage2.default.social
	      }, void 0, _jsx(_SocialSignInButtons.FacebookButton, {
	        auth: this.handleFacebookLogin
	      }), _ref6, _ref7)));
	    }
	  }]);
	
	  return LoginPage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state, props) {
	  return {
	    message: (0, _AuthReducer.getMessage)(state)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoginPage);

/***/ },
/* 34 */
/*!****************************************************************!*\
  !*** ./client/modules/Auth/pages/NotFoundPage/NotFoundPage.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	exports.NotFoundPage = NotFoundPage;
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import Style
	//import styles from './LoginPage.css';
	
	
	var _ref = _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	  title: 'Page not found!'
	}), _jsx('form', {
	  action: '/auth/authenticate',
	  method: 'post'
	}, void 0, _jsx('h1', {}, void 0, '404 - Page Not Found'), _jsx('p', {}, void 0, 'Bruh, what u doin out here?')));
	
	function NotFoundPage(props) {
	  return _ref;
	}
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(NotFoundPage);

/***/ },
/* 35 */
/*!************************************************************!*\
  !*** ./client/modules/Auth/pages/SignupPage/SignupPage.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	exports.SignupPage = SignupPage;
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import Style
	//import styles from './LoginPage.css';
	
	
	var _ref = _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	  title: 'Login'
	}), _jsx('form', {
	  action: '/auth/signup',
	  method: 'post'
	}, void 0, _jsx('h3', {}, void 0, 'Signup'), _jsx('input', {
	  type: 'text',
	  name: 'email',
	  placeholder: 'email'
	}), _jsx('input', {
	  type: 'password',
	  name: 'password',
	  placeholder: 'password'
	}), _jsx('button', {
	  type: 'submit'
	}, void 0, 'Signup!')));
	
	function SignupPage(props) {
	  return _ref;
	}
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(SignupPage);

/***/ },
/* 36 */
/*!********************************************!*\
  !*** ./client/modules/Intl/IntlActions.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.switchLanguage = switchLanguage;
	
	var _setup = __webpack_require__(/*! ../../../Intl/setup */ 27);
	
	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
	
	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 37 */
/*!********************************************************************!*\
  !*** ./client/modules/Post/pages/PostDetailPage/PostDetailPage.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	exports.PostDetailPage = PostDetailPage;
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _PostListItem = {
	  "single-post": "PostListItem__single-post__2wFZU",
	  "post-title": "PostListItem__post-title__1BU3H",
	  "author-name": "PostListItem__author-name__2pYEG",
	  "post-desc": "PostListItem__post-desc__2hG8t",
	  "post-action": "PostListItem__post-action__37qYF",
	  "divider": "PostListItem__divider__3H_6O",
	  "post-detail": "PostListItem__post-detail__16xor"
	};
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	var _PostActions = __webpack_require__(/*! ../../PostActions */ 18);
	
	var _PostReducer = __webpack_require__(/*! ../../PostReducer */ 19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'by'
	});
	
	function PostDetailPage(props) {
	  return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	    title: props.post.title
	  }), _jsx('div', {
	    className: _PostListItem2.default['single-post'] + ' ' + _PostListItem2.default['post-detail']
	  }, void 0, _jsx('h3', {
	    className: _PostListItem2.default['post-title']
	  }, void 0, props.post.title), _jsx('p', {
	    className: _PostListItem2.default['author-name']
	  }, void 0, _ref, ' ', props.post.name), _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, props.post.content)));
	}
	
	// Actions required to provide data for this component to render in sever side.
	PostDetailPage.need = [function (params) {
	  return (0, _PostActions.fetchPost)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    post: (0, _PostReducer.getPost)(state, props.params.cuid)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostDetailPage);

/***/ },
/* 38 */
/*!****************************************************************!*\
  !*** ./client/modules/Post/pages/PostListPage/PostListPage.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _PostList = __webpack_require__(/*! ../../components/PostList */ 90);
	
	var _PostList2 = _interopRequireDefault(_PostList);
	
	var _PostCreateWidget = __webpack_require__(/*! ../../components/PostCreateWidget/PostCreateWidget */ 89);
	
	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);
	
	var _PostActions = __webpack_require__(/*! ../../PostActions */ 18);
	
	var _AppActions = __webpack_require__(/*! ../../../App/AppActions */ 13);
	
	var _AppReducer = __webpack_require__(/*! ../../../App/AppReducer */ 17);
	
	var _PostReducer = __webpack_require__(/*! ../../PostReducer */ 19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var PostListPage = function (_Component) {
	  _inherits(PostListPage, _Component);
	
	  function PostListPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, PostListPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostListPage.__proto__ || Object.getPrototypeOf(PostListPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleDeletePost = function (post) {
	      if (confirm('Do you want to delete this post')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _PostActions.deletePostRequest)(post));
	      }
	    }, _this.handleAddPost = function (name, title, content) {
	      _this.props.dispatch((0, _AppActions.toggleAddPost)());
	      _this.props.dispatch((0, _PostActions.addPostRequest)({ name: name, title: title, content: content }));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(PostListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _PostActions.fetchPosts)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_PostCreateWidget2.default, {
	        addPost: this.handleAddPost,
	        showAddPost: this.props.showAddPost
	      }), _jsx(_PostList2.default, {
	        handleDeletePost: this.handleDeletePost,
	        posts: this.props.posts
	      }));
	    }
	  }]);
	
	  return PostListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	PostListPage.need = [function () {
	  return (0, _PostActions.fetchPosts)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    showAddPost: (0, _AppReducer.getShowAddPost)(state),
	    posts: (0, _PostReducer.getPosts)(state)
	  };
	}
	
	PostListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostListPage);

/***/ },
/* 39 */
/*!*********************************************************************************!*\
  !*** ./client/modules/Recipe/components/RecipeQuickSearch/RecipeQuickSearch.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 12);
	
	var _RecipeQuickSearch = {
	  "search-form": "RecipeQuickSearch__search-form__WAV7a",
	  "select-category": "RecipeQuickSearch__select-category__25KOV",
	  "button-container": "RecipeQuickSearch__button-container__3AFJo",
	  "recipe-search-button": "RecipeQuickSearch__recipe-search-button__2hkCk",
	  "input-ingredient": "RecipeQuickSearch__input-ingredient__2tVCS"
	};
	
	var _RecipeQuickSearch2 = _interopRequireDefault(_RecipeQuickSearch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RecipeQuickSearch = function RecipeQuickSearch(props) {
	  return _jsx('form', {
	    onSubmit: props.handleSubmit(props.handleQuickSearch),
	    className: _RecipeQuickSearch2.default['search-form']
	  }, void 0, _jsx('div', {}, void 0, 'show me', _jsx(_reduxForm.Field, {
	    name: 'category',
	    component: 'select',
	    className: _RecipeQuickSearch2.default['select-category']
	  }, void 0, props.categories.map(function (category, i) {
	    return _jsx('option', {
	      value: category._id
	    }, i, category.plural);
	  }))), _jsx('div', {}, void 0, 'with', _jsx(_reduxForm.Field, {
	    name: 'ingredient1',
	    component: 'input',
	    type: 'text',
	    className: _RecipeQuickSearch2.default['input-ingredient1']
	  })), _jsx('div', {}, void 0, 'and', _jsx(_reduxForm.Field, {
	    name: 'ingredient2',
	    component: 'input',
	    type: 'text',
	    className: _RecipeQuickSearch2.default['input-ingredient2']
	  })), _jsx('div', {
	    className: _RecipeQuickSearch2.default['button-container']
	  }, void 0, _jsx('div', {
	    onClick: props.handleSubmit(props.handleQuickSearch),
	    className: _RecipeQuickSearch2.default['recipe-search-button']
	  }, void 0, 'go')));
	};
	
	RecipeQuickSearch = (0, _reduxForm.reduxForm)({
	  form: 'quickSearchForm',
	  initialValues: {
	    category: 'smoothie',
	    ingredient1: 'tomato',
	    ingredient2: 'banana'
	  }
	})(RecipeQuickSearch);
	
	exports.default = RecipeQuickSearch;

/***/ },
/* 40 */
/*!****************************************************************************!*\
  !*** ./client/modules/Recipe/pages/RecipeCreatedPage/RecipeCreatedPage.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _RecipeCreatedPage = {
	  "wrapper": "RecipeCreatedPage__wrapper___02vu"
	};
	
	var _RecipeCreatedPage2 = _interopRequireDefault(_RecipeCreatedPage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx('h1', {}, void 0, 'recipe added successfully');
	
	var _ref2 = _jsx('p', {}, void 0, 'thank you for your contribution');
	
	var _ref3 = _jsx('p', {}, void 0, 'you can manage your recipes on your profile page');
	
	var _ref4 = _jsx(_reactRouter.Link, {
	  to: '/create'
	}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add'), ' add another one');
	
	var RecipeCreatedPage = function (_Component) {
	  _inherits(RecipeCreatedPage, _Component);
	
	  function RecipeCreatedPage() {
	    _classCallCheck(this, RecipeCreatedPage);
	
	    return _possibleConstructorReturn(this, (RecipeCreatedPage.__proto__ || Object.getPrototypeOf(RecipeCreatedPage)).apply(this, arguments));
	  }
	
	  _createClass(RecipeCreatedPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeCreatedPage2.default.wrapper
	      }, void 0, _ref, _ref2, _ref3, _ref4);
	    }
	  }]);
	
	  return RecipeCreatedPage;
	}(_react.Component);
	
	exports.default = RecipeCreatedPage;

/***/ },
/* 41 */
/*!******************************************************************************!*\
  !*** ./client/modules/Recipe/pages/RecipeCreationPage/RecipeCreationPage.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipeCreationPage = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _RecipeActions = __webpack_require__(/*! ../../RecipeActions */ 16);
	
	var _apiCaller = __webpack_require__(/*! ../../../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _RecipeCreateForm = __webpack_require__(/*! ../../components/RecipeCreateForm/RecipeCreateForm */ 92);
	
	var _RecipeCreateForm2 = _interopRequireDefault(_RecipeCreateForm);
	
	var _RecipeCreationPage = {
	  "create": "RecipeCreationPage__create__1SvJ5"
	};
	
	var _RecipeCreationPage2 = _interopRequireDefault(_RecipeCreationPage);
	
	var _CategoryActions = __webpack_require__(/*! ../../../Category/CategoryActions */ 14);
	
	var _CategoryReducer = __webpack_require__(/*! ../../../Category/CategoryReducer */ 15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var _ref2 = _jsx('h1', {}, void 0, 'add recipe');
	
	var RecipeCreationPage = exports.RecipeCreationPage = function (_Component) {
	  _inherits(RecipeCreationPage, _Component);
	
	  function RecipeCreationPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, RecipeCreationPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeCreationPage.__proto__ || Object.getPrototypeOf(RecipeCreationPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleCreate = function (fields) {
	      _this.props.dispatch((0, _RecipeActions.addRecipeRequest)(fields));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(RecipeCreationPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _CategoryActions.fetchCategories)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeCreationPage2.default.create
	      }, void 0, _ref2, _jsx(_RecipeCreateForm2.default, {
	        handleCreate: this.handleCreate,
	        categories: this.props.categories
	      }));
	    }
	  }]);
	
	  return RecipeCreationPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RecipeCreationPage.need = [function () {
	  return (0, _CategoryActions.fetchCategories)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    categories: (0, _CategoryReducer.getCategories)(state)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeCreationPage);

/***/ },
/* 42 */
/*!**************************************************************************!*\
  !*** ./client/modules/Recipe/pages/RecipeDetailPage/RecipeDetailPage.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _RecipeDetailPage = {
	  "single-recipe": "RecipeDetailPage__single-recipe__9M1Qv",
	  "categories": "RecipeDetailPage__categories__11tDK",
	  "image-wrapper": "RecipeDetailPage__image-wrapper__XTHV1"
	};
	
	var _RecipeDetailPage2 = _interopRequireDefault(_RecipeDetailPage);
	
	var _RecipeActions = __webpack_require__(/*! ../../RecipeActions */ 16);
	
	var _RecipeReducer = __webpack_require__(/*! ../../RecipeReducer */ 20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var _ref = _jsx('h3', {}, void 0, 'Ingredients');
	
	var _ref2 = _jsx('h3', {}, void 0, 'Instructions');
	
	var RecipeDetailsPage = function (_Component) {
	  _inherits(RecipeDetailsPage, _Component);
	
	  function RecipeDetailsPage() {
	    _classCallCheck(this, RecipeDetailsPage);
	
	    return _possibleConstructorReturn(this, (RecipeDetailsPage.__proto__ || Object.getPrototypeOf(RecipeDetailsPage)).apply(this, arguments));
	  }
	
	  _createClass(RecipeDetailsPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeDetailPage2.default['single-recipe']
	      }, void 0, this.props.recipe.imageUrl ? _jsx('div', {
	        className: _RecipeDetailPage2.default['image-wrapper']
	      }, void 0, _jsx('img', {
	        src: this.props.recipe.imageUrl
	      })) : null, _jsx('h1', {}, void 0, this.props.recipe.title), _jsx('div', {
	        className: _RecipeDetailPage2.default['categories']
	      }, void 0, this.props.recipe.categories.map(function (cat, i) {
	        return _jsx('span', {}, i, cat.title);
	      })), _jsx('p', {}, void 0, this.props.recipe.description), _jsx('div', {}, void 0, _ref, _jsx('table', {}, void 0, _jsx('tbody', {}, void 0, this.props.recipe.ingredients.map(function (ing, i) {
	        return _jsx('tr', {}, i, _jsx('td', {}, void 0, ing.ingredient), _jsx('td', {}, void 0, ing.amount));
	      })))), _ref2, _jsx('p', {}, void 0, this.props.recipe.instructions));
	    }
	  }]);
	
	  return RecipeDetailsPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RecipeDetailsPage.need = [function (_ref3) {
	  var params = _ref3.params;
	
	  return (0, _RecipeActions.fetchRecipe)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    recipe: (0, _RecipeReducer.getRecipe)(state, props.params.cuid)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeDetailsPage);

/***/ },
/* 43 */
/*!**********************************************************************!*\
  !*** ./client/modules/Recipe/pages/RecipeListPage/RecipeListPage.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _RecipeList = __webpack_require__(/*! ../../components/RecipeList */ 93);
	
	var _RecipeList2 = _interopRequireDefault(_RecipeList);
	
	var _RecipeActions = __webpack_require__(/*! ../../RecipeActions */ 16);
	
	var _AppActions = __webpack_require__(/*! ../../../App/AppActions */ 13);
	
	var _AppReducer = __webpack_require__(/*! ../../../App/AppReducer */ 17);
	
	var _RecipeReducer = __webpack_require__(/*! ../../RecipeReducer */ 20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var RecipeListPage = function (_Component) {
	  _inherits(RecipeListPage, _Component);
	
	  function RecipeListPage() {
	    _classCallCheck(this, RecipeListPage);
	
	    return _possibleConstructorReturn(this, (RecipeListPage.__proto__ || Object.getPrototypeOf(RecipeListPage)).apply(this, arguments));
	  }
	
	  _createClass(RecipeListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _RecipeActions.searchRecipes)(this.props.location.query));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_RecipeList2.default, {
	        recipes: this.props.recipes
	      }));
	    }
	  }]);
	
	  return RecipeListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RecipeListPage.need = [function (_ref) {
	  var query = _ref.query;
	
	  return (0, _RecipeActions.searchRecipes)(query);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    showAddRecipe: (0, _AppReducer.getShowAddRecipe)(state),
	    recipes: (0, _RecipeReducer.getRecipes)(state)
	  };
	}
	
	RecipeListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeListPage);

/***/ },
/* 44 */
/*!********************************************!*\
  !*** ./client/modules/User/UserActions.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_USER = undefined;
	exports.addUser = addUser;
	exports.fetchUser = fetchUser;
	
	var _apiCaller = __webpack_require__(/*! ../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_USER = exports.ADD_USER = 'ADD_USER';
	
	// Export Actions
	function addUser(user) {
	  return {
	    type: ADD_USER,
	    user: user
	  };
	}
	
	function fetchUser(id) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('users/' + id).then(function (res) {
	      return dispatch(addUser(res.user));
	    });
	  };
	}

/***/ },
/* 45 */
/*!********************************************!*\
  !*** ./client/modules/User/UserReducer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getUser = undefined;
	
	var _UserActions = __webpack_require__(/*! ./UserActions */ 44);
	
	// Initial State
	var initialState = {}; // Import Actions
	
	
	var UserReducer = function UserReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _UserActions.ADD_USER:
	      return action.user;
	
	    default:
	      return state;
	  }
	};
	
	var getUser = exports.getUser = function getUser(state) {
	  return state.user;
	};
	
	exports.default = UserReducer;

/***/ },
/* 46 */
/*!***********************************************!*\
  !*** ./client/modules/User/pages/UserPage.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserPage = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _apiCaller = __webpack_require__(/*! ../../../util/apiCaller */ 7);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _UserRecipes = __webpack_require__(/*! ../components/UserRecipes */ 97);
	
	var _UserRecipes2 = _interopRequireDefault(_UserRecipes);
	
	var _UserActions = __webpack_require__(/*! ../UserActions */ 44);
	
	var _UserReducer = __webpack_require__(/*! ../UserReducer */ 45);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var UserPage = exports.UserPage = function (_Component) {
	  _inherits(UserPage, _Component);
	
	  function UserPage() {
	    _classCallCheck(this, UserPage);
	
	    return _possibleConstructorReturn(this, (UserPage.__proto__ || Object.getPrototypeOf(UserPage)).apply(this, arguments));
	  }
	
	  _createClass(UserPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _UserActions.fetchUser)(this.props.params.id));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx(_UserRecipes2.default, {
	        user: this.props.user
	      }));
	    }
	  }]);
	
	  return UserPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	UserPage.need = [function (_ref) {
	  var params = _ref.params;
	  return (0, _UserActions.fetchUser)(params.id);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    user: (0, _UserReducer.getUser)(state)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserPage);

/***/ },
/* 47 */
/*!*************************************!*\
  !*** ./server/models/ingredient.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var ingredientSchema = new Schema({
	  _id: { type: String, required: true },
	  singular: { type: 'String', required: true },
	  plural: { type: 'String', required: true }
	});
	
	exports.default = _mongoose2.default.model('Ingredient', ingredientSchema);

/***/ },
/* 48 */
/*!*******************************!*\
  !*** ./server/models/post.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var postSchema = new Schema({
	  name: { type: 'String', required: true },
	  title: { type: 'String', required: true },
	  content: { type: 'String', required: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Post', postSchema);

/***/ },
/* 49 */
/*!***************************************!*\
  !*** ./server/models/recipe-neo4j.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAll = getAll;
	function getAll(session) {
	  return session.run('MATCH (recipe:Recipe) RETURN recipe');
	}

/***/ },
/* 50 */
/*!*********************************!*\
  !*** ./server/models/recipe.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var recipeSchema = new Schema({
	  title: { type: 'String', required: true },
	  description: { type: 'String', required: true },
	  instructions: { type: 'String', required: true },
	  imageUrl: { type: 'String' },
	  cuid: { type: 'String', required: true },
	  slug: { type: 'String', required: true },
	  ingredients: [{
	    ingredient: { type: 'String' },
	    amount: { type: 'String' }
	  }],
	  categories: [{ type: 'String', ref: 'Category' }],
	  likes: { type: 'Number', required: false, default: 0 },
	  author: { type: Schema.Types.ObjectId, ref: 'User' },
	  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Recipe', recipeSchema);

/***/ },
/* 51 */
/*!*******************************!*\
  !*** ./server/models/user.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bcryptNodejs = __webpack_require__(/*! bcrypt-nodejs */ 111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var userSchema = new Schema({
	  email: {
	    type: String,
	    lowercase: true,
	    unique: true
	  },
	  password: {
	    type: String,
	    select: false
	  },
	  username: {
	    type: String
	  },
	  facebook: {
	    id: { type: String },
	    token: { type: String },
	    email: { type: String },
	    name: { type: String }
	  }
	}, { toJSON: { virtuals: true } });
	
	userSchema.virtual('recipes', {
	  ref: 'Recipe',
	  localField: '_id',
	  foreignField: 'author'
	});
	
	// Pre-save of user to database, hash password if password is modified or new
	userSchema.pre('save', function (next) {
	  var user = this,
	      SALT_FACTOR = 5;
	
	  if (!user.isModified('password')) return next();
	
	  (0, _bcryptNodejs.genSalt)(SALT_FACTOR, function (err, salt) {
	    if (err) return next(err);
	
	    (0, _bcryptNodejs.hash)(user.password, salt, null, function (err, hash) {
	      if (err) return next(err);
	      user.password = hash;
	      next();
	    });
	  });
	});
	
	// generating a hash
	userSchema.methods.generateHash = function (password, next) {
	  return (0, _bcryptNodejs.hash)(password, genSaltSync(8), null, next);
	};
	
	// checking if password is valid
	userSchema.methods.validPassword = function (password, next) {
	
	  (0, _bcryptNodejs.compare)(password, this.password, next);
	};
	
	exports.default = _mongoose2.default.model('User', userSchema);

/***/ },
/* 52 */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 53 */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 54 */
/*!********************************!*\
  !*** external "sanitize-html" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 55 */
/*!********************************************!*\
  !*** ./client/modules/Intl/IntlWrapper.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function IntlWrapper(props) {
	  return _react2.default.createElement(
	    _reactIntl.IntlProvider,
	    props.intl,
	    props.children
	  );
	}
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 56 */
/*!**************************!*\
  !*** ./client/routes.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _App = __webpack_require__(/*! ./modules/App/App */ 80);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	  require.ensure = function requireModule(deps, callback) {
	    callback(require);
	  };
	}
	
	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  // Require async routes only in development for react-hot-reloader to work.
	  __webpack_require__(/*! ./modules/Post/pages/PostListPage/PostListPage */ 38);
	  __webpack_require__(/*! ./modules/Post/pages/PostDetailPage/PostDetailPage */ 37);
	  __webpack_require__(/*! ./modules/Recipe/pages/RecipeListPage/RecipeListPage */ 43);
	  __webpack_require__(/*! ./modules/Recipe/pages/RecipeSearchPage/RecipeSearchPage */ 96);
	  __webpack_require__(/*! ./modules/App/pages/StartPage/StartPage */ 30);
	  __webpack_require__(/*! ./modules/Recipe/pages/RecipeCreationPage/RecipeCreationPage */ 41);
	  __webpack_require__(/*! ./modules/Recipe/pages/RecipeCreatedPage/RecipeCreatedPage */ 40);
	  __webpack_require__(/*! ./modules/Recipe/pages/RecipeDetailPage/RecipeDetailPage */ 42);
	  __webpack_require__(/*! ./modules/User/pages/UserPage */ 46);
	  __webpack_require__(/*! ./modules/Auth/pages/LoginPage/LoginPage */ 33);
	  __webpack_require__(/*! ./modules/Auth/pages/SignupPage/SignupPage */ 35);
	  __webpack_require__(/*! ./modules/Auth/pages/NotFoundPage/NotFoundPage */ 34);
	}
	
	var requireAuth = function requireAuth(nextState, replace, auth) {
	  if (!auth) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    });
	  }
	};
	
	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	
	exports.default = function (auth) {
	  return _jsx(_reactRouter.Route, {
	    path: '/',
	    component: _App2.default
	  }, void 0, _jsx(_reactRouter.IndexRoute, {
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/App/pages/StartPage/StartPage */ 30).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/posts/:slug-:cuid',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Post/pages/PostDetailPage/PostDetailPage */ 37).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/posts',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Post/pages/PostListPage/PostListPage */ 38).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/search',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Recipe/pages/RecipeListPage/RecipeListPage */ 43).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/recipes/:slug-:cuid',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Recipe/pages/RecipeDetailPage/RecipeDetailPage */ 42).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/create',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Recipe/pages/RecipeCreationPage/RecipeCreationPage */ 41).default);
	      }).bind(null, __webpack_require__));
	    },
	    onEnter: function onEnter(nextState, replace) {
	      return requireAuth(nextState, replace, auth);
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/created',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Recipe/pages/RecipeCreatedPage/RecipeCreatedPage */ 40).default);
	      }).bind(null, __webpack_require__));
	    },
	    onEnter: function onEnter(nextState, replace) {
	      return requireAuth(nextState, replace, auth);
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/login',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Auth/pages/LoginPage/LoginPage */ 33).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/signup',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Auth/pages/SignupPage/SignupPage */ 35).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/user/:id',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/User/pages/UserPage */ 46).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '*',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(/*! ./modules/Auth/pages/NotFoundPage/NotFoundPage */ 34).default);
	      }).bind(null, __webpack_require__));
	    }
	  }));
	};

/***/ },
/* 57 */
/*!*************************!*\
  !*** ./client/store.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 53);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 131);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _DevTools = __webpack_require__(/*! ./modules/App/components/DevTools */ 29);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _reducers = __webpack_require__(/*! ./reducers */ 21);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main store function
	 */
	function configureStore() {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  // Middleware and store enhancers
	  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];
	
	  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	    // Enable DevTools only when rendering on client and during development.
	    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	  }
	
	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));
	
	  // For hot reloading reducers
	  if (true) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept(/*! ./reducers */ 21, function () {
	      var nextReducer = __webpack_require__(/*! ./reducers */ 21).default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }
	
	  return store;
	}

/***/ },
/* 58 */
/*!*******************************!*\
  !*** ./server/config/auth.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.profiles = undefined;
	exports.getFacebookStrategy = getFacebookStrategy;
	exports.getFacebookStrategyOld = getFacebookStrategyOld;
	
	var _passportFacebook = __webpack_require__(/*! passport-facebook */ 119);
	
	var _user = __webpack_require__(/*! ../models/user */ 51);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ 11);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(/*! ../config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _dbUtils = __webpack_require__(/*! ../util/dbUtils */ 23);
	
	var _cuid = __webpack_require__(/*! cuid */ 10);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var profiles = exports.profiles = {
	  'facebookAuth': {
	    'clientID': '1005914192867598', // your App ID
	    'clientSecret': 'a308aec901f2a0317b261e62844a8083', // your App Secret
	    'callbackURL': 'http://localhost:8000/api/auth/facebook/callback'
	  }
	};
	
	var signToken = function signToken(user, secret) {
	  return _jsonwebtoken2.default.sign(user, _config2.default.secret, { expiresIn: '24h' });
	};
	
	function getFacebookStrategy() {
	  return new _passportFacebook.Strategy(profiles.facebookAuth, function (accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	
	      (0, _dbUtils.getSession)({}).run('\n        MERGE (u:User {facebookId: "' + profile.id + '"})\n        ON CREATE SET u.cuid = "' + (0, _cuid2.default)() + '"        \n        ON CREATE SET u.facebookName = "' + profile.displayName + '"\n        ON CREATE SET u.facebookToken = "' + accessToken + '"\n        ON CREATE SET u.username = "' + profile.displayName + '"\n        RETURN u\n      ').then(function (response) {
	        var user = response.records[0].get('u').properties;
	        var token = signToken(user, _config2.default.secret);
	        return done(null, { user: user, token: token });
	      });
	    });
	  });
	}
	
	function getFacebookStrategyOld() {
	  return new _passportFacebook.Strategy(profiles.facebookAuth, function (accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	      _user2.default.findOne({ 'facebook.id': profile.id }, function (err, user) {
	
	        if (user) {
	          var token = signToken(user, _config2.default.secret);
	          return done(null, { user: user, token: token });
	        }
	
	        var newUser = new _user2.default();
	        newUser.facebook.id = profile.id;
	        newUser.facebook.token = accessToken;
	        newUser.facebook.name = profile.displayName;
	
	        newUser.save(function (err, saved) {
	          console.log(saved);
	          if (err) {
	            throw err;
	          }
	          var token = signToken(saved, _config2.default.secret);
	          return done(null, { user: saved, token: token });
	        });
	      });
	    });
	  });
	}

/***/ },
/* 59 */
/*!*****************************!*\
  !*** ./server/dummyData.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	
	  _recipe2.default.count().exec(function (err, count) {
	    if (count > 0) {
	      return;
	    }
	    var tacos = new _recipe2.default({
	      title: 'Tacos!',
	      description: 'Tasty raw vegan tacos made from raw stuff!',
	      likes: 0,
	      ingredients: ["57e2c93487fa172c985d82c2"],
	      cuid: 'cikqgkv4q01ck7453ualdn3hf',
	      slug: 'tacos'
	    });
	    var pizza = new _recipe2.default({
	      title: 'Pizza!',
	      description: 'Tasty raw vegan pizza made from raw stuff!',
	      cuid: 'cikqgkv4q01ck7453ualdn3hd',
	      slug: 'pizza'
	    });
	
	    _recipe2.default.create([tacos, pizza], function (error) {
	      if (!error) {
	        console.log('ready to go....');
	      }
	    });
	  });
	};
	
	var _post = __webpack_require__(/*! ./models/post */ 48);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _recipe = __webpack_require__(/*! ./models/recipe */ 50);
	
	var _recipe2 = _interopRequireDefault(_recipe);
	
	var _ingredient = __webpack_require__(/*! ./models/ingredient */ 47);
	
	var _ingredient2 = _interopRequireDefault(_ingredient);
	
	var _category = __webpack_require__(/*! ./models/category */ 22);
	
	var _category2 = _interopRequireDefault(_category);
	
	var _comment = __webpack_require__(/*! ./models/comment */ 107);
	
	var _comment2 = _interopRequireDefault(_comment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 60 */
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _auth = __webpack_require__(/*! ../controllers/auth.controller */ 101);
	
	var AuthController = _interopRequireWildcard(_auth);
	
	var _passport = __webpack_require__(/*! passport */ 25);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	router.route('/auth/facebook').get(_passport2.default.authenticate('facebook', { display: 'popup' }));
	
	router.route('/auth/facebook/callback').get(_passport2.default.authenticate('facebook', { session: false, failureRedirect: '/login' }), function (req, res) {
	  var token = req.user.token;
	  return res.redirect('/auth/facebook/callback?token=' + token);
	});
	
	router.route('/auth/unwraptoken').get(AuthController.unwrapToken);
	
	exports.default = router;

/***/ },
/* 61 */
/*!******************************************!*\
  !*** ./server/routes/category.routes.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _category = __webpack_require__(/*! ../controllers/category.controller */ 102);
	
	var CategoryController = _interopRequireWildcard(_category);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/categories').get(CategoryController.getCategories);
	
	// Search posts by title
	router.route('/categories/:title').get(CategoryController.getCategoriesByTitle);
	
	exports.default = router;

/***/ },
/* 62 */
/*!********************************************!*\
  !*** ./server/routes/ingredient.routes.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _ingredient = __webpack_require__(/*! ../controllers/ingredient.controller */ 103);
	
	var IngredientController = _interopRequireWildcard(_ingredient);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/ingredients').get(IngredientController.getIngredients);
	
	// Search posts by title
	router.route('/ingredients/:title').get(IngredientController.getIngredientsByTitle);
	
	exports.default = router;

/***/ },
/* 63 */
/*!**************************************!*\
  !*** ./server/routes/post.routes.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _post = __webpack_require__(/*! ../controllers/post.controller */ 104);
	
	var PostController = _interopRequireWildcard(_post);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/posts').get(PostController.getPosts);
	
	// Get one post by cuid
	router.route('/posts/:cuid').get(PostController.getPost);
	
	// Add a new Post
	router.route('/posts').post(PostController.addPost);
	
	// Delete a post by cuid
	router.route('/posts/:cuid').delete(PostController.deletePost);
	
	exports.default = router;

/***/ },
/* 64 */
/*!****************************************!*\
  !*** ./server/routes/recipe.routes.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _recipe = __webpack_require__(/*! ../controllers/recipe.controller */ 105);
	
	var RecipeController = _interopRequireWildcard(_recipe);
	
	var _authMiddleware = __webpack_require__(/*! ../util/authMiddleware */ 109);
	
	var _dbUtils = __webpack_require__(/*! ../util/dbUtils */ 23);
	
	var _recipeNeo4j = __webpack_require__(/*! ../models/recipe-neo4j */ 49);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	//router.route('/recipes').get(RecipeController.getRecipes);
	router.route('/recipes').get(function (req, res, next) {
	  console.log('test');
	  (0, _recipeNeo4j.getAll)((0, _dbUtils.getSession)(req)).then(function (result) {
	    return res.json(result.records[0].get('name'));
	  }).catch(next);
	});
	
	// Search posts by title
	router.route('/recipes/search/:title').get(RecipeController.getRecipesByTitle);
	
	router.route('/recipes/search/').get(RecipeController.searchRecipes);
	
	// Get one post by cuid
	router.route('/recipes/:cuid').get(RecipeController.getRecipe);
	
	// Search posts by title
	router.route('/recipes').post(_authMiddleware.isAuthenticated, RecipeController.addRecipe);
	
	exports.default = router;

/***/ },
/* 65 */
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _user = __webpack_require__(/*! ../controllers/user.controller */ 106);
	
	var UserController = _interopRequireWildcard(_user);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	router.route('/users/authenticate').post(UserController.validateUser);
	
	router.route('/users/signup').post(UserController.signupUser);
	
	router.route('/users/:id').get(UserController.getUser);
	
	exports.default = router;

/***/ },
/* 66 */
/*!**********************************!*\
  !*** ./server/util/authUtils.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getInitialState = getInitialState;
	exports.isAuthenticated = isAuthenticated;
	
	var _cookies = __webpack_require__(/*! cookies */ 24);
	
	var _cookies2 = _interopRequireDefault(_cookies);
	
	var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ 11);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(/*! ../config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getInitialState(req, res) {
	  var token = new _cookies2.default(req, res).get('token');
	  var user = void 0;
	  try {
	    user = _jsonwebtoken2.default.verify(token, _config2.default.secret);
	  } catch (err) {}
	
	  return user && token ? { auth: { token: token, user: user } } : {};
	}
	
	function isAuthenticated(req, res) {
	  var token = new _cookies2.default(req, res).get('token');
	  var user = void 0;
	  try {
	    user = _jsonwebtoken2.default.verify(token, _config2.default.secret);
	  } catch (err) {}
	
	  return !!user;
	}

/***/ },
/* 67 */
/*!**********************************!*\
  !*** ./server/util/fetchData.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;
	
	var _promiseUtils = __webpack_require__(/*! ./promiseUtils */ 110);
	
	function fetchComponentData(store, components, params, query) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);
	
	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need({ params: params, state: store.getState(), query: query }));
	  });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 68 */
/*!****************************************!*\
  !*** ./server/util/googleAnalytics.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var trackingId = 'UA-83600285-2';
	
	var snippet = exports.snippet = '\n<script>\n  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\n  ga(\'create\', \'' + trackingId + '\', \'auto\');\n  ga(\'send\', \'pageview\');\n</script>';

/***/ },
/* 69 */
/*!*******************************!*\
  !*** ./webpack.config.dev.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(/*! webpack */ 26);
	var cssnext = __webpack_require__(/*! postcss-cssnext */ 120);
	var postcssFocus = __webpack_require__(/*! postcss-focus */ 121);
	var postcssReporter = __webpack_require__(/*! postcss-reporter */ 122);
	var vars = __webpack_require__(/*! postcss-simple-vars */ 123);
	var colors = __webpack_require__(/*! ./client/config/colors */ 79);
	
	module.exports = {
	  //devtool: 'cheap-module-eval-source-map',
	
	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },
	
	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://localhost:8000/'
	  },
	
	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },
	
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }]
	  },
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  }), new webpack.SourceMapDevToolPlugin({
	    filename: '[file].map'
	  })],
	
	  postcss: function postcss() {
	    return [vars({ variables: colors }), postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 70 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 71 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 72 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 73 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 74 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 75 */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 76 */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 77 */
/*!*************************************!*\
  !*** ./Intl/localizationData/en.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    siteTitle: 'Rawlib',
	    addPost: 'Add Post',
	    switchLanguage: 'Switch Language',
	    twitterMessage: 'We are on Twitter',
	    by: 'By',
	    deletePost: 'Delete Post',
	    createNewPost: 'Create new post',
	    authorName: 'Author\'s Name',
	    postTitle: 'Post Title',
	    postContent: 'Post Content',
	    submit: 'Submit',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
	    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}'
	  }
	};

/***/ },
/* 78 */
/*!*************************************!*\
  !*** ./Intl/localizationData/fr.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fr',
	  messages: {
	    siteTitle: 'MERN blog de démarrage',
	    addPost: 'Ajouter Poster',
	    switchLanguage: 'Changer de langue',
	    twitterMessage: 'Nous sommes sur Twitter',
	    by: 'Par',
	    deletePost: 'Supprimer le message',
	    createNewPost: 'Créer un nouveau message',
	    authorName: 'Nom de l\'auteur',
	    postTitle: 'Titre de l\'article',
	    postContent: 'Contenu après',
	    submit: 'Soumettre',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)'
	  }
	};

/***/ },
/* 79 */
/*!*********************************!*\
  !*** ./client/config/colors.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	module.exports = {
	    ebonyclay: '#22313F',
	    red: '#F16767',
	    turquoise: '#15C2D2',
	    green: '#26C281',
	    orange: '#FF7043',
	    pink: '#ee5f77'
	};

/***/ },
/* 80 */
/*!***********************************!*\
  !*** ./client/modules/App/App.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _App = {
	  "container": "App__container__15uqt"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _DevTools = __webpack_require__(/*! ./components/DevTools */ 29);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _Toolbar = __webpack_require__(/*! ./components/Toolbar/Toolbar */ 83);
	
	var _Toolbar2 = _interopRequireDefault(_Toolbar);
	
	var _Footer = __webpack_require__(/*! ./components/Footer/Footer */ 81);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _AppActions = __webpack_require__(/*! ./AppActions */ 13);
	
	var _IntlActions = __webpack_require__(/*! ../../modules/Intl/IntlActions */ 36);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Components
	
	
	// Import Actions
	
	
	var _ref = _jsx(_DevTools2.default, {});
	
	var _ref2 = _jsx(_Footer2.default, {});
	
	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App(props, context) {
	    _classCallCheck(this, App);
	
	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	    _this.toggleAddPostSection = function () {
	      _this.props.dispatch((0, _AppActions.toggleAddPost)());
	    };
	
	    _this.state = { isMounted: false };
	    _this.context = context;
	    return _this;
	  }
	
	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true }); // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && _ref, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: 'salash',
	        titleTemplate: '%s - raw recipes',
	        meta: [{ charset: 'utf-8' }, {
	          'http-equiv': 'X-UA-Compatible',
	          content: 'IE=edge'
	        }, {
	          name: 'viewport',
	          content: 'width=device-width, initial-scale=1'
	        }]
	      }), !this.context.router.isActive('/', true) ? _jsx(_Toolbar2.default, {
	        user: this.props.user
	      }) : null, _jsx('div', {
	        className: _App2.default.container
	      }, void 0, this.props.children), _ref2));
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	App.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl,
	    user: store.auth.user
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 81 */
/*!********************************************************!*\
  !*** ./client/modules/App/components/Footer/Footer.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	exports.Footer = Footer;
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _Footer = {
	  "footer": "Footer__footer__1oiRV"
	};
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('p', {}, void 0, 'Made with ', _jsx('span', {}, void 0, '♥'), ' by Daniel Bornstrand');
	
	function Footer() {
	  return _jsx('div', {
	    className: _Footer2.default.footer
	  }, void 0, _ref);
	}
	
	exports.default = Footer;

/***/ },
/* 82 */
/*!****************************************************!*\
  !*** ./client/modules/App/components/Menu/Menu.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _Menu = {
	  "menu": "Menu__menu__xofNt"
	};
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref2 = _jsx(_reactRouter.Link, {}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'search'), _jsx('div', {}, void 0, 'advanced'));
	
	var _ref3 = _jsx(_reactRouter.Link, {
	  to: '/create'
	}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add'), _jsx('div', {}, void 0, 'contribute'));
	
	var _ref4 = _jsx(_reactRouter.Link, {}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'info_outline'), _jsx('div', {}, void 0, 'about'));
	
	var _ref5 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'face');
	
	var Menu = function Menu(_ref) {
	  var user = _ref.user;
	  return _jsx('div', {
	    className: _Menu2.default.menu
	  }, void 0, _ref2, _ref3, _ref4, user && user.facebookId ? _jsx(_reactRouter.Link, {
	    to: '/user/' + user._id
	  }, void 0, ' ', _ref5, ' ', _jsx('div', {}, void 0, user.facebookName.split(' ')[0]), ' ') : null);
	};
	
	exports.default = Menu;

/***/ },
/* 83 */
/*!**********************************************************!*\
  !*** ./client/modules/App/components/Toolbar/Toolbar.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _Toolbar = {
	  "toolbar": "Toolbar__toolbar__2Ghil",
	  "logo": "Toolbar__logo__l4pi1"
	};
	
	var _Toolbar2 = _interopRequireDefault(_Toolbar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref2 = _jsx('h1', {}, void 0, 'salash');
	
	var _ref3 = _jsx(_reactRouter.Link, {}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'search'), _jsx('div', {}, void 0, 'advanced'));
	
	var _ref4 = _jsx(_reactRouter.Link, {
	  to: '/create'
	}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add'), _jsx('div', {}, void 0, 'contribute'));
	
	var _ref5 = _jsx(_reactRouter.Link, {}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'info_outline'), _jsx('div', {}, void 0, 'about'));
	
	var _ref6 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'face');
	
	var Toolbar = function Toolbar(_ref) {
	  var user = _ref.user;
	  return _jsx('div', {
	    className: _Toolbar2.default.toolbar
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/',
	    className: _Toolbar2.default.logo
	  }, void 0, _ref2), _ref3, _ref4, _ref5, user && user.facebookId ? _jsx(_reactRouter.Link, {
	    to: '/user/' + user._id
	  }, void 0, ' ', _ref6, ' ', _jsx('div', {}, void 0, user.facebookName.split(' ')[0].toLowerCase()), ' ') : null);
	};
	
	exports.default = Toolbar;

/***/ },
/* 84 */
/*!***********************************************************************************!*\
  !*** ./client/modules/Auth/components/SocialSignInButtons/SocialSignInButtons.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TwitterButton = exports.GoogleButton = exports.FacebookButton = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SocialSignInButtons = {
	  "facebook": "SocialSignInButtons__facebook__3xyx1",
	  "google": "SocialSignInButtons__google__3HLuK",
	  "twitter": "SocialSignInButtons__twitter__30GgM",
	  "social-sign-in": "SocialSignInButtons__social-sign-in__1njK0"
	};
	
	var _SocialSignInButtons2 = _interopRequireDefault(_SocialSignInButtons);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref2 = _jsx('i', {
	  className: 'fa fa-facebook'
	});
	
	var _ref3 = _jsx('span', {}, void 0, 'facebook');
	
	var FacebookButton = exports.FacebookButton = function FacebookButton(_ref) {
	  var auth = _ref.auth;
	  return _jsx('a', {
	    onClick: auth,
	    className: _SocialSignInButtons2.default['social-sign-in'] + ' ' + _SocialSignInButtons2.default.facebook
	  }, void 0, _ref2, _ref3);
	};
	
	var _ref5 = _jsx('i', {
	  className: 'fa fa-google-plus'
	});
	
	var _ref6 = _jsx('span', {}, void 0, 'google+');
	
	var GoogleButton = exports.GoogleButton = function GoogleButton(_ref4) {
	  var auth = _ref4.auth;
	  return _jsx('a', {
	    onClick: function onClick() {
	      auth();
	    },
	    className: _SocialSignInButtons2.default['social-sign-in'] + ' ' + _SocialSignInButtons2.default.google
	  }, void 0, _ref5, _ref6);
	};
	
	var _ref8 = _jsx('i', {
	  className: 'fa fa-twitter'
	});
	
	var _ref9 = _jsx('span', {}, void 0, 'twitter');
	
	var TwitterButton = exports.TwitterButton = function TwitterButton(_ref7) {
	  var auth = _ref7.auth;
	  return _jsx('a', {
	    onClick: function onClick() {
	      auth();
	    },
	    className: _SocialSignInButtons2.default['social-sign-in'] + ' ' + _SocialSignInButtons2.default.twitter
	  }, void 0, _ref8, _ref9);
	};

/***/ },
/* 85 */
/*!***************************************************************!*\
  !*** ./client/modules/Auth/components/loginform/loginform.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 12);
	
	var _formInputs = __webpack_require__(/*! ../../../../components/form/formInputs */ 28);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _loginform = {
	  "login-form": "loginform__login-form__3ZfEI",
	  "login-error": "loginform__login-error__21l5Y",
	  "subactions": "loginform__subactions__2RtaN",
	  "signup": "loginform__signup__3aLgs",
	  "forgot": "loginform__forgot__2Pisj"
	};
	
	var _loginform2 = _interopRequireDefault(_loginform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validate = function validate(values) {
	  var errors = {};
	  if (!values.email) {
	    errors.email = 'Required!';
	  }
	  if (!values.password) {
	    errors.password = 'Required!';
	  }
	  return errors;
	};
	
	var formStyle = { width: '300px;' };
	
	var _ref2 = _jsx(_reduxForm.Field, {
	  name: 'email',
	  icon: 'fa-envelope',
	  component: _formInputs.renderInput,
	  type: 'text',
	  label: 'Email'
	});
	
	var _ref3 = _jsx(_reduxForm.Field, {
	  name: 'password',
	  icon: 'fa-unlock-alt',
	  component: _formInputs.renderInput,
	  type: 'password',
	  label: 'Password'
	});
	
	var LoginForm = function LoginForm(_ref) {
	  var handleSubmit = _ref.handleSubmit;
	  var login = _ref.login;
	  var message = _ref.message;
	  var invalid = _ref.invalid;
	  var submitting = _ref.submitting;
	  var pristine = _ref.pristine;
	  return _jsx('div', {}, void 0, _jsx('form', {
	    className: _loginform2.default['login-form'],
	    onSubmit: handleSubmit(login)
	  }, void 0, _jsx('div', {
	    className: _loginform2.default['login-error']
	  }, void 0, message), _ref2, _ref3, _jsx(_formInputs.SubmitButton, {
	    text: 'let me in',
	    disabled: { invalid: invalid, submitting: submitting, pristine: pristine }
	  }), _jsx('div', {
	    className: _loginform2.default.subactions
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/signup',
	    className: _loginform2.default.signup
	  }, void 0, 'sign up'), _jsx('a', {
	    className: _loginform2.default.forgot
	  }, void 0, 'forgot password?'))));
	};
	
	exports.default = (0, _reduxForm.reduxForm)({ form: 'loginForm', validate: validate })(LoginForm);

/***/ },
/* 86 */
/*!**************************************************************!*\
  !*** ./client/modules/Category/components/CategorySelect.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CategorySelect = {
	  "categories": "CategorySelect__categories__wel1o",
	  "row": "CategorySelect__row__1IaIQ"
	};
	
	var _CategorySelect2 = _interopRequireDefault(_CategorySelect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx('label', {}, void 0, 'Categories');
	
	var CategorySelect = function (_Component) {
	  _inherits(CategorySelect, _Component);
	
	  function CategorySelect(props) {
	    _classCallCheck(this, CategorySelect);
	
	    return _possibleConstructorReturn(this, (CategorySelect.__proto__ || Object.getPrototypeOf(CategorySelect)).call(this, props));
	  }
	
	  _createClass(CategorySelect, [{
	    key: 'handleChange',
	    value: function handleChange(e, option) {
	      var input = this.props.input;
	      var index = input.value.indexOf(option);
	
	      if (e.target.checked && index < 0) {
	        input.onChange(input.value.concat([e.target.value]));
	      } else {
	        var copy = [].concat(_toConsumableArray(input.value));
	        copy.splice(index, 1);
	        input.onChange(copy);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var fields = this.props.fields;
	
	      return _jsx('div', {
	        className: _CategorySelect2.default.categories
	      }, void 0, _ref, this.props.options.map(function (option, i) {
	        return _jsx('div', {
	          className: _CategorySelect2.default.row
	        }, i, _jsx('input', {
	          type: 'checkbox',
	          value: option,
	          checked: _this2.props.input.value.indexOf(option) >= 0,
	          onChange: function onChange(e) {
	            return _this2.handleChange(e, option);
	          }
	        }), _jsx('span', {}, void 0, option));
	      }));
	    }
	  }]);
	
	  return CategorySelect;
	}(_react.Component);
	
	exports.default = CategorySelect;

/***/ },
/* 87 */
/*!******************************************************************!*\
  !*** ./client/modules/Ingredient/components/IngredientSelect.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 12);
	
	var _IngredientSelect = {
	  "row": "IngredientSelect__row__2XqQl",
	  "remove": "IngredientSelect__remove___oQ-5",
	  "title": "IngredientSelect__title__3vPYc",
	  "ingredients-list": "IngredientSelect__ingredients-list__3Rafb"
	};
	
	var _IngredientSelect2 = _interopRequireDefault(_IngredientSelect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderField = function renderField(_ref) {
	  var input = _ref.input;
	  var label = _ref.label;
	  var type = _ref.type;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  return _jsx('div', {
	    className: _IngredientSelect2.default.row
	  }, void 0, _jsx('div', {}, void 0, _react2.default.createElement('input', _extends({}, input, { type: type, placeholder: label })), touched && error && _jsx('span', {}, void 0, error)));
	};
	
	var _ref3 = _jsx('label', {}, void 0, 'Ingredients');
	
	var _ref4 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add');
	
	var _ref5 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'clear');
	
	var renderIngredients = function renderIngredients(_ref2) {
	  var fields = _ref2.fields;
	  return _jsx('div', {
	    className: _IngredientSelect2.default.container
	  }, void 0, _jsx('div', {
	    className: _IngredientSelect2.default.title
	  }, void 0, _ref3, _jsx('a', {
	    type: 'button',
	    onClick: function onClick() {
	      return fields.push();
	    }
	  }, void 0, _ref4, 'Add')), _jsx('ul', {
	    className: _IngredientSelect2.default['ingredients-list']
	  }, void 0, fields.map(function (field, index) {
	    return _jsx('li', {}, index, _jsx(_reduxForm.Field, {
	      name: field + '.amount',
	      type: 'text',
	      component: renderField,
	      label: 'amount'
	    }), 'of', _jsx(_reduxForm.Field, {
	      name: field + '.ingredient',
	      type: 'text',
	      component: renderField,
	      label: 'ingredient'
	    }), _jsx('a', {
	      className: _IngredientSelect2.default.remove,
	      type: 'button',
	      onClick: function onClick() {
	        return fields.remove(index);
	      }
	    }, void 0, _ref5, 'remove'));
	  })));
	};
	
	exports.default = renderIngredients;

/***/ },
/* 88 */
/*!********************************************!*\
  !*** ./client/modules/Intl/IntlReducer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _setup = __webpack_require__(/*! ../../../Intl/setup */ 27);
	
	var _IntlActions = __webpack_require__(/*! ./IntlActions */ 36);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var initLocale = global.navigator && global.navigator.language || 'en';
	
	var initialState = _extends({
	  locale: initLocale,
	  enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});
	
	var IntlReducer = function IntlReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _IntlActions.SWITCH_LANGUAGE:
	      {
	        var type = action.type;
	
	        var actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line
	
	
	        return _extends({}, state, actionWithoutType);
	      }
	
	    default:
	      return state;
	  }
	};
	
	exports.default = IntlReducer;

/***/ },
/* 89 */
/*!*****************************************************************************!*\
  !*** ./client/modules/Post/components/PostCreateWidget/PostCreateWidget.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostCreateWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _PostCreateWidget = {
	  "form": "PostCreateWidget__form__1_WEV",
	  "form-content": "PostCreateWidget__form-content__3CPct",
	  "form-title": "PostCreateWidget__form-title__1CSMU",
	  "form-field": "PostCreateWidget__form-field__2UV8G",
	  "post-submit-button": "PostCreateWidget__post-submit-button__1atG9",
	  "appear": "PostCreateWidget__appear__38mS7"
	};
	
	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'createNewPost'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submit'
	});
	
	var PostCreateWidget = exports.PostCreateWidget = function (_Component) {
	  _inherits(PostCreateWidget, _Component);
	
	  function PostCreateWidget() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, PostCreateWidget);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostCreateWidget.__proto__ || Object.getPrototypeOf(PostCreateWidget)).call.apply(_ref, [this].concat(args))), _this), _this.addPost = function () {
	      var nameRef = _this.refs.name;
	      var titleRef = _this.refs.title;
	      var contentRef = _this.refs.content;
	      if (nameRef.value && titleRef.value && contentRef.value) {
	        _this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
	        nameRef.value = titleRef.value = contentRef.value = '';
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(PostCreateWidget, [{
	    key: 'render',
	    value: function render() {
	      var cls = _PostCreateWidget2.default.form + ' ' + (this.props.showAddPost ? _PostCreateWidget2.default.appear : '');
	      return _jsx('div', {
	        className: cls
	      }, void 0, _jsx('div', {
	        className: _PostCreateWidget2.default['form-content']
	      }, void 0, _jsx('h2', {
	        className: _PostCreateWidget2.default['form-title']
	      }, void 0, _ref2), _react2.default.createElement('input', { placeholder: this.props.intl.messages.authorName, className: _PostCreateWidget2.default['form-field'], ref: 'name' }), _react2.default.createElement('input', { placeholder: this.props.intl.messages.postTitle, className: _PostCreateWidget2.default['form-field'], ref: 'title' }), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.postContent, className: _PostCreateWidget2.default['form-field'], ref: 'content' }), _jsx('a', {
	        className: _PostCreateWidget2.default['post-submit-button'],
	        href: '#',
	        onClick: this.addPost
	      }, void 0, _ref3)));
	    }
	  }]);
	
	  return PostCreateWidget;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(PostCreateWidget);

/***/ },
/* 90 */
/*!****************************************************!*\
  !*** ./client/modules/Post/components/PostList.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Components
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PostListItem = __webpack_require__(/*! ./PostListItem/PostListItem */ 91);
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PostList(props) {
	  return _jsx('div', {
	    className: 'listView'
	  }, void 0, props.posts.map(function (post) {
	    return _jsx(_PostListItem2.default, {
	      post: post,
	      onDelete: function onDelete() {
	        return props.handleDeletePost(post.cuid);
	      }
	    }, post.cuid);
	  }));
	}
	
	exports.default = PostList;

/***/ },
/* 91 */
/*!*********************************************************************!*\
  !*** ./client/modules/Post/components/PostListItem/PostListItem.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _PostListItem = {
	  "single-post": "PostListItem__single-post__2wFZU",
	  "post-title": "PostListItem__post-title__1BU3H",
	  "author-name": "PostListItem__author-name__2pYEG",
	  "post-desc": "PostListItem__post-desc__2hG8t",
	  "post-action": "PostListItem__post-action__37qYF",
	  "divider": "PostListItem__divider__3H_6O",
	  "post-detail": "PostListItem__post-detail__16xor"
	};
	
	var _PostListItem2 = _interopRequireDefault(_PostListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'by'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'deletePost'
	});
	
	function PostListItem(props) {
	  return _jsx('div', {
	    className: _PostListItem2.default['single-post']
	  }, void 0, _jsx('h3', {
	    className: _PostListItem2.default['post-title']
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/posts/' + props.post.slug + '-' + props.post.cuid
	  }, void 0, props.post.title)), _jsx('p', {
	    className: _PostListItem2.default['author-name']
	  }, void 0, _ref, ' ', props.post.name), _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, props.post.content), _jsx('p', {
	    className: _PostListItem2.default['post-action']
	  }, void 0, _jsx('a', {
	    href: '#',
	    onClick: props.onDelete
	  }, void 0, _ref2)), _jsx('hr', {
	    className: _PostListItem2.default.divider
	  }));
	}
	
	exports.default = PostListItem;

/***/ },
/* 92 */
/*!*******************************************************************************!*\
  !*** ./client/modules/Recipe/components/RecipeCreateForm/RecipeCreateForm.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	//import RecipeEditor from '../RecipeEditor/RecipeEditor';
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 12);
	
	var _CategorySelect = __webpack_require__(/*! ../../../Category/components/CategorySelect */ 86);
	
	var _CategorySelect2 = _interopRequireDefault(_CategorySelect);
	
	var _formInputs = __webpack_require__(/*! ../../../../components/form/formInputs */ 28);
	
	var _IngredientSelect = __webpack_require__(/*! ../../../Ingredient/components/IngredientSelect */ 87);
	
	var _IngredientSelect2 = _interopRequireDefault(_IngredientSelect);
	
	var _RecipeCreateForm = {
	  "create-form": "RecipeCreateForm__create-form__2Wj18"
	};
	
	var _RecipeCreateForm2 = _interopRequireDefault(_RecipeCreateForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validate = function validate(values) {
	  var errors = {};
	  if (!values.title) {
	    errors.title = 'Required!';
	  }
	  return errors;
	};
	
	var _ref2 = _jsx(_reduxForm.Field, {
	  name: 'title',
	  icon: 'fa-pencil-square-o',
	  component: _formInputs.renderInput,
	  type: 'text',
	  label: 'Title'
	});
	
	var _ref3 = _jsx(_reduxForm.FieldArray, {
	  name: 'ingredients',
	  component: _IngredientSelect2.default
	});
	
	var _ref4 = _jsx(_reduxForm.Field, {
	  name: 'description',
	  component: _formInputs.renderTextarea,
	  label: 'Description'
	});
	
	var _ref5 = _jsx(_reduxForm.Field, {
	  name: 'instructions',
	  component: _formInputs.renderTextarea,
	  label: 'Instructions'
	});
	
	var _ref6 = _jsx(_reduxForm.Field, {
	  name: 'imageUrl',
	  icon: 'fa-picture-o',
	  component: _formInputs.renderInput,
	  label: 'Image url'
	});
	
	var RecipeCreateForm = function RecipeCreateForm(_ref) {
	  var handleSubmit = _ref.handleSubmit;
	  var handleCreate = _ref.handleCreate;
	  var categories = _ref.categories;
	  var invalid = _ref.invalid;
	  var submitting = _ref.submitting;
	  var pristine = _ref.pristine;
	  return _jsx('form', {
	    onSubmit: handleSubmit(handleCreate),
	    className: _RecipeCreateForm2.default['create-form']
	  }, void 0, _ref2, _jsx('div', {
	    className: _RecipeCreateForm2.default['text-container']
	  }, void 0, _jsx(_reduxForm.Field, {
	    name: 'categories',
	    options: categories.map(function (c) {
	      return c.title;
	    }),
	    component: _CategorySelect2.default
	  })), _ref3, _ref4, _ref5, _ref6, _jsx(_formInputs.SubmitButton, {
	    text: 'add recipe',
	    disabled: { invalid: invalid, submitting: submitting, pristine: pristine }
	  }));
	};
	
	RecipeCreateForm = (0, _reduxForm.reduxForm)({
	  form: 'RecipeCreateForm',
	  initialValues: {
	    categories: [],
	    ingredients: [{ amount: '', ingredient: '' }]
	  },
	  validate: validate
	})(RecipeCreateForm);
	
	exports.default = RecipeCreateForm;

/***/ },
/* 93 */
/*!********************************************************!*\
  !*** ./client/modules/Recipe/components/RecipeList.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Components
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RecipeListItem = __webpack_require__(/*! ./RecipeListItem/RecipeListItem */ 94);
	
	var _RecipeListItem2 = _interopRequireDefault(_RecipeListItem);
	
	var _RecipeList = {
	  "recipelist": "RecipeList__recipelist__3nQUW",
	  "meta": "RecipeList__meta__3aiQw",
	  "affirmation": "RecipeList__affirmation__389fB",
	  "optionbar": "RecipeList__optionbar__3UrvU"
	};
	
	var _RecipeList2 = _interopRequireDefault(_RecipeList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('span', {}, void 0, 'most loved');
	
	var _ref2 = _jsx('a', {}, void 0, 'all time');
	
	var _ref3 = _jsx('a', {}, void 0, 'this month');
	
	var _ref4 = _jsx('a', {}, void 0, 'this week');
	
	function RecipeList(props) {
	  return _jsx('div', {
	    className: _RecipeList2.default.recipelist
	  }, void 0, _jsx('div', {
	    className: _RecipeList2.default.meta
	  }, void 0, _jsx('div', {
	    className: _RecipeList2.default.affirmation
	  }, void 0, 'you searched for smoothies with tomato and banana'), _jsx('div', {
	    className: _RecipeList2.default.optionbar
	  }, void 0, _ref, _ref2, _ref3, _ref4)), props.recipes.map(function (recipe, index) {
	    return _jsx(_RecipeListItem2.default, {
	      recipe: recipe
	    }, index);
	  }));
	}
	
	exports.default = RecipeList;

/***/ },
/* 94 */
/*!***************************************************************************!*\
  !*** ./client/modules/Recipe/components/RecipeListItem/RecipeListItem.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _RecipeListItem = {
	  "single-recipe": "RecipeListItem__single-recipe__27mt6",
	  "title": "RecipeListItem__title__1gAKc",
	  "desc": "RecipeListItem__desc__3FzGY",
	  "divider": "RecipeListItem__divider__2DPWN",
	  "label": "RecipeListItem__label__3AWhx",
	  "ingredient": "RecipeListItem__ingredient__3o2th",
	  "category": "RecipeListItem__category__hIL1P",
	  "text-wrapper": "RecipeListItem__text-wrapper__1gpZ6",
	  "image-wrapper": "RecipeListItem__image-wrapper__2pUh6"
	};
	
	var _RecipeListItem2 = _interopRequireDefault(_RecipeListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function RecipeListItem(_ref) {
	  var recipe = _ref.recipe;
	
	  return _jsx('div', {
	    className: _RecipeListItem2.default['single-recipe']
	  }, void 0, _jsx('div', {
	    className: _RecipeListItem2.default['image-wrapper']
	  }, void 0, _jsx('img', {
	    src: recipe.imageUrl ? recipe.imageUrl : ''
	  })), _jsx('div', {
	    className: _RecipeListItem2.default['text-wrapper']
	  }, void 0, _jsx('h3', {
	    className: _RecipeListItem2.default.title
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/recipes/' + recipe.slug + '-' + recipe.cuid
	  }, void 0, recipe.title)), _jsx('div', {
	    className: _RecipeListItem2.default.categories
	  }, void 0, _jsx('span', {
	    className: _RecipeListItem2.default.label
	  }, void 0, 'Categories:'), recipe.categories.map(function (cat, i) {
	    return _jsx('span', {
	      className: _RecipeListItem2.default.category
	    }, i, cat.title);
	  })), _jsx('div', {
	    className: _RecipeListItem2.default.ingredients
	  }, void 0, _jsx('span', {
	    className: _RecipeListItem2.default.label
	  }, void 0, 'Ingredients:'), recipe.ingredients.map(function (ing, i) {
	    return _jsx('span', {
	      className: _RecipeListItem2.default.ingredient
	    }, i, ing.ingredient);
	  })), _jsx('p', {
	    className: _RecipeListItem2.default.desc
	  }, void 0, recipe.description)));
	}
	
	exports.default = RecipeListItem;

/***/ },
/* 95 */
/*!*****************************************************************************!*\
  !*** ./client/modules/Recipe/components/RecipeSearchBox/RecipeSearchBox.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipeSearchBox = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(/*! react-intl */ 3);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _RecipeSearchBox = {
	  "search-form": "RecipeSearchBox__search-form__2Xxc9",
	  "name-field": "RecipeSearchBox__name-field__1F_py",
	  "recipe-search-button": "RecipeSearchBox__recipe-search-button__2y4CG",
	  "search-form-input": "RecipeSearchBox__search-form-input__3sb8C"
	};
	
	var _RecipeSearchBox2 = _interopRequireDefault(_RecipeSearchBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var RecipeSearchBox = exports.RecipeSearchBox = function (_Component) {
	  _inherits(RecipeSearchBox, _Component);
	
	  function RecipeSearchBox() {
	    _classCallCheck(this, RecipeSearchBox);
	
	    var _this = _possibleConstructorReturn(this, (RecipeSearchBox.__proto__ || Object.getPrototypeOf(RecipeSearchBox)).call(this));
	
	    _this.handleChange = function (event) {
	      _this.setState({ nameText: event.target.value });
	    };
	
	    _this.state = {
	      nameText: 'Tacos!'
	    };
	    return _this;
	  }
	
	  _createClass(RecipeSearchBox, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _jsx('div', {
	        className: _RecipeSearchBox2.default['search-form']
	      }, void 0, _react2.default.createElement('input', { placeholder: 'Name', value: this.state.nameText, onChange: this.handleChange, className: _RecipeSearchBox2.default['search-form-input'], ref: 'name' }), _jsx('input', {
	        placeholder: 'Ingredients',
	        className: _RecipeSearchBox2.default['search-form-input']
	      }), _jsx('input', {
	        placeholder: 'Categories',
	        className: _RecipeSearchBox2.default['search-form-input']
	      }), _jsx(_reactRouter.Link, {
	        to: '/recipes/search/' + encodeURIComponent(this.state.nameText),
	        className: _RecipeSearchBox2.default['recipe-search-button']
	      }, void 0, 'Find recipes!'), _jsx('a', {
	        href: '#',
	        className: _RecipeSearchBox2.default['recipe-search-button'],
	        onClick: function onClick() {
	          console.log(_this2);
	        }
	      }, void 0, 'test'));
	    }
	  }]);
	
	  return RecipeSearchBox;
	}(_react.Component);
	
	exports.default = RecipeSearchBox;

/***/ },
/* 96 */
/*!**************************************************************************!*\
  !*** ./client/modules/Recipe/pages/RecipeSearchPage/RecipeSearchPage.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _RecipeSearchBox = __webpack_require__(/*! ../../components/RecipeSearchBox/RecipeSearchBox */ 95);
	
	var _RecipeSearchBox2 = _interopRequireDefault(_RecipeSearchBox);
	
	var _RecipeQuickSearch = __webpack_require__(/*! ../../components/RecipeQuickSearch/RecipeQuickSearch */ 39);
	
	var _RecipeQuickSearch2 = _interopRequireDefault(_RecipeQuickSearch);
	
	var _RecipeSearchPage = {
	  "search": "RecipeSearchPage__search__13Ucd",
	  "menu": "RecipeSearchPage__menu__2PIt-",
	  "buttons": "RecipeSearchPage__buttons__2hvwd",
	  "bottom": "RecipeSearchPage__bottom__3jNVC",
	  "wrapper": "RecipeSearchPage__wrapper__NUdjN"
	};
	
	var _RecipeSearchPage2 = _interopRequireDefault(_RecipeSearchPage);
	
	var _CategoryActions = __webpack_require__(/*! ../../../Category/CategoryActions */ 14);
	
	var _CategoryReducer = __webpack_require__(/*! ../../../Category/CategoryReducer */ 15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	
	
	var _ref2 = _jsx(_reactRouter.Link, {}, void 0, _jsx('div', {}), _jsx('div', {}, void 0, 'advanced'), _jsx('div', {}, void 0, _jsx('i', {
	  className: 'fa fa-chevron-right'
	})));
	
	var _ref3 = _jsx(_reactRouter.Link, {
	  to: '/create'
	}, void 0, _jsx('div', {}), _jsx('div', {}, void 0, 'contribute'), _jsx('div', {}, void 0, _jsx('i', {
	  className: 'fa fa-chevron-right'
	})));
	
	var _ref4 = _jsx(_reactRouter.Link, {}, void 0, _jsx('div', {}), _jsx('div', {}, void 0, 'about'), _jsx('div', {}, void 0, _jsx('i', {
	  className: 'fa fa-chevron-right'
	})));
	
	var RecipeSearchPage = function (_Component) {
	  _inherits(RecipeSearchPage, _Component);
	
	  function RecipeSearchPage() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, RecipeSearchPage);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeSearchPage.__proto__ || Object.getPrototypeOf(RecipeSearchPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleQuickSearch = function (fields) {
	      var ingredient1 = (0, _limax2.default)(encodeURIComponent(fields.ingredient1.replace(/\s/g, "-")));
	      var ingredient2 = (0, _limax2.default)(encodeURIComponent(fields.ingredient2.replace(/\s/g, "-")));
	      _reactRouter.browserHistory.push('/search?category=' + fields.category + '&ingredient=' + ingredient1 + '&ingredient=' + ingredient2);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(RecipeSearchPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _CategoryActions.fetchCategories)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeSearchPage2.default.wrapper
	      }, void 0, _jsx('div', {
	        className: _RecipeSearchPage2.default.bottom
	      }, void 0, _jsx('div', {
	        className: _RecipeSearchPage2.default.menu
	      }, void 0, _ref2, _ref3, _ref4), _jsx('div', {
	        className: _RecipeSearchPage2.default.search
	      }, void 0, _jsx(_RecipeQuickSearch2.default, {
	        handleQuickSearch: this.handleQuickSearch,
	        categories: this.props.categories
	      }))));
	    }
	  }]);
	
	  return RecipeSearchPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RecipeSearchPage.need = [function () {
	  return (0, _CategoryActions.fetchCategories)();
	}];
	
	//Retrieve data from store as props
	function mapStateToProps(state) {
	  return {
	    categories: (0, _CategoryReducer.getCategories)(state)
	  };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeSearchPage);

/***/ },
/* 97 */
/*!*******************************************************!*\
  !*** ./client/modules/User/components/UserRecipes.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (_ref) {
	  var user = _ref.user;
	  return _jsx('div', {}, void 0, user.recipes && !user.recipes.length ? _jsx('span', {}, void 0, user.username, ' has no recipes :(') : _jsx('h1', {}, void 0, user.username, '\'s recipes'), user.recipes && user.recipes.map(function (recipe, index) {
	    return _jsx('div', {}, index, _jsx('span', {}, void 0, recipe.title));
	  }));
	};

/***/ },
/* 98 */
/*!**********************************!*\
  !*** ./client/util/parse-url.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeTokenKeys = normalizeTokenKeys;
	exports.getAllParams = getAllParams;
	exports.default = getRedirectInfo;
	
	var _querystring = __webpack_require__(/*! querystring */ 124);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	var _extend = __webpack_require__(/*! extend */ 112);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function normalizeTokenKeys(params) {
	  // normalize keys
	  if (params.token) {
	    params["access-token"] = params.token;
	    delete params.token;
	  }
	  if (params.auth_token) {
	    params["access-token"] = params.auth_token;
	    delete params.auth_token;
	  }
	  if (params.client_id) {
	    params.client = params.client_id;
	    delete params.client_id;
	  }
	  if (params.config) {
	    params.endpointKey = params.config;
	    delete params.config;
	  }
	
	  return params;
	};
	
	var getAnchorSearch = function getAnchorSearch(location) {
	  var rawAnchor = location.anchor || "",
	      arr = rawAnchor.split("?");
	  return arr.length > 1 ? arr[1] : null;
	};
	
	var getSearchQs = function getSearchQs(location) {
	  var rawQs = location.search || "",
	      qs = rawQs.replace("?", ""),
	      qsObj = qs ? _querystring2.default.parse(qs) : {};
	
	  return qsObj;
	};
	
	var getAnchorQs = function getAnchorQs(location) {
	  var anchorQs = getAnchorSearch(location),
	      anchorQsObj = anchorQs ? _querystring2.default.parse(anchorQs) : {};
	
	  return anchorQsObj;
	};
	
	var stripKeys = function stripKeys(obj, keys) {
	  for (var q in keys) {
	    delete obj[keys[q]];
	  }
	
	  return obj;
	};
	
	function getAllParams(location) {
	  return (0, _extend2.default)({}, getAnchorQs(location), getSearchQs(location));
	};
	
	var buildCredentials = function buildCredentials(location, keys) {
	  var params = getAllParams(location);
	  var authHeaders = {};
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var key = _step.value;
	
	      authHeaders[key] = params[key];
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return normalizeTokenKeys(authHeaders);
	};
	
	// this method is tricky. we want to reconstruct the current URL with the
	// following conditions:
	// 1. search contains none of the supplied keys
	// 2. anchor search (i.e. `#/?key=val`) contains none of the supplied keys
	// 3. all of the keys NOT supplied are presevered in their original form
	// 4. url protocol, host, and path are preserved
	var getLocationWithoutParams = function getLocationWithoutParams(currentLocation, keys) {
	  // strip all values from both actual and anchor search params
	  var newSearch = _querystring2.default.stringify(stripKeys(getSearchQs(currentLocation), keys)),
	      newAnchorQs = _querystring2.default.stringify(stripKeys(getAnchorQs(currentLocation), keys)),
	      newAnchor = (currentLocation.hash || "").split("?")[0];
	
	  if (newSearch) {
	    newSearch = "?" + newSearch;
	  }
	
	  if (newAnchorQs) {
	    newAnchor += "?" + newAnchorQs;
	  }
	
	  if (newAnchor && !newAnchor.match(/^#/)) {
	    newAnchor = "#/" + newAnchor;
	  }
	
	  // reconstruct location with stripped auth keys
	  var newLocation = currentLocation.pathname + newSearch + newAnchor;
	
	  return newLocation;
	};
	
	function getRedirectInfo(currentLocation) {
	  if (!currentLocation) {
	    return {};
	  } else {
	    var authKeys = ["access-token", "token", "auth_token", "config", "client", "client_id", "expiry", "uid", "reset_password", "account_confirmation_success"];
	
	    var authRedirectHeaders = buildCredentials(currentLocation, authKeys);
	    var authRedirectPath = getLocationWithoutParams(currentLocation, authKeys);
	
	    if (authRedirectPath !== currentLocation) {
	      return { authRedirectHeaders: authRedirectHeaders, authRedirectPath: authRedirectPath };
	    } else {
	      return {};
	    }
	  }
	}

/***/ },
/* 99 */
/*!*************************************!*\
  !*** ./client/util/queryBuilder.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.build = build;
	function build(_ref) {
	  var _ref$category = _ref.category;
	  var category = _ref$category === undefined ? [] : _ref$category;
	  var _ref$ingredient = _ref.ingredient;
	  var ingredient = _ref$ingredient === undefined ? [] : _ref$ingredient;
	
	  if (category.constructor != Array) {
	    category = [category];
	  }
	  if (ingredient.constructor != Array) {
	    ingredient = [ingredient];
	  }
	  var baseUrl = 'recipes/search';
	  var categories = category.map(function (val) {
	    return 'category=' + val;
	  });
	  var ingredients = ingredient.map(function (val) {
	    return 'ingredient=' + val;
	  });
	
	  var params = categories.concat(ingredients);
	
	  var url = params.reduce(function (prev, current, index) {
	    return index === 0 ? prev + '?' + current : prev + '&' + current;
	  }, baseUrl);
	
	  return url;
	}

/***/ },
/* 100 */
/*!********************************!*\
  !*** ./server/config/neo4j.js ***!
  \********************************/
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  USERNAME: 'neo4j',
	  PASSWORD: 'temp123',
	  URL_LOCAL: 'bolt://localhost'
	};
	
	exports.default = config;

/***/ },
/* 101 */
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unwrapToken = unwrapToken;
	
	var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ 11);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(/*! ../config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _cookies = __webpack_require__(/*! cookies */ 24);
	
	var _cookies2 = _interopRequireDefault(_cookies);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function unwrapToken(req, res) {
	  var token = new _cookies2.default(req, res).get('token');
	  if (token) {
	    // verifies secret and checks exp
	    _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });
	      } else {
	        res.json(decoded);
	      }
	    });
	  } else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({
	      success: false,
	      message: 'No token provided.'
	    });
	  }
	}

/***/ },
/* 102 */
/*!***************************************************!*\
  !*** ./server/controllers/category.controller.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCategories = getCategories;
	exports.getCategoriesByTitle = getCategoriesByTitle;
	
	var _category = __webpack_require__(/*! ../models/category */ 22);
	
	var _category2 = _interopRequireDefault(_category);
	
	var _cuid = __webpack_require__(/*! cuid */ 10);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all Categories
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getCategories(req, res) {
	  _category2.default.find().exec(function (err, categories) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ categories: categories });
	  });
	}
	
	function getCategoriesByTitle(req, res) {
	  _category2.default.find({ "title": new RegExp(req.params.title, "i") }).exec(function (err, categories) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ categories: categories });
	  });
	}

/***/ },
/* 103 */
/*!*****************************************************!*\
  !*** ./server/controllers/ingredient.controller.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIngredients = getIngredients;
	exports.getIngredientsByTitle = getIngredientsByTitle;
	
	var _ingredient = __webpack_require__(/*! ../models/ingredient */ 47);
	
	var _ingredient2 = _interopRequireDefault(_ingredient);
	
	var _cuid = __webpack_require__(/*! cuid */ 10);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all ingredients
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getIngredients(req, res) {
	  _ingredient2.default.find().exec(function (err, Ingredients) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ Ingredients: Ingredients });
	  });
	}
	
	function getIngredientsByTitle(req, res) {
	  _ingredient2.default.find({ "singular": new RegExp(req.params.title, "i") }).exec(function (err, ingredients) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ ingredients: ingredients });
	  });
	}

/***/ },
/* 104 */
/*!***********************************************!*\
  !*** ./server/controllers/post.controller.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPosts = getPosts;
	exports.addPost = addPost;
	exports.getPost = getPost;
	exports.deletePost = deletePost;
	
	var _post = __webpack_require__(/*! ../models/post */ 48);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _cuid = __webpack_require__(/*! cuid */ 10);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(/*! sanitize-html */ 54);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPosts(req, res) {
	  _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ posts: posts });
	  });
	}
	
	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function addPost(req, res) {
	  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
	    res.status(403).end();
	  }
	
	  var newPost = new _post2.default(req.body.post);
	
	  // Let's sanitize inputs
	  newPost.title = (0, _sanitizeHtml2.default)(newPost.title);
	  newPost.name = (0, _sanitizeHtml2.default)(newPost.name);
	  newPost.content = (0, _sanitizeHtml2.default)(newPost.content);
	
	  newPost.slug = (0, _limax2.default)(newPost.title.toLowerCase(), { lowercase: true });
	  newPost.cuid = (0, _cuid2.default)();
	  newPost.save(function (err, saved) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ post: saved });
	  });
	}
	
	/**
	 * Get a single post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ post: post });
	  });
	}
	
	/**
	 * Delete a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deletePost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      res.status(500).send(err);
	    }
	
	    post.remove(function () {
	      res.status(200).end();
	    });
	  });
	}

/***/ },
/* 105 */
/*!*************************************************!*\
  !*** ./server/controllers/recipe.controller.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRecipes = getRecipes;
	exports.getRecipe = getRecipe;
	exports.getRecipesByTitle = getRecipesByTitle;
	exports.searchRecipes = searchRecipes;
	exports.addRecipe = addRecipe;
	exports.addRecipeOld = addRecipeOld;
	
	var _recipe = __webpack_require__(/*! ../models/recipe */ 50);
	
	var _recipe2 = _interopRequireDefault(_recipe);
	
	var _category = __webpack_require__(/*! ../models/category */ 22);
	
	var _category2 = _interopRequireDefault(_category);
	
	var _cuid = __webpack_require__(/*! cuid */ 10);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(/*! limax */ 9);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(/*! sanitize-html */ 54);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _dbUtils = __webpack_require__(/*! ../util/dbUtils */ 23);
	
	var _recipeNeo4j = __webpack_require__(/*! ../models/recipe-neo4j */ 49);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all recipes
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getRecipes(req, res) {
	  _recipe2.default.find().sort('-dateAdded').exec(function (err, recipes) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ recipes: recipes });
	  });
	}
	
	/**
	 * Get a single recipes
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getRecipe(req, res) {
	  _recipe2.default.findOne({ cuid: req.params.cuid }).populate('author').exec(function (err, recipe) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ recipe: recipe });
	  });
	}
	
	function getRecipesByTitle(req, res) {
	  _recipe2.default.find({ "title": new RegExp(req.params.title, "i") }).populate('ingredients categories').exec(function (err, recipes) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ recipes: recipes });
	  });
	}
	
	function searchRecipes(req, res) {
	  var categories = req.query.category.constructor === Array ? req.query.category : [req.query.category];
	  var ingredients = req.query.ingredient.constructor === Array ? req.query.ingredient : [req.query.ingredient];
	  _recipe2.default.find({
	    'categories': { $all: categories },
	    'ingredients.ingredient': { $all: ingredients }
	  }).populate('categories').exec(function (err, recipes) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ recipes: recipes });
	  });
	}
	
	function addRecipe(req, res) {
	  if (!req.user || !req.user.cuid) {
	    return res.status(401).end();
	  }
	
	  var recipe = req.body.recipe;
	
	  if (!recipe.title || !recipe.ingredients && recipe.ingredients.length || !recipe.categories && recipe.categories.length) {
	    return res.status(403).end();
	  }
	
	  var params = {
	    title: (0, _sanitizeHtml2.default)(recipe.title),
	    description: (0, _sanitizeHtml2.default)(recipe.description),
	    instructions: (0, _sanitizeHtml2.default)(recipe.instructions),
	    slug: (0, _limax2.default)(recipe.title.toLowerCase(), { lowercase: true }),
	    cuid: (0, _cuid2.default)()
	  };
	
	  var ingredientsQuery = recipe.ingredients.map(function (ingredient, index) {
	    return '\n    MERGE (i' + index + ':Ingredient { name:\'' + ingredient.ingredient.toLowerCase() + '\'})\n    MERGE (recipe)-[:CONTAINS {amount: \'' + ingredient.amount + '\'}]->(i' + index + ')\n  ';
	  }).join('\n');
	
	  var categoriesQuery = recipe.categories.map(function (category, index) {
	    return '\n    MERGE (c' + index + ':Category { name:\'' + category.toLowerCase() + '\'})\n    MERGE (recipe)-[:IS]->(c' + index + ')\n  ';
	  }).join('\n');
	
	  (0, _dbUtils.getSession)(req).run('\n    MATCH (user:User {cuid: \'' + req.user.cuid + '\'})\n    CREATE\n      (recipe:Recipe {\n        title: {title},\n        description: {description},\n        instructions: {instructions},\n        slug: {slug},\n        cuid: {cuid}\n      }),\n      (user)-[:AUTHORED]->(recipe)\n    ' + ingredientsQuery + '\n    ' + categoriesQuery + '\n  ', params).then(function (results) {
	    return res.json({ recipe: results });
	  });
	}
	
	function addRecipeOld(req, res) {
	  if (!req.user || !req.user._id) {
	    return res.status(401).end();
	  }
	
	  var recipe = req.body.recipe;
	
	  if (!recipe.title || !recipe.ingredients && recipe.ingredients.length || !recipe.categories && recipe.categories.length) {
	    return res.status(403).end();
	  }
	
	  var newRecipe = new _recipe2.default(recipe);
	
	  // Let's sanitize inputs
	  newRecipe.title = (0, _sanitizeHtml2.default)(newRecipe.title);
	  newRecipe.description = (0, _sanitizeHtml2.default)(newRecipe.description);
	  newRecipe.instructions = (0, _sanitizeHtml2.default)(newRecipe.instructions);
	
	  newRecipe.ingredients = newRecipe.ingredients.map(function (_ref) {
	    var ingredient = _ref.ingredient;
	    var amount = _ref.amount;
	    return { ingredient: (0, _limax2.default)(ingredient), amount: (0, _limax2.default)(amount) };
	  });
	  newRecipe.categories = newRecipe.categories.map(function (category) {
	    return (0, _limax2.default)(category);
	  });
	
	  newRecipe.slug = (0, _limax2.default)(newRecipe.title.toLowerCase(), { lowercase: true });
	  newRecipe.cuid = (0, _cuid2.default)();
	  newRecipe.author = req.user._id;
	  newRecipe.save(function (err, saved) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ recipe: saved });
	  });
	}

/***/ },
/* 106 */
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getUser = getUser;
	exports.validateUser = validateUser;
	exports.signupUser = signupUser;
	
	var _user = __webpack_require__(/*! ../models/user */ 51);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ 11);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(/*! ../config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getUserToSign = function getUserToSign(_ref) {
	  var _id = _ref._id;
	  var email = _ref.email;
	  var username = _ref.username;
	  var recipes = _ref.recipes;
	  return { _id: _id, email: email, username: username, recipes: recipes };
	};
	
	function getUser(req, res) {
	  _user2.default.findById(req.params.id).populate('recipes').exec(function (err, user) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ user: user });
	  });
	}
	
	function validateUser(req, res) {
	  var findUserCallback = function findUserCallback(err, user) {
	    if (err) {
	      throw err;
	    }
	
	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {
	      user.validPassword(req.body.password, function (err, isValid) {
	        if (!isValid) {
	          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	        } else {
	          var formattedUser = getUserToSign(user);
	          var token = _jsonwebtoken2.default.sign(formattedUser, _config2.default.secret, {
	            expiresIn: '24h' // expires in 24 hours
	          });
	
	          res.json({
	            success: true,
	            message: 'Authentication succeeded.',
	            user: formattedUser,
	            token: token
	          });
	        }
	      });
	    }
	  };
	  _user2.default.findOne({ email: req.body.email }).select('+password').exec(findUserCallback);
	}
	
	function signupUser(req, res) {
	  var user = req.body.user;
	
	  if (!user) {
	    res.status(403).end();
	  }
	
	  if (!user.email) {
	    // Return error if no email provided
	    return res.status(422).send({ error: 'You must enter an email address.' });
	  }
	
	  if (!user.username) {
	    // Return error if full name not provided
	    return res.status(422).send({ error: 'You must enter a username' });
	  }
	
	  if (!user.password) {
	    // Return error if no password provided
	    return res.status(422).send({ error: 'You must enter a password.' });
	  }
	
	  _user2.default.findOne({ email: user.email }, function (err, existingUser) {
	    if (err) {
	      return next(err);
	    }
	
	    if (existingUser) {
	      return res.status(422).send({ error: 'That email address is already in use.' });
	    }
	
	    var newUser = new _user2.default(req.body.user);
	    newUser.save(function (err, saved) {
	      if (err) {
	        console.log(err);
	        res.status(500).send(err);
	      }
	      res.json({ user: saved });
	    });
	  });
	}

/***/ },
/* 107 */
/*!**********************************!*\
  !*** ./server/models/comment.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var commentSchema = new Schema({
	  content: { type: 'String', required: true },
	  likes: { type: 'Number', required: false },
	  dateAdded: { type: 'Date', default: Date.now, required: true },
	  author: { type: Schema.Types.ObjectId, ref: 'User' }
	});
	
	exports.default = _mongoose2.default.model('Comment', commentSchema);

/***/ },
/* 108 */
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 71);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _mongoose = __webpack_require__(/*! mongoose */ 6);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 70);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _morgan = __webpack_require__(/*! morgan */ 72);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _path = __webpack_require__(/*! path */ 73);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _IntlWrapper = __webpack_require__(/*! ../client/modules/Intl/IntlWrapper */ 55);
	
	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);
	
	var _passport = __webpack_require__(/*! passport */ 25);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _auth = __webpack_require__(/*! ./config/auth */ 58);
	
	var _googleAnalytics = __webpack_require__(/*! ./util/googleAnalytics */ 68);
	
	var _webpack = __webpack_require__(/*! webpack */ 26);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _webpackConfig = __webpack_require__(/*! ../webpack.config.dev */ 69);
	
	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
	var _webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ 75);
	
	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
	var _webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ 76);
	
	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
	var _store = __webpack_require__(/*! ../client/store */ 57);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 1);
	
	var _react = __webpack_require__(/*! react */ 0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 74);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 2);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 8);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _routes = __webpack_require__(/*! ../client/routes */ 56);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _fetchData = __webpack_require__(/*! ./util/fetchData */ 67);
	
	var _post = __webpack_require__(/*! ./routes/post.routes */ 63);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _recipe = __webpack_require__(/*! ./routes/recipe.routes */ 64);
	
	var _recipe2 = _interopRequireDefault(_recipe);
	
	var _ingredient = __webpack_require__(/*! ./routes/ingredient.routes */ 62);
	
	var _ingredient2 = _interopRequireDefault(_ingredient);
	
	var _category = __webpack_require__(/*! ./routes/category.routes */ 61);
	
	var _category2 = _interopRequireDefault(_category);
	
	var _auth2 = __webpack_require__(/*! ./routes/auth.routes */ 60);
	
	var _auth3 = _interopRequireDefault(_auth2);
	
	var _user = __webpack_require__(/*! ./routes/user.routes */ 65);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _dummyData = __webpack_require__(/*! ./dummyData */ 59);
	
	var _dummyData2 = _interopRequireDefault(_dummyData);
	
	var _config = __webpack_require__(/*! ./config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _authUtils = __webpack_require__(/*! ./util/authUtils */ 66);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	global.navigator = global.navigator || {};
	global.navigator.userAgent = global.navigator.userAgent || 'all';
	
	// Webpack Requirements
	
	
	// Initialize the Express App
	var app = new _express2.default();
	
	// Run Webpack dev server in development mode
	if (process.env.NODE_ENV === 'development') {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	}
	
	// React And Redux Setup
	
	
	// Import required modules
	
	
	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;
	
	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  }
	
	  // feed some dummy data in DB.
	  (0, _dummyData2.default)();
	});
	
	app.set('superSecret', 'celestialPisslord');
	
	_passport2.default.use((0, _auth.getFacebookStrategy)());
	
	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_passport2.default.initialize());
	
	app.use('/api', _post2.default);
	app.use('/api', _recipe2.default);
	app.use('/api', _ingredient2.default);
	app.use('/api', _category2.default);
	app.use('/api', _user2.default);
	app.use('/api', _auth3.default);
	
	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();
	
	  // Import Manifests
	  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
	
	  return '\n  <!doctype html>\n  <html>\n  <head>\n  ' + head.base.toString() + '\n  ' + head.title.toString() + '\n  ' + head.meta.toString() + '\n  ' + head.link.toString() + '\n  ' + head.script.toString() + '\n\n  ' + (process.env.NODE_ENV === 'production' ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n  <link href=\'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\' rel=\'stylesheet\'>\n  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,900" rel="stylesheet">\n  <link rel="shortcut icon" href="https://s14.postimg.org/ktgi8n2u9/salash_favicon.png" type="image/png" />\n  ' + (process.env.NODE_ENV === 'production' ? _googleAnalytics.snippet : '') + '\n  </head>\n  <body>\n  <div id="root">' + (process.env.NODE_ENV === 'production' ? html : '<div>' + html + '</div>') + '</div>\n  <script>\n  window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n  ' + (process.env.NODE_ENV === 'production' ? '//<![CDATA[\n    window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n    //]]>' : '') + '\n    </script>\n    <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n    <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n    </body>\n    </html>\n    ';
	};
	
	var renderError = function renderError(err) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  return renderFullPage('Server Error' + errTrace, {});
	};
	
	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: (0, _routes2.default)((0, _authUtils.isAuthenticated)(req, res)), location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      return res.status(500).end(renderError(err));
	    }
	
	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }
	
	    if (!renderProps) {
	      return next();
	    }
	
	    var store = (0, _store.configureStore)((0, _authUtils.getInitialState)(req, res));
	
	    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params, renderProps.location.query).then(function () {
	      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	        store: store
	      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	      var finalState = store.getState();
	
	      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	});
	
	// start app
	app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('MERN is running on port: ' + _config2.default.port + '!'); // eslint-disable-line
	  }
	});
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 109 */
/*!***************************************!*\
  !*** ./server/util/authMiddleware.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isAuthenticated = isAuthenticated;
	
	var _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ 11);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _config = __webpack_require__(/*! ../config/config */ 4);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _cookies = __webpack_require__(/*! cookies */ 24);
	
	var _cookies2 = _interopRequireDefault(_cookies);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isAuthenticated(req, res, next) {
	  // check header or url parameters or post parameters for token
	  var token = new _cookies2.default(req, res).get('token');
	  if (token) {
	    // verifies secret and checks exp
	    _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.user = decoded;
	        next();
	      }
	    });
	  } else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({
	      success: false,
	      message: 'No token provided.'
	    });
	  }
	}

/***/ },
/* 110 */
/*!*************************************!*\
  !*** ./server/util/promiseUtils.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }
	
	    return Promise.resolve(results);
	  };
	
	  return runner();
	}

/***/ },
/* 111 */
/*!********************************!*\
  !*** external "bcrypt-nodejs" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 112 */
/*!*************************!*\
  !*** external "extend" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("extend");

/***/ },
/* 113 */
/*!***********************!*\
  !*** external "intl" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 114 */
/*!*****************************************!*\
  !*** external "intl-locales-supported" ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 115 */
/*!********************************************!*\
  !*** external "intl/locale-data/jsonp/en" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 116 */
/*!********************************************!*\
  !*** external "intl/locale-data/jsonp/fr" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 117 */
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 118 */
/*!*******************************!*\
  !*** external "neo4j-driver" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("neo4j-driver");

/***/ },
/* 119 */
/*!************************************!*\
  !*** external "passport-facebook" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 120 */
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 121 */
/*!********************************!*\
  !*** external "postcss-focus" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 122 */
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 123 */
/*!**************************************!*\
  !*** external "postcss-simple-vars" ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = require("postcss-simple-vars");

/***/ },
/* 124 */
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 125 */
/*!*******************************!*\
  !*** external "react-cookie" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-cookie");

/***/ },
/* 126 */
/*!********************************************!*\
  !*** external "react-intl/locale-data/en" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 127 */
/*!********************************************!*\
  !*** external "react-intl/locale-data/fr" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 128 */
/*!*********************************!*\
  !*** external "redux-devtools" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 129 */
/*!**********************************************!*\
  !*** external "redux-devtools-dock-monitor" ***!
  \**********************************************/
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 130 */
/*!*********************************************!*\
  !*** external "redux-devtools-log-monitor" ***!
  \*********************************************/
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 131 */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map
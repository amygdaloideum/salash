/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 105);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;

	var _isomorphicFetch = __webpack_require__(112);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';

	function callApi(endpoint) {
	  var method = arguments.length <= 1 || arguments[1] === undefined ? 'get' : arguments[1];
	  var body = arguments[2];
	  var token = arguments[3];

	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	    credentials: 'same-origin',
	    headers: {
	      'content-type': 'application/json',
	      'authorization': token
	    },
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
/* 4 */
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
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DELETE_RECIPE = exports.UNFAVORITE_RECIPE = exports.FAVORITE_RECIPE = exports.UNLOVE_RECIPE = exports.LOVE_RECIPE = exports.ADD_RECIPES = exports.ADD_RECIPE = undefined;
	exports.addRecipes = addRecipes;
	exports.addRecipe = addRecipe;
	exports.loveRecipe = loveRecipe;
	exports.unloveRecipe = unloveRecipe;
	exports.favoriteRecipe = favoriteRecipe;
	exports.unfavoriteRecipe = unfavoriteRecipe;
	exports.deleteRecipe = deleteRecipe;
	exports.fetchRecipes = fetchRecipes;
	exports.fetchRecipe = fetchRecipe;
	exports.searchRecipes = searchRecipes;
	exports.addRecipeRequest = addRecipeRequest;
	exports.updateRecipeRequest = updateRecipeRequest;
	exports.loveRecipeRequest = loveRecipeRequest;
	exports.unloveRecipeRequest = unloveRecipeRequest;
	exports.favoriteRecipeRequest = favoriteRecipeRequest;
	exports.unfavoriteRecipeRequest = unfavoriteRecipeRequest;
	exports.deleteRecipeRequest = deleteRecipeRequest;

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	var _reactRouter = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export Constants
	var ADD_RECIPE = exports.ADD_RECIPE = 'ADD_RECIPE';
	var ADD_RECIPES = exports.ADD_RECIPES = 'ADD_RECIPES';
	var LOVE_RECIPE = exports.LOVE_RECIPE = 'LOVE_RECIPE';
	var UNLOVE_RECIPE = exports.UNLOVE_RECIPE = 'UNLOVE_RECIPE';
	var FAVORITE_RECIPE = exports.FAVORITE_RECIPE = 'FAVORITE_RECIPE';
	var UNFAVORITE_RECIPE = exports.UNFAVORITE_RECIPE = 'UNFAVORITE_RECIPE';
	var DELETE_RECIPE = exports.DELETE_RECIPE = 'DELETE_RECIPE';

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

	function loveRecipe(recipe) {
	  return {
	    type: LOVE_RECIPE,
	    recipe: recipe
	  };
	}

	function unloveRecipe(recipe) {
	  return {
	    type: UNLOVE_RECIPE,
	    recipe: recipe
	  };
	}

	function favoriteRecipe(recipe) {
	  return {
	    type: FAVORITE_RECIPE,
	    recipe: recipe
	  };
	}

	function unfavoriteRecipe(recipe) {
	  return {
	    type: UNFAVORITE_RECIPE,
	    recipe: recipe
	  };
	}

	function deleteRecipe(cuid) {
	  return {
	    type: DELETE_RECIPE,
	    cuid: cuid
	  };
	}

	function fetchRecipes() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes').then(function (res) {
	      dispatch(addRecipes(res.recipes));
	    });
	  };
	}

	function fetchRecipe(cuid, token) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes/' + cuid, 'get', undefined, token).then(function (res) {
	      return dispatch(addRecipe(res.recipe));
	    });
	  };
	}

	function searchRecipes(url) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)(url).then(function (res) {
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

	function updateRecipeRequest(cuid, recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes', 'put', { cuid: cuid, recipe: recipe }).then(function (res) {
	      _reactRouter.browserHistory.push('/created');
	    });
	  };
	}

	function loveRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('interactions', 'post', { recipeCuid: recipe.cuid, actionType: 'love' }).then(function (res) {
	      dispatch(loveRecipe(recipe));
	    });
	  };
	}

	function unloveRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('interactions', 'delete', { recipeCuid: recipe.cuid, actionType: 'love' }).then(function (res) {
	      dispatch(unloveRecipe(recipe));
	    });
	  };
	}

	function favoriteRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('interactions', 'post', { recipeCuid: recipe.cuid, actionType: 'favorite' }).then(function (res) {
	      dispatch(favoriteRecipe(recipe));
	    });
	  };
	}

	function unfavoriteRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('interactions', 'delete', { recipeCuid: recipe.cuid, actionType: 'favorite' }).then(function (res) {
	      dispatch(unfavoriteRecipe(recipe));
	    });
	  };
	}

	function deleteRecipeRequest(recipe) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('recipes', 'delete', { cuid: recipe.cuid }).then(function (res) {
	      dispatch(deleteRecipe(recipe.cuid));
	    });
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAllByKey = exports.getByKey = undefined;
	exports.getSession = getSession;

	var _neo4j = __webpack_require__(98);

	var _neo4j2 = _interopRequireDefault(_neo4j);

	var _neo4jDriver = __webpack_require__(113);

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

	var getByKey = exports.getByKey = function getByKey(res, key) {
	  return res.records[0].get(key);
	};

	var getAllByKey = exports.getAllByKey = function getAllByKey(res, key) {
	  return res.records.map(function (record) {
	    return record.get(key);
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_CATEGORIES = undefined;
	exports.addCategories = addCategories;
	exports.fetchCategories = fetchCategories;

	var _apiCaller = __webpack_require__(3);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCategories = undefined;

	var _CategoryActions = __webpack_require__(11);

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
/* 13 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRecipe = exports.getRecipes = undefined;

	var _RecipeActions = __webpack_require__(9);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Import Actions


	// Initial State
	var initialState = { data: [] };

	var cloneObj = function cloneObj(obj) {
	  return JSON.parse(JSON.stringify(obj));
	};

	var interactWithRecipe = function interactWithRecipe(recipes, recipe, interaction, value) {
	  var clone = cloneObj(recipes.find(function (e) {
	    return e.cuid == recipe.cuid;
	  }));
	  clone.interactions[interaction] = value;
	  return [].concat(_toConsumableArray(recipes)).map(function (r) {
	    return r.cuid == recipe.cuid ? clone : r;
	  });
	};

	var removeRecipeFromList = function removeRecipeFromList(recipes, cuid) {
	  var index = recipes.findIndex(function (r) {
	    return r.cuid === cuid;
	  });
	  return [].concat(_toConsumableArray(recipes.slice(0, index)), _toConsumableArray(recipes.slice(index + 1)));
	};

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

	    case _RecipeActions.LOVE_RECIPE:
	      return {
	        data: interactWithRecipe(state.data, action.recipe, 'love', true)
	      };

	    case _RecipeActions.UNLOVE_RECIPE:
	      return {
	        data: interactWithRecipe(state.data, action.recipe, 'love', null)
	      };

	    case _RecipeActions.FAVORITE_RECIPE:
	      return {
	        data: interactWithRecipe(state.data, action.recipe, 'favorite', true)
	      };

	    case _RecipeActions.UNFAVORITE_RECIPE:
	      return {
	        data: interactWithRecipe(state.data, action.recipe, 'favorite', null)
	      };

	    case _RecipeActions.DELETE_RECIPE:
	      return {
	        data: removeRecipeFromList(state.data, action.cuid)
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
	    return recipe ? recipe.cuid === cuid : false;
	  })[0];
	};

	exports.default = RecipeReducer;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("limax");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SubmitButtonNoValidation = exports.SubmitButton = exports.renderTextarea = exports.renderInput = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

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
	  }, void 0, label ? _jsx('div', {
	    className: _forminputs2.default['label-row']
	  }, void 0, _jsx('h2', {}, void 0, label), ' ', touched && error && _jsx('span', {
	    className: _forminputs2.default['validation-error']
	  }, void 0, error)) : null, _jsx('div', {
	    className: _forminputs2.default['input-field']
	  }, void 0, _react2.default.createElement('input', _extends({}, input, { type: type }))));
	};

	var renderTextarea = exports.renderTextarea = function renderTextarea(_ref2) {
	  var input = _ref2.input;
	  var label = _ref2.label;
	  var placeholder = _ref2.placeholder;
	  var type = _ref2.type;
	  var _ref2$meta = _ref2.meta;
	  var touched = _ref2$meta.touched;
	  var error = _ref2$meta.error;
	  return _jsx('div', {
	    className: _forminputs2.default['text-container']
	  }, void 0, label ? _jsx('div', {
	    className: _forminputs2.default['label-row']
	  }, void 0, _jsx('h2', {}, void 0, label), ' ', touched && error && _jsx('span', {
	    className: _forminputs2.default['validation-error']
	  }, void 0, error)) : null, _react2.default.createElement('textarea', _extends({}, input, { type: type, placeholder: placeholder })));
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

	var SubmitButtonNoValidation = exports.SubmitButtonNoValidation = function SubmitButtonNoValidation(_ref4) {
	  var text = _ref4.text;
	  var submit = _ref4.submit;
	  return _jsx('button', {
	    onClick: submit,
	    className: _forminputs2.default['submit-button'],
	    type: 'button'
	  }, void 0, text);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getShowAddRecipe = exports.getShowAddPost = undefined;

	var _AppActions = __webpack_require__(14);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RESET_PASSWORD_REQUEST = exports.FORGOT_PASSWORD_REQUEST = exports.AUTH_ERROR = exports.UNAUTH_USER = exports.AUTH_USER = undefined;
	exports.loginUser = loginUser;
	exports.logout = logout;
	exports.authError = authError;
	exports.loginUserRequest = loginUserRequest;
	exports.facebookLoginRequest = facebookLoginRequest;
	exports.logOutUser = logOutUser;

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	var _reactCookie = __webpack_require__(120);

	var _reactCookie2 = _interopRequireDefault(_reactCookie);

	var _reactRouterRedux = __webpack_require__(49);

	var _parseUrl = __webpack_require__(97);

	var _reactRouter = __webpack_require__(1);

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

	function logout() {
	  return {
	    type: UNAUTH_USER
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

	function logOutUser() {
	  return function (dispatch) {
	    _reactCookie2.default.remove('token');
	    dispatch(logout());
	  };
	}

/***/ },
/* 20 */
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

	var _apiCaller = __webpack_require__(3);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPost = exports.getPosts = undefined;

	var _PostActions = __webpack_require__(20);

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
/* 22 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.build = build;
	exports.jsToStringQuery = jsToStringQuery;
	exports.formatQueryArray = formatQueryArray;
	exports.queryToAffirmation = queryToAffirmation;
	var encodeCategory = exports.encodeCategory = function encodeCategory(c) {
	  return encodeURIComponent(c.replace(/\s/g, "-"));
	};
	var encodeIngredient = exports.encodeIngredient = function encodeIngredient(c) {
	  return encodeURIComponent(c.replace(/\s/g, "-"));
	};

	function build(baseUrl, fields) {
	  var title = fields.title;
	  var ingredients = fields.ingredients;
	  var categories = fields.categories;

	  categories = categories && categories.length ? categories.map(encodeCategory) : undefined;
	  ingredients = ingredients && ingredients.length ? ingredients.map(encodeIngredient) : undefined;

	  var titleQuery = title ? "title=" + title : undefined;
	  var categoriesQuery = categories && categories.length ? "categories=" + categories.join(',') : undefined;
	  var ingredientsQuery = ingredients && ingredients.length ? "ingredients=" + ingredients.join(',') : undefined;
	  //const categories = category.map( val => `category=${val}`);
	  //const ingredients = ingredient.map( val => `ingredient=${val}`);


	  var params = [titleQuery, categoriesQuery, ingredientsQuery];

	  var url = params.reduce(function (prev, current, index) {
	    if (!current) {
	      return prev;
	    }
	    return prev === baseUrl ? prev + "?" + current : prev + "&" + current;
	  }, baseUrl);

	  return url;
	}

	function jsToStringQuery(baseUrl, fields) {

	  fields.ingredients = fields.ingredients ? fields.ingredients.split(',') : undefined;
	  fields.categories = fields.categories ? fields.categories.split(',') : undefined;

	  return build(baseUrl, fields);
	}

	function formatQueryArray(fields) {

	  fields.ingredients = fields.ingredients ? fields.ingredients.split(',') : [];
	  fields.categories = fields.categories ? fields.categories.split(',') : [];

	  return fields;
	}

	function queryToAffirmation(query) {
	  if (!query.title && !query.ingredients && !query.categories) {
	    return 'showing all recipes';
	  }
	  query.ingredients = query.ingredients.constructor === Array ? query.ingredients.join(',') : query.ingredients;
	  query.categories = query.categories.constructor === Array ? query.categories.join(',') : query.categories;

	  var cat = query.categories ? query.categories.split(',').map(function (c) {
	    return " " + c + "s";
	  }).join(',') : 'recipes';
	  var ing = query.ingredients ? "containing " + query.ingredients : '';
	  var title = query.title ? "with title '" + query.title + "'" : '';
	  return "showing " + cat + " " + ing + " " + title;
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("cookies");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;

	var _reactIntl = __webpack_require__(6);

	var _intl = __webpack_require__(108);

	var _intl2 = _interopRequireDefault(_intl);

	var _intlLocalesSupported = __webpack_require__(109);

	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);

	__webpack_require__(110);

	var _en = __webpack_require__(121);

	var _en2 = _interopRequireDefault(_en);

	var _en3 = __webpack_require__(72);

	var _en4 = _interopRequireDefault(_en3);

	__webpack_require__(111);

	var _fr = __webpack_require__(122);

	var _fr2 = _interopRequireDefault(_fr);

	var _fr3 = __webpack_require__(73);

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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxDevtools = __webpack_require__(124);

	var _reduxDevtoolsLogMonitor = __webpack_require__(126);

	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

	var _reduxDevtoolsDockMonitor = __webpack_require__(125);

	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _AboutPage = {
	  "wrapper": "AboutPage__wrapper__3P-LY",
	  "pink": "AboutPage__pink__h6TcM",
	  "orange": "AboutPage__orange__Y1_ug",
	  "green": "AboutPage__green__1DP_F",
	  "turquoise": "AboutPage__turquoise__13nuC",
	  "red": "AboutPage__red__1iWx-"
	};

	var _AboutPage2 = _interopRequireDefault(_AboutPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AboutPage = function (_Component) {
	  _inherits(AboutPage, _Component);

	  function AboutPage() {
	    _classCallCheck(this, AboutPage);

	    return _possibleConstructorReturn(this, (AboutPage.__proto__ || Object.getPrototypeOf(AboutPage)).apply(this, arguments));
	  }

	  _createClass(AboutPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _AboutPage2.default.wrapper
	      }, void 0, _jsx('p', {}, void 0, _jsx('span', {
	        className: _AboutPage2.default.red
	      }, void 0, 'salash'), ' was written to index the worlds ', _jsx('span', {
	        className: _AboutPage2.default.green
	      }, void 0, 'raw food'), ' recipes in one place.'), _jsx('p', {}, void 0, 'everybody can add recipes, and ', _jsx('span', {
	        className: _AboutPage2.default.pink
	      }, void 0, '♥ vote'), ' on other users recipes'), _jsx('p', {}, void 0, _jsx('span', {
	        className: _AboutPage2.default.orange
	      }, void 0, '★ favourite'), ' recipes to add them to your ', _jsx('span', {
	        className: _AboutPage2.default.red
	      }, void 0, 'salash'), '-cookbook'), _jsx('p', {}, void 0, 'recipes with much ', _jsx('span', {
	        className: _AboutPage2.default.pink
	      }, void 0, '♥ love'), ' appear higher in search results'), _jsx('p', {}, void 0, 'if you have any suggestions or want to report a bug please contact me at ', _jsx('span', {
	        className: _AboutPage2.default.turquoise
	      }, void 0, 'daniel.bornstrand@gmail.com')));
	    }
	  }]);

	  return AboutPage;
	}(_react.Component);

	exports.default = AboutPage;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactRouter = __webpack_require__(1);

	var _limax = __webpack_require__(16);

	var _limax2 = _interopRequireDefault(_limax);

	var _RecipeQuickSearch = __webpack_require__(93);

	var _RecipeQuickSearch2 = _interopRequireDefault(_RecipeQuickSearch);

	var _Menu = __webpack_require__(78);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _StartPage = {
	  "wrapper": "StartPage__wrapper__2rkdi",
	  "search": "StartPage__search__3FlCt",
	  "menu": "StartPage__menu__22pK5",
	  "bottom": "StartPage__bottom__19oKH"
	};

	var _StartPage2 = _interopRequireDefault(_StartPage);

	var _CategoryActions = __webpack_require__(11);

	var _CategoryReducer = __webpack_require__(12);

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
	      _reactRouter.browserHistory.push('/search?categories=' + fields.category + '&ingredients=' + ingredient1 + ',' + ingredient2);
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getMessage = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _AuthActions = __webpack_require__(19);

	var initialState = {
	  error: '',
	  message: '',
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

	    case _AuthActions.UNAUTH_USER:
	      return initialState;

	    default:
	      return state;
	  }
	};

	var getMessage = exports.getMessage = function getMessage(state) {
	  return state.auth.message;
	};

	exports.default = AuthReducer;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactHelmet = __webpack_require__(8);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _AuthActions = __webpack_require__(19);

	var _loginform = __webpack_require__(81);

	var _loginform2 = _interopRequireDefault(_loginform);

	var _SocialSignInButtons = __webpack_require__(80);

	var _AuthReducer = __webpack_require__(31);

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

	var _ref5 = _jsx(_SocialSignInButtons.GoogleButton, {});

	var _ref6 = _jsx(_SocialSignInButtons.TwitterButton, {
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
	      _this.props.dispatch((0, _AuthActions.facebookLoginRequest)()).then(function () {
	        return location.reload();
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(LoginPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _LoginPage2.default.wrapper
	      }, void 0, _ref3, _jsx('div', {
	        className: _LoginPage2.default.loginwrapper
	      }, void 0, _ref4, _jsx('section', {
	        className: _LoginPage2.default.social
	      }, void 0, _jsx(_SocialSignInButtons.FacebookButton, {
	        auth: this.handleFacebookLogin
	      }), _ref5, _ref6)));
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	exports.NotFoundPage = NotFoundPage;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactHelmet = __webpack_require__(8);

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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	exports.SignupPage = SignupPage;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactHelmet = __webpack_require__(8);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

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
	      var index = input.value.findIndex(function (v) {
	        return v === option;
	      });

	      if (e.target.checked && index < 0) {
	        input.onChange(input.value.concat([e.target.value]));
	      } else {
	        var copy = [].concat(_toConsumableArray(input.value));
	        copy.splice(index, 1);
	        input.onChange(copy);
	      }
	    }
	  }, {
	    key: 'isChecked',
	    value: function isChecked(option) {
	      return ~this.props.input.value.findIndex(function (v) {
	        return v === option;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var fields = this.props.fields;

	      return _jsx('div', {
	        className: _CategorySelect2.default.categories
	      }, void 0, this.props.options.map(function (option, i) {
	        return _jsx('div', {
	          className: _CategorySelect2.default.row
	        }, i, _jsx('input', {
	          type: 'checkbox',
	          value: option,
	          checked: _this2.isChecked(option),
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.switchLanguage = switchLanguage;

	var _setup = __webpack_require__(27);

	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

	var _RecipeEditor = __webpack_require__(90);

	var _RecipeEditor2 = _interopRequireDefault(_RecipeEditor);

	var _CategorySelect = __webpack_require__(35);

	var _CategorySelect2 = _interopRequireDefault(_CategorySelect);

	var _formInputs = __webpack_require__(17);

	var _IngredientAndAmountSelect = __webpack_require__(82);

	var _IngredientAndAmountSelect2 = _interopRequireDefault(_IngredientAndAmountSelect);

	var _RecipeCreateForm = {
	  "create-form": "RecipeCreateForm__create-form__2Wj18"
	};

	var _RecipeCreateForm2 = _interopRequireDefault(_RecipeCreateForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validate = function validate(values) {
	  var errors = {};
	  if (!values.title) {
	    errors.title = 'required';
	  }
	  if (!values.categories.length) {
	    errors.categories = 'at least one category required';
	  }
	  if (!values.ingredients.length) {
	    errors.categories = 'at least one ingredient required';
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

	var _ref3 = _jsx(_reduxForm.Field, {
	  name: 'description',
	  component: _formInputs.renderTextarea,
	  placeholder: 'write a short description of the recipe',
	  label: 'Description'
	});

	var _ref4 = _jsx(_reduxForm.FieldArray, {
	  name: 'ingredients',
	  component: _IngredientAndAmountSelect2.default
	});

	var _ref5 = _jsx('label', {}, void 0, 'Instructions');

	var _ref6 = _jsx(_reduxForm.Field, {
	  name: 'instructions',
	  type: 'text',
	  component: _RecipeEditor2.default
	});

	var RecipeCreateForm = function RecipeCreateForm(_ref) {
	  var editMode = _ref.editMode;
	  var handleSubmit = _ref.handleSubmit;
	  var handleCreate = _ref.handleCreate;
	  var categories = _ref.categories;
	  var invalid = _ref.invalid;
	  var submitting = _ref.submitting;
	  var pristine = _ref.pristine;
	  return _jsx('form', {
	    onSubmit: handleSubmit(handleCreate),
	    className: _RecipeCreateForm2.default['create-form']
	  }, void 0, _ref2, _ref3, _jsx('div', {
	    className: _RecipeCreateForm2.default['text-container']
	  }, void 0, _jsx(_reduxForm.Field, {
	    name: 'categories',
	    options: categories.map(function (c) {
	      return c.name;
	    }),
	    component: _CategorySelect2.default
	  })), _ref4, _jsx('div', {
	    className: _RecipeCreateForm2.default['text-container']
	  }, void 0, _ref5, _ref6), _jsx(_formInputs.SubmitButton, {
	    text: editMode ? 'save changes' : 'add recipe',
	    disabled: { invalid: invalid, submitting: submitting, pristine: pristine }
	  }));
	};

	RecipeCreateForm = (0, _reduxForm.reduxForm)({
	  form: 'RecipeCreateForm',
	  validate: validate
	})(RecipeCreateForm);

	exports.default = RecipeCreateForm;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipeCreationPage = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _RecipeActions = __webpack_require__(9);

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	var _RecipeCreateForm = __webpack_require__(37);

	var _RecipeCreateForm2 = _interopRequireDefault(_RecipeCreateForm);

	var _RecipeCreationPage = {
	  "create": "RecipeCreationPage__create__1SvJ5"
	};

	var _RecipeCreationPage2 = _interopRequireDefault(_RecipeCreationPage);

	var _CategoryActions = __webpack_require__(11);

	var _CategoryReducer = __webpack_require__(12);

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
	    }, _this.initialValues = {
	      categories: [],
	      ingredients: [{ amount: '', name: '' }]
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
	        initialValues: this.initialValues,
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _RecipeDeletedPage = {
	  "wrapper": "RecipeDeletedPage__wrapper__1tfDZ"
	};

	var _RecipeDeletedPage2 = _interopRequireDefault(_RecipeDeletedPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx('h1', {}, void 0, 'recipe deleted');

	var _ref2 = _jsx('p', {}, void 0, 'it has been utterly destroyed');

	var _ref3 = _jsx(_reactRouter.Link, {
	  to: '/create'
	}, void 0, _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add'), ' add another one');

	var RecipeDeletedPage = function (_Component) {
	  _inherits(RecipeDeletedPage, _Component);

	  function RecipeDeletedPage() {
	    _classCallCheck(this, RecipeDeletedPage);

	    return _possibleConstructorReturn(this, (RecipeDeletedPage.__proto__ || Object.getPrototypeOf(RecipeDeletedPage)).apply(this, arguments));
	  }

	  _createClass(RecipeDeletedPage, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeDeletedPage2.default.wrapper
	      }, void 0, _ref, _ref2, _ref3);
	    }
	  }]);

	  return RecipeDeletedPage;
	}(_react.Component);

	exports.default = RecipeDeletedPage;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactRouter = __webpack_require__(1);

	var _RecipeDetailPage = {
	  "single-recipe": "RecipeDetailPage__single-recipe__9M1Qv",
	  "categories": "RecipeDetailPage__categories__11tDK",
	  "image-wrapper": "RecipeDetailPage__image-wrapper__XTHV1",
	  "int-buttons": "RecipeDetailPage__int-buttons__1Cx7M"
	};

	var _RecipeDetailPage2 = _interopRequireDefault(_RecipeDetailPage);

	var _InteractionButtons = __webpack_require__(74);

	var _RecipeActions = __webpack_require__(9);

	var _RecipeReducer = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Components


	// Import Actions


	// Import Selectors


	var _ref2 = _jsx('h1', {}, void 0, ' Recipe not found');

	var _ref3 = _jsx('h3', {}, void 0, 'Ingredients');

	var _ref4 = _jsx('h3', {}, void 0, 'Instructions');

	var RecipeDetailsPage = function (_Component) {
	  _inherits(RecipeDetailsPage, _Component);

	  function RecipeDetailsPage() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RecipeDetailsPage);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeDetailsPage.__proto__ || Object.getPrototypeOf(RecipeDetailsPage)).call.apply(_ref, [this].concat(args))), _this), _this.createMarkup = function (markup) {
	      return { __html: markup };
	    }, _this.love = function () {
	      _this.props.dispatch((0, _RecipeActions.loveRecipeRequest)(_this.props.recipe));
	    }, _this.unlove = function () {
	      _this.props.dispatch((0, _RecipeActions.unloveRecipeRequest)(_this.props.recipe));
	    }, _this.favorite = function () {
	      _this.props.dispatch((0, _RecipeActions.favoriteRecipeRequest)(_this.props.recipe));
	    }, _this.unfavorite = function () {
	      _this.props.dispatch((0, _RecipeActions.unfavoriteRecipeRequest)(_this.props.recipe));
	    }, _this.delete = function () {
	      _reactRouter.browserHistory.push('/recipes/deleted');
	      _this.props.dispatch((0, _RecipeActions.deleteRecipeRequest)(_this.props.recipe));
	    }, _this.edit = function () {
	      _reactRouter.browserHistory.push('/recipes/edit/' + _this.props.recipe.cuid);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RecipeDetailsPage, [{
	    key: 'render',
	    value: function render() {
	      var isAuthor = this.props.recipe ? this.props.recipe.author.cuid === this.props.user.cuid : undefined;
	      return _jsx('div', {}, void 0, !this.props.recipe ? _jsx('div', {
	        className: _RecipeDetailPage2.default['recipe-not-']
	      }, void 0, _ref2) : null, this.props.recipe ? _jsx('div', {
	        className: _RecipeDetailPage2.default['single-recipe']
	      }, void 0, this.props.recipe.imageUrl ? _jsx('div', {
	        className: _RecipeDetailPage2.default['image-wrapper']
	      }, void 0, _jsx('img', {
	        src: this.props.recipe.imageUrl
	      })) : null, _jsx('h1', {}, void 0, this.props.recipe.title), _jsx('div', {
	        className: _RecipeDetailPage2.default['categories']
	      }, void 0, this.props.recipe.categories.map(function (cat, i) {
	        return _jsx('span', {}, i, cat.name);
	      })), _jsx('p', {}, void 0, this.props.recipe.description), _jsx('div', {}, void 0, _ref3, _jsx('table', {}, void 0, _jsx('tbody', {}, void 0, this.props.recipe.ingredients.map(function (ing, i) {
	        return _jsx('tr', {}, i, _jsx('td', {}, void 0, ing.name), _jsx('td', {}, void 0, ing.amount));
	      })))), _ref4, _jsx('div', {
	        dangerouslySetInnerHTML: this.createMarkup(this.props.recipe.instructions)
	      }), _jsx('div', {
	        className: _RecipeDetailPage2.default['int-buttons']
	      }, void 0, _jsx(_InteractionButtons.LoveButton, {
	        loveAction: this.love,
	        unloveAction: this.unlove,
	        interactions: this.props.recipe.interactions
	      }), _jsx(_InteractionButtons.FavButton, {
	        favoriteAction: this.favorite,
	        unfavoriteAction: this.unfavorite,
	        interactions: this.props.recipe.interactions
	      })), isAuthor ? _jsx('div', {
	        className: _RecipeDetailPage2.default['int-buttons']
	      }, void 0, _jsx(_InteractionButtons.DeleteButton, {
	        deleteAction: this.delete
	      }), _jsx(_InteractionButtons.EditButton, {
	        editAction: this.edit
	      })) : null) : null);
	    }
	  }]);

	  return RecipeDetailsPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	RecipeDetailsPage.need = [function (_ref5) {
	  var params = _ref5.params;
	  var state = _ref5.state;

	  return (0, _RecipeActions.fetchRecipe)(params.cuid, state.auth.token);
	}];

	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    recipe: (0, _RecipeReducer.getRecipe)(state, props.params.cuid),
	    user: state.auth.user
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeDetailsPage);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipeEditPage = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	var _RecipeCreateForm = __webpack_require__(37);

	var _RecipeCreateForm2 = _interopRequireDefault(_RecipeCreateForm);

	var _RecipeEditPage = {
	  "create": "RecipeEditPage__create__Fz6vy"
	};

	var _RecipeEditPage2 = _interopRequireDefault(_RecipeEditPage);

	var _CategoryActions = __webpack_require__(11);

	var _RecipeActions = __webpack_require__(9);

	var _CategoryReducer = __webpack_require__(12);

	var _RecipeReducer = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Style


	// Import Actions


	// Import Selectors


	var _ref2 = _jsx('h1', {}, void 0, 'Edit recipe');

	var RecipeEditPage = exports.RecipeEditPage = function (_Component) {
	  _inherits(RecipeEditPage, _Component);

	  function RecipeEditPage() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RecipeEditPage);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeEditPage.__proto__ || Object.getPrototypeOf(RecipeEditPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleCreate = function (fields) {
	      _this.props.dispatch((0, _RecipeActions.updateRecipeRequest)(_this.props.recipe.cuid, fields));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RecipeEditPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _CategoryActions.fetchCategories)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        className: _RecipeEditPage2.default.create
	      }, void 0, _ref2, _jsx(_RecipeCreateForm2.default, {
	        editMode: 'true',
	        initialValues: this.props.recipe,
	        handleCreate: this.handleCreate,
	        categories: this.props.categories
	      }));
	    }
	  }]);

	  return RecipeEditPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	RecipeEditPage.need = [function () {
	  return (0, _CategoryActions.fetchCategories)();
	}, function (_ref3) {
	  var params = _ref3.params;
	  var state = _ref3.state;
	  return (0, _RecipeActions.fetchRecipe)(params.cuid, state.auth.token);
	}];

	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    categories: (0, _CategoryReducer.getCategories)(state),
	    recipe: (0, _RecipeReducer.getRecipe)(state, props.params.cuid)
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RecipeEditPage);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _RecipeList = __webpack_require__(91);

	var _RecipeList2 = _interopRequireDefault(_RecipeList);

	var _RecipeActions = __webpack_require__(9);

	var _AppActions = __webpack_require__(14);

	var _AppReducer = __webpack_require__(18);

	var _RecipeReducer = __webpack_require__(15);

	var _queryBuilder = __webpack_require__(22);

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
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RecipeListPage);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeListPage.__proto__ || Object.getPrototypeOf(RecipeListPage)).call.apply(_ref, [this].concat(args))), _this), _this.getAffirmation = function () {
	      return (0, _queryBuilder.queryToAffirmation)(_this.props.location.query);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RecipeListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var url = (0, _queryBuilder.jsToStringQuery)('recipes/search', this.props.location.query);
	      this.props.dispatch((0, _RecipeActions.searchRecipes)(url));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, this.props.recipes ? _jsx(_RecipeList2.default, {
	        affirmation: this.getAffirmation(),
	        recipes: this.props.recipes
	      }) : null);
	    }
	  }]);

	  return RecipeListPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	RecipeListPage.need = [function (_ref2) {
	  var query = _ref2.query;

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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactRouter = __webpack_require__(1);

	var _limax = __webpack_require__(16);

	var _limax2 = _interopRequireDefault(_limax);

	var _queryBuilder = __webpack_require__(22);

	var _RecipeSearchForm = __webpack_require__(94);

	var _RecipeSearchForm2 = _interopRequireDefault(_RecipeSearchForm);

	var _RecipeSearchPage = {
	  "wrapper": "RecipeSearchPage__wrapper__NUdjN"
	};

	var _RecipeSearchPage2 = _interopRequireDefault(_RecipeSearchPage);

	var _CategoryActions = __webpack_require__(11);

	var _CategoryReducer = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Components


	// Import Actions


	// Import Selectors


	var _ref2 = _jsx('h1', {}, void 0, 'find recipes');

	var RecipeSearchPage = function (_Component) {
	  _inherits(RecipeSearchPage, _Component);

	  function RecipeSearchPage() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RecipeSearchPage);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecipeSearchPage.__proto__ || Object.getPrototypeOf(RecipeSearchPage)).call.apply(_ref, [this].concat(args))), _this), _this.handleSearch = function (fields) {
	      _reactRouter.browserHistory.push((0, _queryBuilder.build)('search', fields));
	    }, _this.handleQuickSearch = function (fields) {
	      var ingredient1 = (0, _limax2.default)(encodeURIComponent(fields.ingredient1.replace(/\s/g, "-")));
	      var ingredient2 = (0, _limax2.default)(encodeURIComponent(fields.ingredient2.replace(/\s/g, "-")));
	      _reactRouter.browserHistory.push('/search?category=' + fields.category + '&ingredient=' + ingredient1 + '&ingredient=' + ingredient2);
	    }, _this.initialValues = {
	      categories: [],
	      ingredients: []
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
	      }, void 0, _ref2, _jsx(_RecipeSearchForm2.default, {
	        initialValues: this.initialValues,
	        categories: this.props.categories,
	        handleSearch: this.handleSearch
	      }));
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE_USER = exports.ADD_USER = undefined;
	exports.addUser = addUser;
	exports.removeUser = removeUser;
	exports.fetchUser = fetchUser;

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export Constants
	var ADD_USER = exports.ADD_USER = 'ADD_USER';
	var REMOVE_USER = exports.REMOVE_USER = 'REMOVE_USER';

	// Export Actions
	function addUser(user) {
	  return {
	    type: ADD_USER,
	    user: user
	  };
	}

	function removeUser() {
	  return {
	    type: REMOVE_USER
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getUser = undefined;

	var _UserActions = __webpack_require__(45);

	// Initial State
	var initialState = {}; // Import Actions


	var UserReducer = function UserReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _UserActions.ADD_USER:
	      return action.user;

	    case _UserActions.REMOVE_USER:
	      return initialState;

	    default:
	      return state;
	  }
	};

	var getUser = exports.getUser = function getUser(state) {
	  return state.user;
	};

	exports.default = UserReducer;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserPage = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _apiCaller = __webpack_require__(3);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	var _reactRouter = __webpack_require__(1);

	var _UserRecipes = __webpack_require__(95);

	var _UserRecipes2 = _interopRequireDefault(_UserRecipes);

	var _UserActions = __webpack_require__(45);

	var _AuthActions = __webpack_require__(19);

	var _RecipeActions = __webpack_require__(9);

	var _UserReducer = __webpack_require__(46);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Actions


	// Import Selectors


	var _ref2 = _jsx('h2', {}, void 0, 'recipes');

	var UserPage = exports.UserPage = function (_Component) {
	  _inherits(UserPage, _Component);

	  function UserPage() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, UserPage);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserPage.__proto__ || Object.getPrototypeOf(UserPage)).call.apply(_ref, [this].concat(args))), _this), _this.goToRecipe = function (cuid, slug) {
	      _this.props.dispatch((0, _RecipeActions.fetchRecipe)(cuid)).then(function () {
	        _reactRouter.browserHistory.push('/recipes/' + slug + '-' + cuid);
	      });
	    }, _this.signOut = function () {
	      _this.props.dispatch((0, _AuthActions.logOutUser)());
	      _this.props.dispatch((0, _UserActions.removeUser)());
	      _reactRouter.browserHistory.push('/');
	      location.reload();
	    }, _this.goToAbout = function () {
	      _reactRouter.browserHistory.push('/about');
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(UserPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _UserActions.fetchUser)(this.props.params.id));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {}, void 0, _jsx('h1', {}, void 0, this.props.user.username), _jsx('button', {
	        onClick: this.signOut
	      }, void 0, 'sign out'), _jsx('button', {
	        onClick: this.goToAbout
	      }, void 0, 'about salash'), _ref2, _jsx(_UserRecipes2.default, {
	        goToRecipe: this.goToRecipe,
	        user: this.props.user
	      }));
	    }
	  }]);

	  return UserPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.


	UserPage.need = [function (_ref3) {
	  var params = _ref3.params;
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isAuthenticated = isAuthenticated;
	exports.getUserFromToken = getUserFromToken;

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _cookies = __webpack_require__(23);

	var _cookies2 = _interopRequireDefault(_cookies);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAuthenticated(req, res, next) {
	  // check header or url parameters or post parameters for token
	  var token = new _cookies2.default(req, res).get('token') || req.headers.authorization;
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

	function getUserFromToken(req, res, next) {
	  // check header or url parameters or post parameters for token
	  var token = new _cookies2.default(req, res).get('token') || req.headers.authorization;
	  if (token) {
	    // verifies secret and checks exp
	    _jsonwebtoken2.default.verify(token, _config2.default.secret, function (err, decoded) {
	      if (err) {
	        next();
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.user = decoded;
	        next();
	      }
	    });
	  } else {
	    next();
	  }
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("react-router-redux");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(6);

	var _reactRedux = __webpack_require__(2);

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _App = __webpack_require__(76);

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
	  __webpack_require__(89);
	  __webpack_require__(88);
	  __webpack_require__(43);
	  __webpack_require__(44);
	  __webpack_require__(30);
	  __webpack_require__(39);
	  __webpack_require__(38);
	  __webpack_require__(40);
	  __webpack_require__(41);
	  __webpack_require__(42);
	  __webpack_require__(47);
	  __webpack_require__(32);
	  __webpack_require__(34);
	  __webpack_require__(33);
	  __webpack_require__(29);
	}

	var requireAuth = function requireAuth(nextState, replace, user) {
	  if (!user.cuid) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    });
	  }
	};

	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/

	exports.default = function (user) {
	  return _jsx(_reactRouter.Route, {
	    path: '/',
	    component: _App2.default
	  }, void 0, _jsx(_reactRouter.IndexRoute, {
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(30).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/about',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(29).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/find',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(44).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/search',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(43).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/recipes/:slug-:cuid',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(41).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/create',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(39).default);
	      }).bind(null, __webpack_require__));
	    },
	    onEnter: function onEnter(nextState, replace) {
	      return requireAuth(nextState, replace, user);
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/created',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(38).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/recipes/deleted',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(40).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/recipes/edit/:cuid',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(42).default);
	      }).bind(null, __webpack_require__));
	    },
	    onEnter: function onEnter(nextState, replace) {
	      return requireAuth(nextState, replace, user);
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/login',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(32).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/signup',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(34).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '/user/:id',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(47).default);
	      }).bind(null, __webpack_require__));
	    }
	  }), _jsx(_reactRouter.Route, {
	    path: '*',
	    getComponent: function getComponent(nextState, cb) {
	      Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	        cb(null, __webpack_require__(33).default);
	      }).bind(null, __webpack_require__));
	    }
	  }));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;

	var _redux = __webpack_require__(50);

	var _reduxThunk = __webpack_require__(127);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _DevTools = __webpack_require__(28);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _reducers = __webpack_require__(96);

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
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', function () {
	      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }

	  return store;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.profiles = undefined;
	exports.getFacebookStrategy = getFacebookStrategy;

	var _passportFacebook = __webpack_require__(114);

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _dbUtils = __webpack_require__(10);

	var _cuid = __webpack_require__(24);

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

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _auth = __webpack_require__(99);

	var AuthController = _interopRequireWildcard(_auth);

	var _passport = __webpack_require__(25);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _category = __webpack_require__(100);

	var CategoryController = _interopRequireWildcard(_category);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	// Get all Posts
	router.route('/categories').get(CategoryController.getCategories);

	exports.default = router;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _ingredient = __webpack_require__(101);

	var IngredientController = _interopRequireWildcard(_ingredient);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	// Get all Posts
	router.route('/ingredients').get(IngredientController.getIngredients);

	exports.default = router;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _authMiddleware = __webpack_require__(48);

	var _interaction = __webpack_require__(102);

	var interactionController = _interopRequireWildcard(_interaction);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/interactions').post(_authMiddleware.isAuthenticated, interactionController.createInteraction);

	router.route('/interactions').delete(_authMiddleware.isAuthenticated, interactionController.deleteInteraction);

	exports.default = router;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _recipe = __webpack_require__(103);

	var RecipeController = _interopRequireWildcard(_recipe);

	var _authMiddleware = __webpack_require__(48);

	var _dbUtils = __webpack_require__(10);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/recipes/search/').get(_authMiddleware.getUserFromToken, RecipeController.searchRecipes);

	router.route('/recipes/:cuid').get(_authMiddleware.getUserFromToken, RecipeController.getRecipe);

	router.route('/recipes').post(_authMiddleware.isAuthenticated, RecipeController.addRecipe);

	router.route('/recipes').put(_authMiddleware.isAuthenticated, RecipeController.updateRecipe);

	router.route('/recipes').delete(_authMiddleware.isAuthenticated, RecipeController.deleteRecipe);

	exports.default = router;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _user = __webpack_require__(104);

	var UserController = _interopRequireWildcard(_user);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/users/authenticate').post(UserController.validateUser);

	router.route('/users/signup').post(UserController.signupUser);

	router.route('/users/:cuid').get(UserController.getUser);

	exports.default = router;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getInitialState = getInitialState;
	exports.isAuthenticated = isAuthenticated;

	var _cookies = __webpack_require__(23);

	var _cookies2 = _interopRequireDefault(_cookies);

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getInitialState(req, res) {
	  var token = new _cookies2.default(req, res).get('token');
	  var user = void 0;
	  if (!token) {
	    return {};
	  }
	  try {
	    user = _jsonwebtoken2.default.verify(token, _config2.default.secret);
	  } catch (err) {
	    console.log(err);
	  }

	  return user && token ? { auth: { token: token, user: user } } : {};
	}

	function isAuthenticated(req, res) {
	  var token = new _cookies2.default(req, res).get('token');
	  var user = void 0;
	  try {
	    user = _jsonwebtoken2.default.verify(token, _config2.default.secret);
	  } catch (err) {}

	  return user;
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(106);

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
/* 63 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var trackingId = 'UA-83600285-2';

	var snippet = exports.snippet = '\n<script>\n  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n  })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\n  ga(\'create\', \'' + trackingId + '\', \'auto\');\n  ga(\'send\', \'pageview\');\n</script>';

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var webpack = __webpack_require__(26);
	var cssnext = __webpack_require__(115);
	var postcssFocus = __webpack_require__(116);
	var postcssReporter = __webpack_require__(117);
	var vars = __webpack_require__(118);
	var colors = __webpack_require__(75);

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
/* 65 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 72 */
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
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EditButton = exports.DeleteButton = exports.FavButton = exports.LoveButton = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _InteractionButtons = {
	  "interaction-button": "InteractionButtons__interaction-button__z7I_n",
	  "love-button-inactive": "InteractionButtons__love-button-inactive__1jpDh",
	  "love-button-active": "InteractionButtons__love-button-active__3rYXJ",
	  "favorite-button-inactive": "InteractionButtons__favorite-button-inactive__bR_cu",
	  "favorite-button-active": "InteractionButtons__favorite-button-active__3zW68",
	  "delete-button": "InteractionButtons__delete-button__2xaD_",
	  "edit-button": "InteractionButtons__edit-button__3tF1-"
	};

	var _InteractionButtons2 = _interopRequireDefault(_InteractionButtons);

	var _hovers = {
	  "hvr-btr": "hovers__hvr-btr__3rF7T",
	  "hvr-btr-fav": "hovers__hvr-btr-fav__Hcvb2",
	  "hvr-btr-love": "hovers__hvr-btr-love__3ruhf"
	};

	var _hovers2 = _interopRequireDefault(_hovers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ref2 = _jsx('span', {}, void 0, 'love');

	var LoveButton = exports.LoveButton = function LoveButton(_ref) {
	  var loveAction = _ref.loveAction;
	  var unloveAction = _ref.unloveAction;
	  var interactions = _ref.interactions;
	  return _jsx('div', {
	    onClick: function onClick() {
	      interactions.love ? unloveAction() : loveAction();
	    },
	    className: '\n      ' + _InteractionButtons2.default['interaction-button'] + '\n      ' + _InteractionButtons2.default['love-button'] + '\n      ' + (!interactions.love ? _hovers2.default['hvr-btr'] + ' ' + _hovers2.default['hvr-btr-love'] : null) + ' \n      ' + (interactions.love ? _InteractionButtons2.default['love-button-active'] : _InteractionButtons2.default['love-button-inactive'])
	  }, void 0, interactions.love, _jsx('i', {
	    className: 'material-icons'
	  }, void 0, interactions.love ? 'favorite' : 'favorite_outline'), _ref2);
	};

	var _ref4 = _jsx('span', {}, void 0, 'favorite');

	var FavButton = exports.FavButton = function FavButton(_ref3) {
	  var favoriteAction = _ref3.favoriteAction;
	  var unfavoriteAction = _ref3.unfavoriteAction;
	  var interactions = _ref3.interactions;
	  return _jsx('div', {
	    onClick: function onClick() {
	      interactions.favorite ? unfavoriteAction() : favoriteAction();
	    },
	    className: '\n      ' + _InteractionButtons2.default['interaction-button'] + '\n      ' + _InteractionButtons2.default['favorite-button'] + '\n      ' + (!interactions.favorite ? _hovers2.default['hvr-btr'] + ' ' + _hovers2.default['hvr-btr-fav'] : null) + ' \n      ' + (interactions.favorite ? _InteractionButtons2.default['favorite-button-active'] : _InteractionButtons2.default['favorite-button-inactive'])
	  }, void 0, _jsx('i', {
	    className: 'material-icons'
	  }, void 0, interactions.favorite ? 'star' : 'star_outline'), _ref4);
	};

	var _ref6 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'delete_forever');

	var _ref7 = _jsx('span', {}, void 0, 'delete');

	var DeleteButton = exports.DeleteButton = function DeleteButton(_ref5) {
	  var deleteAction = _ref5.deleteAction;
	  return _jsx('div', {
	    onClick: function onClick() {
	      return deleteAction();
	    },
	    className: _InteractionButtons2.default['interaction-button'] + ' ' + _InteractionButtons2.default['delete-button']
	  }, void 0, _ref6, _ref7);
	};

	var _ref9 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'edit');

	var _ref10 = _jsx('span', {}, void 0, 'edit');

	var EditButton = exports.EditButton = function EditButton(_ref8) {
	  var editAction = _ref8.editAction;
	  return _jsx('div', {
	    onClick: function onClick() {
	      return editAction();
	    },
	    className: _InteractionButtons2.default['interaction-button'] + ' ' + _InteractionButtons2.default['edit-button']
	  }, void 0, _ref9, _ref10);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	module.exports = {
	    ebonyclayDark: '#1e2c38',
	    ebonyclay: '#22313F',
	    ebonyclayLight: '#384552',

	    redDark: '#d85c5c',
	    red: '#F16767',
	    redLight: '#f27676',

	    turquoiseDark: '#12aebd',
	    turquoise: '#15C2D2',
	    turquoiseLight: '#2cc8d6',

	    greenDark: '#22ae74',
	    green: '#26C281',
	    greenLight: '#3bc88d',

	    orangeDark: '#e5643c',
	    orange: '#FF7043',
	    orangeLight: '#ff7e55',

	    yellowDark: '#dba148',
	    yellow: '#F4B350',
	    yellowLight: '#f5ba61',

	    pinkDark: '#d6556b',
	    pink: '#ee5f77',
	    pinkLight: '#ef6f84'
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _App = {
	  "container": "App__container__15uqt"
	};

	var _App2 = _interopRequireDefault(_App);

	var _reactHelmet = __webpack_require__(8);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _DevTools = __webpack_require__(28);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _Toolbar = __webpack_require__(79);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	var _Footer = __webpack_require__(77);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _AppActions = __webpack_require__(14);

	var _IntlActions = __webpack_require__(36);

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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	exports.Footer = Footer;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(6);

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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _Menu = {
	  "menu": "Menu__menu__xofNt",
	  "find": "Menu__find__D6NUD",
	  "create": "Menu__create__3YFJY",
	  "about": "Menu__about__6RkwW",
	  "user": "Menu__user__2wV0S"
	};

	var _Menu2 = _interopRequireDefault(_Menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ref2 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'search');

	var _ref3 = _jsx('div', {}, void 0, 'find');

	var _ref4 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add');

	var _ref5 = _jsx('div', {}, void 0, 'add');

	var _ref6 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'info_outline');

	var _ref7 = _jsx('div', {}, void 0, 'about');

	var _ref8 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'face');

	var _ref9 = _jsx('div', {}, void 0, 'you');

	var Menu = function Menu(_ref) {
	  var user = _ref.user;
	  return _jsx('div', {
	    className: _Menu2.default.menu
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/find',
	    className: _Menu2.default.find
	  }, void 0, _ref2, _ref3), _jsx(_reactRouter.Link, {
	    to: '/create',
	    className: _Menu2.default.create
	  }, void 0, _ref4, _ref5), !user || !user.cuid ? _jsx(_reactRouter.Link, {
	    to: '/about',
	    className: _Menu2.default.about
	  }, void 0, _ref6, _ref7) : null, user && user.cuid ? _jsx(_reactRouter.Link, {
	    to: '/user/' + user.cuid,
	    className: _Menu2.default.user
	  }, void 0, ' ', _ref8, ' ', _ref9, ' ') : null);
	};

	exports.default = Menu;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _Toolbar = {
	  "toolbar": "Toolbar__toolbar__2Ghil",
	  "home": "Toolbar__home__2gkkK",
	  "logo": "Toolbar__logo__l4pi1",
	  "find": "Toolbar__find__giLzi",
	  "create": "Toolbar__create__2kC_r",
	  "about": "Toolbar__about__2IgtP",
	  "user": "Toolbar__user__3ITu3"
	};

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ref2 = _jsx('h1', {}, void 0, 'salash');

	var _ref3 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'home');

	var _ref4 = _jsx('div', {}, void 0, 'home');

	var _ref5 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'search');

	var _ref6 = _jsx('div', {}, void 0, 'find');

	var _ref7 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add');

	var _ref8 = _jsx('div', {}, void 0, 'add');

	var _ref9 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'info_outline');

	var _ref10 = _jsx('div', {}, void 0, 'about');

	var _ref11 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'face');

	var _ref12 = _jsx('div', {}, void 0, 'you');

	var Toolbar = function Toolbar(_ref) {
	  var user = _ref.user;
	  return _jsx('div', {
	    className: _Toolbar2.default.toolbar
	  }, void 0, _jsx(_reactRouter.Link, {
	    to: '/',
	    className: _Toolbar2.default.logo
	  }, void 0, _ref2), _jsx(_reactRouter.Link, {
	    to: '/',
	    id: _Toolbar2.default.home
	  }, void 0, _ref3, _ref4), _jsx(_reactRouter.Link, {
	    to: '/find',
	    className: _Toolbar2.default.find
	  }, void 0, _ref5, _ref6), _jsx(_reactRouter.Link, {
	    to: '/create',
	    className: _Toolbar2.default.create
	  }, void 0, _ref7, _ref8), !user || !user.cuid ? _jsx(_reactRouter.Link, {
	    to: '/about',
	    className: _Toolbar2.default.about
	  }, void 0, _ref9, _ref10) : null, user && user.cuid ? _jsx(_reactRouter.Link, {
	    to: '/user/' + user.cuid,
	    className: _Toolbar2.default.user
	  }, void 0, ' ', _ref11, ' ', _ref12, ' ') : null);
	};

	exports.default = Toolbar;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TwitterButton = exports.GoogleButton = exports.FacebookButton = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

	var _formInputs = __webpack_require__(17);

	var _reactRouter = __webpack_require__(1);

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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

	var _IngredientAndAmountSelect = {
	  "row": "IngredientAndAmountSelect__row__3YbVk",
	  "remove": "IngredientAndAmountSelect__remove__1RYbr",
	  "title": "IngredientAndAmountSelect__title__3LboG",
	  "ingredients-list": "IngredientAndAmountSelect__ingredients-list__5-RQq",
	  "amount": "IngredientAndAmountSelect__amount__y6mPj",
	  "name": "IngredientAndAmountSelect__name__2Gksg"
	};

	var _IngredientAndAmountSelect2 = _interopRequireDefault(_IngredientAndAmountSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderField = function renderField(_ref) {
	  var className = _ref.className;
	  var input = _ref.input;
	  var label = _ref.label;
	  var type = _ref.type;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  return _jsx('div', {
	    className: _IngredientAndAmountSelect2.default.row
	  }, void 0, _jsx('div', {}, void 0, _react2.default.createElement('input', _extends({}, input, { className: className, type: type, placeholder: label })), touched && error && _jsx('span', {}, void 0, error)));
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
	    className: _IngredientAndAmountSelect2.default.container
	  }, void 0, _jsx('div', {
	    className: _IngredientAndAmountSelect2.default.title
	  }, void 0, _ref3, _jsx('a', {
	    type: 'button',
	    onClick: function onClick() {
	      return fields.push();
	    }
	  }, void 0, _ref4, 'Add')), _jsx('ul', {
	    className: _IngredientAndAmountSelect2.default['ingredients-list']
	  }, void 0, fields.map(function (field, index) {
	    return _jsx('li', {}, index, _jsx(_reduxForm.Field, {
	      name: field + '.amount',
	      type: 'text',
	      component: renderField,
	      className: _IngredientAndAmountSelect2.default.amount,
	      label: 'amount'
	    }), 'of', _jsx(_reduxForm.Field, {
	      name: field + '.name',
	      type: 'text',
	      component: renderField,
	      className: _IngredientAndAmountSelect2.default.name,
	      label: 'ingredient'
	    }), _jsx('a', {
	      className: _IngredientAndAmountSelect2.default.remove,
	      type: 'button',
	      onClick: function onClick() {
	        return fields.remove(index);
	      }
	    }, void 0, _ref5));
	  })));
	};

	exports.default = renderIngredients;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

	var _IngredientSelect = {
	  "container": "IngredientSelect__container__2X4vU",
	  "input": "IngredientSelect__input__1IO5Z",
	  "active-button": "IngredientSelect__active-button__1MC8k",
	  "chip": "IngredientSelect__chip__36qjq",
	  "chips": "IngredientSelect__chips__6vGVT"
	};

	var _IngredientSelect2 = _interopRequireDefault(_IngredientSelect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'add');

	var ingredientsSelect = function (_Component) {
	  _inherits(ingredientsSelect, _Component);

	  function ingredientsSelect(props) {
	    _classCallCheck(this, ingredientsSelect);

	    var _this = _possibleConstructorReturn(this, (ingredientsSelect.__proto__ || Object.getPrototypeOf(ingredientsSelect)).call(this, props));

	    _this.addChip = function () {
	      if (!_this.state.value || ~_this.props.input.value.indexOf(_this.state.value)) {
	        _this.setState({ value: '' });
	        return;
	      }
	      var chips = [].concat(_toConsumableArray(_this.props.input.value), [_this.state.value]);
	      _this.props.input.onChange(chips);
	      _this.setState({ value: '' });
	    };

	    _this.removeChip = function (i) {
	      var chips = [].concat(_toConsumableArray(_this.props.input.value.slice(0, i)), _toConsumableArray(_this.props.input.value.slice(i + 1)));
	      _this.props.input.onChange(chips);
	    };

	    _this.updateValue = function (evt) {
	      _this.setState({
	        value: evt.target.value.toLowerCase().replace(/[^a-z\s]/g, '')
	      });
	    };

	    _this.handleKeyPress = function (evt) {
	      if (evt.key === 'Enter') {
	        _this.addChip();
	      }
	    };

	    _this.state = {
	      //chips: [],      
	      value: ''
	    };
	    return _this;
	  }

	  _createClass(ingredientsSelect, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _jsx('div', {
	        className: _IngredientSelect2.default.container
	      }, void 0, _jsx('div', {
	        className: _IngredientSelect2.default.chips
	      }, void 0, this.props.input.value.map(function (chip, i) {
	        return _jsx('div', {
	          className: _IngredientSelect2.default.chip
	        }, i, _jsx('span', {}, void 0, chip), _jsx('i', {
	          onClick: function onClick() {
	            return _this2.removeChip(i);
	          },
	          className: 'material-icons'
	        }, void 0, 'clear'));
	      })), _jsx('div', {
	        className: _IngredientSelect2.default.input
	      }, void 0, _jsx('input', {
	        value: this.state.value,
	        onKeyPress: this.handleKeyPress,
	        onChange: this.updateValue,
	        type: 'text'
	      }), _jsx('button', {
	        type: 'button',
	        className: this.state.value ? _IngredientSelect2.default['active-button'] : '',
	        onClick: this.addChip
	      }, void 0, _ref)));
	    }
	  }]);

	  return ingredientsSelect;
	}(_react.Component);

	exports.default = ingredientsSelect;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _setup = __webpack_require__(27);

	var _IntlActions = __webpack_require__(36);

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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostCreateWidget = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(6);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Components


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _PostListItem = __webpack_require__(87);

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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _reactIntl = __webpack_require__(6);

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
/* 88 */
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

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _reactHelmet = __webpack_require__(8);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _reactIntl = __webpack_require__(6);

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

	var _PostActions = __webpack_require__(20);

	var _PostReducer = __webpack_require__(21);

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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(2);

	var _PostList = __webpack_require__(86);

	var _PostList2 = _interopRequireDefault(_PostList);

	var _PostCreateWidget = __webpack_require__(85);

	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);

	var _PostActions = __webpack_require__(20);

	var _AppActions = __webpack_require__(14);

	var _AppReducer = __webpack_require__(18);

	var _PostReducer = __webpack_require__(21);

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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _RecipeEditor = {
	  "editor": "RecipeEditor__editor__3R0qn"
	};

	var _RecipeEditor2 = _interopRequireDefault(_RecipeEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RichTextEditor = void 0,
	    RichTextEditorDefault = void 0;

	var RecipeEditor = function (_Component) {
	  _inherits(RecipeEditor, _Component);

	  function RecipeEditor() {
	    _classCallCheck(this, RecipeEditor);

	    var _this = _possibleConstructorReturn(this, (RecipeEditor.__proto__ || Object.getPrototypeOf(RecipeEditor)).call(this));

	    _this.onChange = function (value) {
	      _this.setState({ value: value });
	      if (_this.props.input.onChange) {
	        // Send the changes up to the parent component as an HTML string.
	        // This is here to demonstrate using `.toString()` but in a real app it
	        // would be better to avoid generating a string on each change.
	        _this.props.input.onChange(value.toString('html'));
	      }
	    };

	    _this.state = {
	      shouldRender: false,
	      value: {}
	    };
	    return _this;
	  }

	  /*state = {
	    value: RichTextEditor.createEmptyValue(),
	    shouldRender: false
	  }*/

	  _createClass(RecipeEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      RichTextEditor = __webpack_require__(123);
	      RichTextEditorDefault = RichTextEditor.default;
	      this.state.value = this.props.input.value ? RichTextEditor.createValueFromString(this.props.input.value, 'html') : RichTextEditor.createEmptyValue();
	      this.setState({ shouldRender: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var toolbarConfig = {
	        // Optionally specify the groups to display (displayed in the order listed).
	        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
	        INLINE_STYLE_BUTTONS: [{ label: 'Bold', style: 'BOLD', className: 'custom-css-class' }, { label: 'Italic', style: 'ITALIC' }, { label: 'Underline', style: 'UNDERLINE' }],
	        BLOCK_TYPE_DROPDOWN: [{ label: 'Normal', style: 'unstyled' }, { label: 'Heading Large', style: 'header-one' }, { label: 'Heading Medium', style: 'header-two' }, { label: 'Heading Small', style: 'header-three' }],
	        BLOCK_TYPE_BUTTONS: [{ label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }]
	      };
	      if (this.state.shouldRender) {
	        return _jsx(RichTextEditorDefault, {
	          className: _RecipeEditor2.default.editor,
	          value: this.state.value,
	          onChange: this.onChange,
	          toolbarConfig: toolbarConfig
	        });
	      } else {
	        return null;
	      }
	    }
	  }]);

	  return RecipeEditor;
	}(_react.Component);

	exports.default = RecipeEditor;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Components


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _RecipeListItem = __webpack_require__(92);

	var _RecipeListItem2 = _interopRequireDefault(_RecipeListItem);

	var _RecipeList = {
	  "recipelist": "RecipeList__recipelist__3nQUW",
	  "meta": "RecipeList__meta__3aiQw",
	  "affirmation": "RecipeList__affirmation__389fB",
	  "optionbar": "RecipeList__optionbar__3UrvU"
	};

	var _RecipeList2 = _interopRequireDefault(_RecipeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function RecipeList(props) {
	  return _jsx('div', {
	    className: _RecipeList2.default.recipelist
	  }, void 0, _jsx('div', {
	    className: _RecipeList2.default.meta
	  }, void 0, _jsx('div', {
	    className: _RecipeList2.default.affirmation
	  }, void 0, props.affirmation)), props.recipes.map(function (recipe, index) {
	    return _jsx(_RecipeListItem2.default, {
	      recipe: recipe
	    }, index);
	  }));
	}

	exports.default = RecipeList;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	var _reactIntl = __webpack_require__(6);

	var _RecipeListItem = {
	  "single-recipe": "RecipeListItem__single-recipe__27mt6",
	  "title": "RecipeListItem__title__1gAKc",
	  "desc": "RecipeListItem__desc__3FzGY",
	  "divider": "RecipeListItem__divider__2DPWN",
	  "label": "RecipeListItem__label__3AWhx",
	  "ingredient": "RecipeListItem__ingredient__3o2th",
	  "category": "RecipeListItem__category__hIL1P",
	  "text-wrapper": "RecipeListItem__text-wrapper__1gpZ6",
	  "image-wrapper": "RecipeListItem__image-wrapper__2pUh6",
	  "love-rating": "RecipeListItem__love-rating__3Jumx"
	};

	var _RecipeListItem2 = _interopRequireDefault(_RecipeListItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ref2 = _jsx('i', {
	  className: 'material-icons'
	}, void 0, 'favorite');

	function RecipeListItem(_ref) {
	  var recipe = _ref.recipe;

	  return _jsx('div', {
	    className: _RecipeListItem2.default['single-recipe']
	  }, void 0, _jsx('div', {
	    className: _RecipeListItem2.default['love-rating']
	  }, void 0, _ref2, _jsx('span', {}, void 0, recipe.loves.low)), _jsx('div', {
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
	    }, i, cat.name);
	  })), _jsx('div', {
	    className: _RecipeListItem2.default.ingredients
	  }, void 0, _jsx('span', {
	    className: _RecipeListItem2.default.label
	  }, void 0, 'Ingredients:'), recipe.ingredients.map(function (ing, i) {
	    return _jsx('span', {
	      className: _RecipeListItem2.default.ingredient
	    }, i, ing.name);
	  })), _jsx('p', {
	    className: _RecipeListItem2.default.desc
	  }, void 0, recipe.description)));
	}

	exports.default = RecipeListItem;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

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
	    }, i, category.name + 's');
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(7);

	var _formInputs = __webpack_require__(17);

	var _CategorySelect = __webpack_require__(35);

	var _CategorySelect2 = _interopRequireDefault(_CategorySelect);

	var _IngredientSelect = __webpack_require__(83);

	var _IngredientSelect2 = _interopRequireDefault(_IngredientSelect);

	var _RecipeSearchForm = {
	  "search-form": "RecipeSearchForm__search-form__2k_6H",
	  "submitbutton": "RecipeSearchForm__submitbutton__2S5ZS"
	};

	var _RecipeSearchForm2 = _interopRequireDefault(_RecipeSearchForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validate = function validate(values) {
	  var errors = {};
	};

	var _ref2 = _jsx('div', {}, void 0, _jsx(_reduxForm.Field, {
	  name: 'title',
	  icon: 'fa-pencil-square-o',
	  component: _formInputs.renderInput,
	  type: 'text',
	  label: 'Title'
	}));

	var _ref3 = _jsx('h2', {}, void 0, 'categories');

	var _ref4 = _jsx('div', {}, void 0, _jsx('h2', {}, void 0, 'ingredients'), _jsx(_reduxForm.Field, {
	  name: 'ingredients',
	  component: _IngredientSelect2.default
	}));

	var RecipeSearchForm = function RecipeSearchForm(_ref) {
	  var handleSubmit = _ref.handleSubmit;
	  var handleSearch = _ref.handleSearch;
	  var categories = _ref.categories;
	  var invalid = _ref.invalid;
	  var submitting = _ref.submitting;
	  var pristine = _ref.pristine;
	  return _jsx('form', {
	    className: _RecipeSearchForm2.default['search-form']
	  }, void 0, _ref2, _jsx('div', {}, void 0, _ref3, _jsx(_reduxForm.Field, {
	    name: 'categories',
	    options: categories.map(function (c) {
	      return c.name;
	    }),
	    component: _CategorySelect2.default
	  })), _ref4, _jsx('div', {
	    className: _RecipeSearchForm2.default.submitbutton
	  }, void 0, _jsx(_formInputs.SubmitButtonNoValidation, {
	    submit: handleSubmit(handleSearch),
	    text: 'find recipes'
	  })));
	};

	RecipeSearchForm = (0, _reduxForm.reduxForm)({
	  form: 'RecipeSearchForm'
	})(RecipeSearchForm);

	exports.default = RecipeSearchForm;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var user = _ref.user;
	  var goToRecipe = _ref.goToRecipe;
	  return _jsx('div', {}, void 0, user.recipes && !user.recipes.length ? _jsx('span', {}, void 0, user.username, 'has no recipes :(') : null, user.recipes && user.recipes.map(function (recipe, index) {
	    return _jsx('div', {}, index, _jsx('span', {
	      onClick: function onClick() {
	        return goToRecipe(recipe.cuid, recipe.slug);
	      }
	    }, void 0, '♥', recipe.loves.low, ' ', recipe.title));
	  }));
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(50);

	var _AppReducer = __webpack_require__(18);

	var _AppReducer2 = _interopRequireDefault(_AppReducer);

	var _PostReducer = __webpack_require__(21);

	var _PostReducer2 = _interopRequireDefault(_PostReducer);

	var _RecipeReducer = __webpack_require__(15);

	var _RecipeReducer2 = _interopRequireDefault(_RecipeReducer);

	var _CategoryReducer = __webpack_require__(12);

	var _CategoryReducer2 = _interopRequireDefault(_CategoryReducer);

	var _IntlReducer = __webpack_require__(84);

	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);

	var _AuthReducer = __webpack_require__(31);

	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

	var _UserReducer = __webpack_require__(46);

	var _UserReducer2 = _interopRequireDefault(_UserReducer);

	var _reactRouterRedux = __webpack_require__(49);

	var _reduxForm = __webpack_require__(7);

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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeTokenKeys = normalizeTokenKeys;
	exports.getAllParams = getAllParams;
	exports.default = getRedirectInfo;

	var _querystring = __webpack_require__(119);

	var _querystring2 = _interopRequireDefault(_querystring);

	var _extend = __webpack_require__(107);

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
/* 98 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  USERNAME: process.env.GRAPHENEDB_BOLT_USER || 'neo4j',
	  PASSWORD: process.env.GRAPHENEDB_BOLT_PASSWORD || 'temp123',
	  URL_LOCAL: process.env.GRAPHENEDB_BOLT_URL || 'bolt://localhost'
	};

	exports.default = config;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unwrapToken = unwrapToken;

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _cookies = __webpack_require__(23);

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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCategories = getCategories;

	var _dbUtils = __webpack_require__(10);

	var formatCategories = function formatCategories(records) {
	  return records.map(function (record) {
	    return record.get('category').properties;
	  });
	};

	/**
	 * Get all Categories
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getCategories(req, res) {
	  (0, _dbUtils.getSession)(req).run('\n      MATCH (category:Category) RETURN category\n    ').then(function (response) {
	    return res.json({ categories: formatCategories(response.records) });
	  });
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIngredients = getIngredients;

	var _cuid = __webpack_require__(24);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _limax = __webpack_require__(16);

	var _limax2 = _interopRequireDefault(_limax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Get all ingredients
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getIngredients(req, res) {}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createInteraction = createInteraction;
	exports.deleteInteraction = deleteInteraction;

	var _dbUtils = __webpack_require__(10);

	var isAllowedType = function isAllowedType(actionType) {
	  var allowedTypes = ['love', 'favorite'];
	  return allowedTypes.indexOf(actionType) !== -1;
	};

	function createInteraction(req, res) {
	  if (!req.user || !req.user.cuid) {
	    return res.status(401).end();
	  }

	  if (!req.body.recipeCuid || !req.body.actionType || !isAllowedType(req.body.actionType)) {
	    return res.status(400).end();
	  }

	  var params = {
	    userCuid: req.user.cuid,
	    recipeCuid: req.body.recipeCuid
	  };
	  (0, _dbUtils.getSession)(req).run('\n    MATCH (user:User {cuid: { userCuid }}), (recipe:Recipe {cuid: { recipeCuid }})\n    MERGE (user)-[action:REACTS]->(recipe)\n    SET action.' + req.body.actionType + ' = true\n    RETURN action\n  ', params).then(function (result) {
	    return res.json({ interactions: result.records[0].get('action').properties });
	  });
	}

	function deleteInteraction(req, res) {
	  if (!req.user || !req.user.cuid) {
	    return res.status(401).end();
	  }

	  if (!req.body.recipeCuid || !req.body.actionType || !isAllowedType(req.body.actionType)) {
	    return res.status(400).end();
	  }

	  var params = {
	    userCuid: req.user.cuid,
	    recipeCuid: req.body.recipeCuid
	  };
	  (0, _dbUtils.getSession)(req).run('\n    OPTIONAL MATCH (:User {cuid: { userCuid }})-[action:REACTS]->(:Recipe {cuid: { recipeCuid }})\n    WITH action, CASE WHEN action IS NULL THEN [] ELSE [1] END AS array\n    FOREACH (x IN array |\n      REMOVE action.' + req.body.actionType + '\n    )\n    RETURN action\n  ', params).then(function (result) {
	    return res.json({ interactions: result.records[0].get('action').properties });
	  });
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getRecipe = getRecipe;
	exports.searchRecipes = searchRecipes;
	exports.addRecipe = addRecipe;
	exports.updateRecipe = updateRecipe;
	exports.deleteRecipe = deleteRecipe;

	var _cuid = __webpack_require__(24);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _limax = __webpack_require__(16);

	var _limax2 = _interopRequireDefault(_limax);

	var _sanitizeHtml = __webpack_require__(128);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	var _dbUtils = __webpack_require__(10);

	var _queryBuilder = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var formatRecipeResponse = function formatRecipeResponse(record) {
	  return _extends({}, record.get('recipe').properties, {
	    ingredients: record.get('ingredients'),
	    categories: record.get('categories'),
	    author: record.get('author'),
	    interactions: record.get('interactions'),
	    loves: record.get('loves')
	  });
	};

	/**
	 * Get a single recipes
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getRecipe(req, res) {
	  var params = {
	    recipeCuid: req.params.cuid,
	    beholderCuid: req.user ? req.user.cuid : null
	  };
	  (0, _dbUtils.getSession)(req).run('\n    MATCH (recipe:Recipe {cuid: {recipeCuid}})\n    WITH recipe\n    MATCH (recipe)-[:IS]->(c:Category)\n    WITH recipe, COLLECT({name: c.name}) as categories\n    MATCH (recipe)-[a:CONTAINS]->(i:Ingredient)\n    WITH recipe, categories, COLLECT({name: i.name, amount: a.amount}) as ingredients\n    OPTIONAL MATCH (recipe)<-[reactions:REACTS {love: true}]-(:User)    \n    OPTIONAL MATCH (recipe)<-[:AUTHORED]-(u:User)\n    OPTIONAL MATCH (recipe)<-[reaction:REACTS]-(beholder:User {cuid: {beholderCuid}})\n    RETURN recipe,\n    {username: u.username, cuid: u.cuid} AS author,\n    COUNT(reactions) AS loves,\n    {love: reaction.love, favorite: reaction.favorite} AS interactions,\n    ingredients,\n    categories\n  ', params).then(function (results) {
	    return res.json({ recipe: results.records.map(formatRecipeResponse)[0] });
	  });
	}

	function searchRecipes(req, res) {
	  var formattedQuery = (0, _queryBuilder.formatQueryArray)(req.query);
	  var params = _extends({}, formattedQuery, {
	    beholderCuid: req.user ? req.user.cuid : null
	  });
	  console.log(params);
	  (0, _dbUtils.getSession)(req).run('\n    MATCH (cat:Category) \n    WHERE cat.name IN {categories}\n    WITH COLLECT(cat) as desiredCategories\n    OPTIONAL MATCH (i:Ingredient)\n    WHERE i.name IN {ingredients}\n    WITH desiredCategories, COLLECT(i) as desiredIngredients\n    MATCH (recipe:Recipe)\n    WHERE ALL(\n      category IN desiredCategories\n      WHERE (recipe)-[:IS]->(category)\n    )\n    AND ALL(\n      ingredient IN desiredIngredients\n      WHERE (recipe)-[:CONTAINS]->(ingredient)\n    )\n    WITH recipe\n    MATCH (recipe)-[:IS]->(c:Category)\n    WITH recipe, COLLECT({name: c.name}) as categories\n    MATCH (recipe)-[a:CONTAINS]->(i:Ingredient)\n    WITH recipe, categories, COLLECT({name: i.name, amount: a.amount}) as ingredients\n    OPTIONAL MATCH (recipe)<-[reactions:REACTS {love: true}]-(:User)\n    OPTIONAL MATCH (recipe)<-[:AUTHORED]-(u:User)\n    OPTIONAL MATCH (recipe)<-[reaction:REACTS]-(beholder:User {cuid: {beholderCuid}})\n    RETURN recipe,\n    {username: u.username, cuid: u.cuid} AS author,\n    COUNT(reactions) AS loves,\n    {love: reaction.love, favorite: reaction.favorite} AS interactions,\n    ingredients,\n    categories\n    ORDER BY loves DESC\n    LIMIT 15\n  ', params).then(function (results) {
	    return res.json({ recipes: results.records.map(formatRecipeResponse) });
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

	  var instructionsHtmlConfig = {
	    allowedTags: _sanitizeHtml2.default.defaults.allowedTags.concat(['h1', 'h2'])
	  };

	  var params = {
	    title: (0, _sanitizeHtml2.default)(recipe.title),
	    description: (0, _sanitizeHtml2.default)(recipe.description),
	    instructions: (0, _sanitizeHtml2.default)(recipe.instructions, instructionsHtmlConfig),
	    slug: (0, _limax2.default)(recipe.title.toLowerCase(), { lowercase: true }),
	    cuid: (0, _cuid2.default)()
	  };

	  var ingredientsQuery = recipe.ingredients.map(function (ingredient, index) {
	    return '\n    MERGE (i' + index + ':Ingredient { name:\'' + ingredient.name.toLowerCase() + '\'})\n    MERGE (recipe)-[:CONTAINS {amount: \'' + ingredient.amount + '\'}]->(i' + index + ')\n  ';
	  }).join('\n');

	  var categoriesQuery = recipe.categories.map(function (category, index) {
	    return '\n    MERGE (c' + index + ':Category { name:\'' + category.name.toLowerCase() + '\'})\n    MERGE (recipe)-[:IS]->(c' + index + ')\n  ';
	  }).join('\n');

	  (0, _dbUtils.getSession)(req).run('\n    MATCH (user:User {cuid: \'' + req.user.cuid + '\'})\n    CREATE\n      (recipe:Recipe {\n        title: {title},\n        description: {description},\n        instructions: {instructions},\n        slug: {slug},\n        cuid: {cuid}\n      }),\n      (user)-[:AUTHORED]->(recipe)\n    ' + ingredientsQuery + '\n    ' + categoriesQuery + '\n  ', params).then(function (results) {
	    return res.json({ recipe: results });
	  });
	}

	function updateRecipe(req, res) {
	  if (!req.user || !req.user.cuid) {
	    return res.status(401).end();
	  }

	  var recipe = req.body.recipe;
	  var recipeCuid = req.body.cuid;

	  if (!recipe.title || !recipe.ingredients && recipe.ingredients.length || !recipe.categories && recipe.categories.length) {
	    return res.status(403).end();
	  }

	  var instructionsHtmlConfig = {
	    allowedTags: _sanitizeHtml2.default.defaults.allowedTags.concat(['h1', 'h2'])
	  };

	  var params = {
	    recipeCuid: recipeCuid,
	    title: (0, _sanitizeHtml2.default)(recipe.title),
	    ingredients: recipe.ingredients.map(function (i) {
	      return { amount: i.amount, name: i.name.toLowerCase().trim() };
	    }),
	    categories: recipe.categories,
	    description: (0, _sanitizeHtml2.default)(recipe.description),
	    instructions: (0, _sanitizeHtml2.default)(recipe.instructions, instructionsHtmlConfig),
	    slug: (0, _limax2.default)(recipe.title.toLowerCase(), { lowercase: true })
	  };

	  var findAuthorQuery = '\n    MATCH (recipe:Recipe {cuid: {recipeCuid}})<-[:AUTHORED]-(u:User)\n    RETURN {cuid: u.cuid} AS author\n  ';

	  var updateRecipeQuery = '\n    MATCH (recipe:Recipe {cuid: {recipeCuid}})\n      SET recipe.title = {title}\n      SET recipe.description = {description}\n      SET recipe.instructions = {instructions}\n    WITH recipe\n    MATCH (recipe)-[rel]-(n)\n    WHERE n:Category OR n:Ingredient\n    DELETE rel\n    FOREACH (i IN {ingredients}| \n      MERGE (ing:Ingredient {name: i.name})\n      MERGE (recipe)-[:CONTAINS {amount: i.amount}]->(ing)\n    )\n    FOREACH (c IN {categories}| \n      MERGE (cat:Category {name: c.name})\n      MERGE (recipe)-[:IS]->(cat)\n    )\n  ';

	  (0, _dbUtils.getSession)(req).run(findAuthorQuery, { recipeCuid: recipeCuid }).then(function (results) {
	    if ((0, _dbUtils.getByKey)(results, 'author').cuid !== req.user.cuid) {
	      return res.status(401).end();
	    }
	    return (0, _dbUtils.getSession)(req).run(updateRecipeQuery, params);
	  }).catch(function (err) {
	    return console.log(err);
	  }).then(function () {
	    return res.json({ message: 'recipe update successful' });
	  });
	}

	function deleteRecipe(req, res) {
	  if (!req.user || !req.user.cuid) {
	    return res.status(401).end();
	  }

	  var findAuthorQuery = '\n    MATCH (recipe:Recipe {cuid: {recipeCuid}})<-[:AUTHORED]-(u:User)\n    RETURN {cuid: u.cuid} AS author\n  ';

	  var deleteRecipeQuery = '\n    MATCH (recipe:Recipe {cuid: {recipeCuid}})\n    OPTIONAL MATCH (recipe)-[r]-()\n    DELETE recipe, r\n  ';

	  var recipeCuid = req.body.cuid;

	  (0, _dbUtils.getSession)(req).run(findAuthorQuery, { recipeCuid: recipeCuid }).then(function (results) {
	    if ((0, _dbUtils.getByKey)(results, 'author').cuid !== req.user.cuid) {
	      return res.status(401).end();
	    }
	    return (0, _dbUtils.getSession)(req).run(deleteRecipeQuery, { recipeCuid: recipeCuid });
	  }).then(function () {
	    return res.json({ message: 'recipe remove successful' });
	  });
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.getUser = getUser;
	exports.validateUser = validateUser;
	exports.signupUser = signupUser;

	var _jsonwebtoken = __webpack_require__(13);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _dbUtils = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getUserToSign = function getUserToSign(_ref) {
	  var _id = _ref._id;
	  var email = _ref.email;
	  var username = _ref.username;
	  var recipes = _ref.recipes;
	  return { _id: _id, email: email, username: username, recipes: recipes };
	};

	//const formatUser = records => records.map(record => record.get('user').properties)[0];

	var formatUser = function formatUser(records) {
	  return _extends({}, records[0].get('user').properties, {
	    recipes: records.map(function (record) {
	      return record.get('recipe');
	    })
	  });
	};

	function getUser(req, res) {

	  var params = {
	    cuid: req.params.cuid
	  };
	  (0, _dbUtils.getSession)(req).run('\n    MATCH (user:User {cuid: {cuid}})\n    WITH user\n    OPTIONAL MATCH (user)-[:AUTHORED]->(recipe:Recipe)\n    WITH recipe, user\n    OPTIONAL MATCH (recipe)<-[reaction:REACTS {love: true}]-()\n    RETURN DISTINCT user,\n    {title: recipe.title, slug: recipe.slug, cuid: recipe.cuid, loves: COUNT(reaction)} AS recipe\n  ', params).then(function (response) {
	    return res.json({ user: formatUser(response.records) });
	  });
	}

	function validateUser(req, res) {
	  /*const findUserCallback = (err, user) => {
	    if (err){ throw err; }
	      if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {
	      user.validPassword(req.body.password, (err, isValid) => {
	        if(!isValid){
	          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	        } else {
	          const formattedUser = getUserToSign(user);
	          var token = jwt.sign(formattedUser, config.secret, {
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
	  }
	  User.findOne({ email: req.body.email }).select('+password').exec(findUserCallback);*/
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
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _express = __webpack_require__(5);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(66);

	var _compression2 = _interopRequireDefault(_compression);

	var _bodyParser = __webpack_require__(65);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _morgan = __webpack_require__(67);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _path = __webpack_require__(68);

	var _path2 = _interopRequireDefault(_path);

	var _IntlWrapper = __webpack_require__(51);

	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);

	var _passport = __webpack_require__(25);

	var _passport2 = _interopRequireDefault(_passport);

	var _auth = __webpack_require__(54);

	var _googleAnalytics = __webpack_require__(63);

	var _webpack = __webpack_require__(26);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackConfig = __webpack_require__(64);

	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

	var _webpackDevMiddleware = __webpack_require__(70);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(71);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _store = __webpack_require__(53);

	var _reactRedux = __webpack_require__(2);

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(69);

	var _reactRouter = __webpack_require__(1);

	var _reactHelmet = __webpack_require__(8);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _routes = __webpack_require__(52);

	var _routes2 = _interopRequireDefault(_routes);

	var _fetchData = __webpack_require__(62);

	var _recipe = __webpack_require__(59);

	var _recipe2 = _interopRequireDefault(_recipe);

	var _ingredient = __webpack_require__(57);

	var _ingredient2 = _interopRequireDefault(_ingredient);

	var _category = __webpack_require__(56);

	var _category2 = _interopRequireDefault(_category);

	var _auth2 = __webpack_require__(55);

	var _auth3 = _interopRequireDefault(_auth2);

	var _user = __webpack_require__(60);

	var _user2 = _interopRequireDefault(_user);

	var _interaction = __webpack_require__(58);

	var _interaction2 = _interopRequireDefault(_interaction);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _authUtils = __webpack_require__(61);

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


	app.set('superSecret', 'celestialPisslord');

	_passport2.default.use((0, _auth.getFacebookStrategy)());

	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_passport2.default.initialize());

	app.use('/api', _recipe2.default);
	app.use('/api', _ingredient2.default);
	app.use('/api', _category2.default);
	app.use('/api', _user2.default);
	app.use('/api', _auth3.default);
	app.use('/api', _interaction2.default);

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
/* 106 */
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
/* 107 */
/***/ function(module, exports) {

	module.exports = require("extend");

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 110 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = require("neo4j-driver");

/***/ },
/* 114 */
/***/ function(module, exports) {

	module.exports = require("passport-facebook");

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = require("postcss-simple-vars");

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = require("react-cookie");

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = require("react-rte");

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 127 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ }
/******/ ]);
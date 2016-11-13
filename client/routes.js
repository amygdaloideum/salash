/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
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
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Recipe/pages/RecipeListPage/RecipeListPage');
  require('./modules/Recipe/pages/RecipeSearchPage/RecipeSearchPage');
  require('./modules/App/pages/StartPage/StartPage');
  require('./modules/Recipe/pages/RecipeCreationPage/RecipeCreationPage');
  require('./modules/Recipe/pages/RecipeCreatedPage/RecipeCreatedPage');
  require('./modules/Recipe/pages/RecipeDetailPage/RecipeDetailPage');
  require('./modules/User/pages/UserPage');
  require('./modules/Auth/pages/LoginPage/LoginPage');
  require('./modules/Auth/pages/SignupPage/SignupPage');
  require('./modules/Auth/pages/NotFoundPage/NotFoundPage');
}

const requireAuth = (nextState, replace, auth) => {
  if (!auth) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default auth => (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/App/pages/StartPage/StartPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      path="/posts"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/search"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Recipe/pages/RecipeListPage/RecipeListPage').default);
        });
      }}
    />
    <Route
      path="/recipes/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Recipe/pages/RecipeDetailPage/RecipeDetailPage').default);
        });
      }}
    />
    <Route
      path="/create"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Recipe/pages/RecipeCreationPage/RecipeCreationPage').default);
        });
      }}
      onEnter={(nextState, replace) => requireAuth(nextState, replace, auth)}
    />
    <Route
      path="/created"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Recipe/pages/RecipeCreatedPage/RecipeCreatedPage').default);
        });
      }}
      onEnter={(nextState, replace) => requireAuth(nextState, replace, auth)}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/LoginPage/LoginPage').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/SignupPage/SignupPage').default);
        });
      }}
    />
    <Route
      path="/user/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/UserPage').default);
        });
      }}
    />
    <Route
      path="*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/NotFoundPage/NotFoundPage').default);
        });
      }}
    />
  </Route>
);

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import passport from 'passport';
import { getFacebookStrategy } from './config/auth';
import { snippet as googleAnalytics } from './util/googleAnalytics';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import recipes from './routes/recipe.routes';
import ingredients from './routes/ingredient.routes';
import categories from './routes/category.routes';
import auth from './routes/auth.routes';
import users from './routes/user.routes';
import interactions from './routes/interaction.routes'
import dummyData from './dummyData';
import serverConfig from './config/config'
import { getInitialState, isAuthenticated } from './util/authUtils';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

app.set('superSecret', 'celestialPisslord');

passport.use(getFacebookStrategy());

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(morgan('dev'));
app.use(passport.initialize());

app.use('/api', posts);
app.use('/api', recipes);
app.use('/api', ingredients);
app.use('/api', categories);
app.use('/api', users);
app.use('/api', auth);
app.use('/api', interactions);



// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
  <!doctype html>
  <html>
  <head>
  ${head.base.toString()}
  ${head.title.toString()}
  ${head.meta.toString()}
  ${head.link.toString()}
  ${head.script.toString()}

  ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
  <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,900" rel="stylesheet">
  <link rel="shortcut icon" href="https://s14.postimg.org/ktgi8n2u9/salash_favicon.png" type="image/png" />
  ${process.env.NODE_ENV === 'production' ? googleAnalytics : ''}
  </head>
  <body>
  <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
  <script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  ${process.env.NODE_ENV === 'production' ?
      `//<![CDATA[
    window.webpackManifest = ${JSON.stringify(chunkManifest)};
    //]]>` : ''}
    </script>
    <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
    <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
    </body>
    </html>
    `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes: routes(isAuthenticated(req, res)), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore(getInitialState(req, res));

    return fetchComponentData(store, renderProps.components, renderProps.params, renderProps.location.query)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

export default app;

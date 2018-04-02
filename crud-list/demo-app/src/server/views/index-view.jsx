//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from 'electrode-redux-router-engine';
import { routes } from '../../client/routes';
import { retreiveInvoices } from '../../client/actions/invoice.creators';
import Promise from 'bluebird';

import configureStore from '../configureStore';

function createReduxStore(req, match) { // eslint-disable-line
  const initialState = {
    app: {
      data: {
        invoices: [],
        invoices_meta: {}
      }
    }
  };

  const store = configureStore(initialState);

  return Promise.all([
    store.dispatch(retreiveInvoices()).then(() => store)
  ]).then(() => {
    return store;
  });
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};

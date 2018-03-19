import React from 'react';
import { Route } from 'react-router';
import Home from './components/home';
import InvoiceEditContainer from './components/invoice-create';

export const routes = (
  <Route path="/">
      <Route path="/invoices" component={Home} />
      <Route path="/invoices/new" component={InvoiceEditContainer} />
  </Route>
);


    // <Route path="/invoices/:id/edit" component={PostEditContainer} />
    // <Route path="/invoices/:id" component={PostViewContainer} />

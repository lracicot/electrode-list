import React from 'react';
import { Route } from 'react-router';
import Home from './components/home';
import InvoiceCreateContainer from './components/invoice-create';

export const routes = (
  <Route path="/">
      <Route path="/invoices" component={Home} />
      <Route path="/invoices/new" component={InvoiceCreateContainer} />
  </Route>
);


    // <Route path="/invoices/:id/edit" component={PostEditContainer} />
    // <Route path="/invoices/:id" component={PostViewContainer} />

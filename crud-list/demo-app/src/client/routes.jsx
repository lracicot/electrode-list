import React from 'react';
import { Route } from 'react-router';
import Home from './components/home';
import InvoiceCreateContainer from './components/invoice-create';
import InvoiceEditContainer from './components/invoice-edit';

export const routes = (
  <Route path="/">
      <Route path="/invoices" component={Home} />
      <Route path="/invoices/new" component={InvoiceCreateContainer} />
      <Route path="/invoices/:id/edit" component={InvoiceEditContainer} />
  </Route>
);


    // <Route path="/invoices/:id/edit" component={PostEditContainer} />
    // <Route path="/invoices/:id" component={PostViewContainer} />

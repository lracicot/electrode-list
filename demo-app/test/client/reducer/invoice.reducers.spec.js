import { Map, List } from 'immutable';
import { expect } from 'chai';

/* eslint-disable new-cap */

import InvoiceReducers from '../../src/client/reducers/invoice.reducers';


const invoices = List.of(
  new Map({
    id: '1'
  }),
  new Map({
    id: '2'
  })
);

describe('Invoice reducers', () => {
  it('handles CREATE_INVOICE_SUCCESS by adding a invoice to an empty list', () => {
    const initialState = Map({
      data: Map({
        invoices: List()
      })
    });

    const action = {
      type: 'CREATE_INVOICE_SUCCESS',
      invoice: invoices.get(0)
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices']).get(0)).to.equal(invoices.get(0));
  });

  it('handles CREATE_INVOICE_SUCCESS by adding a second invoice to a list', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0))
      })
    });

    const action = {
      type: 'CREATE_INVOICE_SUCCESS',
      invoice: invoices.get(1)
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices']).get(0)).to.equal(invoices.get(0));
    expect(nextState.getIn(['data', 'invoices']).get(1)).to.equal(invoices.get(1));
  });

  it('handles CREATE_INVOICE_SUCCESS by not adding the same invoice twice', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0))
      })
    });

    const action = {
      type: 'CREATE_INVOICE_SUCCESS',
      invoice: invoices.get(0)
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState).to.equal(initialState);
    expect(nextState.getIn(['data', 'invoices']).get(0)).to.equal(invoices.get(0));
  });

  it('handles RETREIVE_INVOICES_SUCCESS by replacing current list', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0))
      })
    });

    const action = {
      type: 'RETREIVE_INVOICES_SUCCESS',
      invoices: List.of(invoices.get(1))
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices'])).to.equal(List.of(invoices.get(1)));
  });

  it('handles UPDATE_INVOICE_SUCCESS by updating a invoice', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0))
      })
    });

    const updatedInvoice = invoices.get(0).set('title', 'Test 1 - UPDATED');

    const action = {
      type: 'UPDATE_INVOICE_SUCCESS',
      invoice: updatedInvoice
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices', 0])).to.equal(updatedInvoice);
  });

  it('handles UPDATE_INVOICE_SUCCESS by updating only the right invoice', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0), invoices.get(1))
      })
    });

    const updatedInvoice = invoices.get(0).set('title', 'Test 1 - UPDATED');

    const action = {
      type: 'UPDATE_INVOICE_SUCCESS',
      invoice: updatedInvoice
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices', 0])).to.equal(updatedInvoice);
    expect(nextState.getIn(['data', 'invoices', 1])).to.equal(invoices.get(1));
  });

  it('handles DELETE_INVOICE_SUCCESS by removing the invoice', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0))
      })
    });

    const action = {
      type: 'DELETE_INVOICE_SUCCESS',
      invoiceId: invoices.get(0).get('id')
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices'])).to.equal(List());
  });

  it('handles DELETE_INVOICE_SUCCESS by removing one invoice', () => {
    const initialState = Map({
      data: Map({
        invoices: List.of(invoices.get(0), invoices.get(1))
      })
    });

    const action = {
      type: 'DELETE_INVOICE_SUCCESS',
      invoiceId: invoices.get(0).get('id')
    };
    const nextState = InvoiceReducers(initialState, action);

    expect(nextState.getIn(['data', 'invoices'])).to.equal(List.of(invoices.get(1)));
  });
});

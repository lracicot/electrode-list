import { Map } from 'immutable';
/* eslint-disable func-style */

import { invoiceTypes as Action } from '../consts';


function updateInvoiceSucess(state, invoice) {
  const index = state.getIn(['data', 'invoices']).findKey(
    p => p.get('id') === invoice.get('id'),
  );

  if (index !== undefined) {
    return state.setIn(['data', 'invoices', index], invoice);
  }

  return state;
}

export default function invoiceReducers(state = new Map(), action) {
  const { type } = action;

  switch (type) {
  case Action.CREATE_INVOICE_SUCCESS:
    return state.setIn(
      ['data', 'invoices'],
      state.getIn(['data', 'invoices']).filter(
        p => p.get('id') !== action.invoice.get('id'),
      ).push(action.invoice),
    );

  case Action.RETREIVE_INVOICES_SUCCESS:
    return state.setIn(['data', 'invoices'], action.invoices.map(invoice =>
      invoice
      .set('subtotal', invoice.get('items').reduce((sum, item) => {
        return sum + item.get('unitPrice') * item.get('quantity');
      }, 0))
      .set('paid', invoice.get('paid') ? 1 : 0)
    ))
    .setIn(['data', 'invoice_meta'], { 'total': action.total });

  case Action.UPDATE_INVOICE_SUCCESS:
    return updateInvoiceSucess(state, action.invoice);

  case Action.DELETE_INVOICE_SUCCESS:
    console.log(action);
    return state.setIn(
      ['data', 'invoices'],
      state.getIn(['data', 'invoices']).filter(
        p => {
          console.log(p.get('_id'));
          return p.get('_id') !== action.id
        }
      ),
    );
  default:
    return state;
  }
}

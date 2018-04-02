import { fromJS } from 'immutable';
import { invoiceTypes as Action } from '../consts';
/* eslint-disable func-style */

export function createInvoiceSuccess(data) {
  return {
    type: Action.CREATE_INVOICE_SUCCESS,
    invoice: data
  };
}

export function retreiveInvoicesSuccess(data) {
  const { invoices, count } = data;
  return {
    type: Action.RETREIVE_INVOICES_SUCCESS,
    invoices: fromJS(invoices),
    total: count
  };
}

export function updateInvoiceSuccess(data) {
  return {
    type: Action.UPDATE_INVOICE_SUCCESS,
    invoice: data
  };
}

export function deleteInvoiceSuccess(data) {
  const { _id } = data;
  return {
    type: Action.DELETE_INVOICE_SUCCESS,
    id: _id
  };
}

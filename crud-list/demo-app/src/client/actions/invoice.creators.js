import { fromJS } from 'immutable';
import Axios from 'axios';
import { invoiceTypes } from '../consts';
import * as Actions from './invoice.actions';
import {
  putData,
  getData,
  postData,
  deleteData
} from './data.creators';
/* eslint-disable func-style */

export function createInvoice(invoice) {
  return postData(
    invoiceTypes.INVOICE_API.CREATE_INVOICE_URL,
    {...invoice, items: []},
    Actions.createInvoiceSuccess
  );
}

export function retreiveInvoices(query = {}) {
  const { order, offset, limit, filtered } = query;
  let queryUrl = '?';

  if (order) {
    queryUrl += `sortCol=${order.column}&sortOrder=${order.order}&`;
  }

  if (limit && typeof offset !== 'undefined') {
    queryUrl += `offset=${offset}&limit=${limit}&`;
  }

  if (filtered) {
    const filters = Object.keys(filtered).reduce((allFilters, key) => {
      allFilters[filtered[key].id] = filtered[key].value;
      return allFilters;
    }, {});
    if (Object.keys(filters).length) {
      queryUrl += `filters=${encodeURIComponent(JSON.stringify(filters))}&`;
    }

  }

  return getData(
    invoiceTypes.INVOICE_API.RETEIVE_INVOICES_URL + queryUrl,
    Actions.retreiveInvoicesSuccess
  );
}

export function updateInvoice(invoice) {
  return putData(
    `${invoiceTypes.INVOICE_API.UPDATE_INVOICES_URL(invoice.id)}`,
    { invoice },
    Actions.updateInvoiceSuccess
  );
}

export function deleteInvoice(invoiceId) {
  return deleteData(
    `${invoiceTypes.INVOICE_API.DELETE_INVOICES_URL(invoiceId)}`,
    invoiceId,
    Actions.deleteInvoiceSuccess
  );
}

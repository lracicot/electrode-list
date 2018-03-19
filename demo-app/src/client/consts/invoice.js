/**
 * @name InvoiceConstants
 * Constants for invoice module
 */

const invoiceApiUrl = process.env.INVOICE_API_URL || 'http://localhost:3001/invoices';

export const invoiceTypes = {
  CREATE_INVOICE_SUCCESS: 'CREATE_INVOICE_SUCCESS',
  RETREIVE_INVOICES_SUCCESS: 'RETREIVE_INVOICES_SUCCESS',
  UPDATE_INVOICE_SUCCESS: 'UPDATE_INVOICE_SUCCESS',
  DELETE_INVOICE_SUCCESS: 'DELETE_INVOICE_SUCCESS',
  INVOICE_API: {
    CREATE_INVOICE_URL: `${invoiceApiUrl}/`,
    RETEIVE_INVOICES_URL: `${invoiceApiUrl}/`,
    UPDATE_INVOICES_URL: invoiceId => `${invoiceApiUrl}/${invoiceId}`,
    DELETE_INVOICES_URL: invoiceId => `${invoiceApiUrl}/${invoiceId}`
  }
};

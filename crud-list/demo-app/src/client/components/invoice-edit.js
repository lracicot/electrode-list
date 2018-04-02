import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';

import InvoiceForm from './invoice-form';
import * as InvoiceActions from '../actions/invoice.creators';


/**
  * InvoiceEdit - A component that show a form to edit a invoice
  * @extends Component
  */
export class InvoiceEdit extends Component {
  saveAction(values) {
    const { updateInvoice } = this.props;
    updateInvoice(values);
    browserHistory.push('/invoices');
  }

  render() {
    const { saveAction } = this;
    const { invoice } = this.props;

    return (
      <div>
        <h1>Invoice</h1>
        <InvoiceForm
          onSubmit={saveAction.bind(this)}
          entityId={invoice.get('id')}
        />
      </div>
    );
  }
}

InvoiceEdit.propTypes = {
  invoice: PropTypes.instanceOf(Map).isRequired,
  updateInvoice: PropTypes.func
};

InvoiceEdit.defaultProps = {
  updateInvoice: () => {}
};


const mapDispatchToProps = dispatch => bindActionCreators({
  updateInvoice: InvoiceActions.updateInvoice,
  retreiveInvoices: InvoiceActions.retreiveInvoices
}, dispatch);

const mapStateToProps = (state, ownProps) => {
  const appState = fromJS(state.app);
  return ({
    invoice: appState.getIn(['data', 'invoices'])
      .find(invoice => invoice.get('_id') === ownProps.params.id)
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit);

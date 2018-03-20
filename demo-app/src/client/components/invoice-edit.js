import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import InvoiceForm from './InvoiceForm.component';
import * as InvoiceActions from './Invoice.creators';


/**
  * InvoiceEdit - A component that show a form to edit a invoice
  * @extends Component
  */
export class InvoiceEdit extends Component {
  saveAction(values) {
    const { updateInvoice } = this.props;
    updateInvoice(values.toJS());
  }

  render() {
    const { saveAction } = this;
    const { invoice } = this.props;

    return (
      <div>
        <h1>Invoice</h1>
        <InvoiceForm
          onSubmit={saveAction}
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
  updateInvoice: InvoiceActions.updateInvoice
}, dispatch);

const mapStateToProps = (state, ownProps) => ({
  invoice: state.getIn(['data', 'invoices'])
    .find(invoice => invoice.get('_id') === parseInt(ownProps.match.params.id, 10))
});

export const InvoiceEditContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceEdit);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import InvoiceForm from './InvoiceForm.component';
import * as InvoiceActions from './Invoice.creators';


/**
  * InvoiceNew - A component that show a form to edit a invoice
  * @extends Component
  */
export class InvoiceNew extends Component {
  saveAction(values) {
    const { createInvoice } = this.props;
    createInvoice(values.toJS());
  }

  render() {
    const { saveAction } = this;
    const { invoice } = this.props;

    return (
      <div>
        <h1>Invoice</h1>
        <InvoiceForm
          onSubmit={saveAction}
        />
      </div>
    );
  }
}

InvoiceNew.propTypes = {
  invoice: PropTypes.instanceOf(Map).isRequired,
  updateInvoice: PropTypes.func
};

InvoiceNew.defaultProps = {
  updateInvoice: () => {}
};


const mapDispatchToProps = dispatch => bindActionCreators({
  createInvoice: InvoiceActions.createInvoice
}, dispatch);

const mapStateToProps = () => ({});

export const InvoiceNewContainer = connect(mapStateToProps, mapDispatchToProps)(InvoiceNew);

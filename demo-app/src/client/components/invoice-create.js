import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import InvoiceForm from './invoice-form';
import * as InvoiceActions from '../actions/invoice.creators';

// import '../styles/bootstrap.min.css';


/**
  * InvoiceCreate - A component that show a form to add a invoice
  * @extends Component
  */
export class InvoiceCreate extends React.Component {
  saveAction(values) {
    const { createInvoice } = this.props;
    createInvoice(values);
  }

  render() {
    const { saveAction } = this;

    return (
      <div>
        <h1>New invoice</h1>
        <FlatButton label="Action1" />
      </div>
    );
    //
    // <InvoiceForm
    //   onSubmit={saveAction}
    //   entityId={0}
    // />
  }
}

InvoiceCreate.propTypes = {
  createInvoice: PropTypes.func
};

InvoiceCreate.defaultProps = {
  createInvoice: () => {}
};


const mapDispatchToProps = dispatch => bindActionCreators({
  createInvoice: InvoiceActions.createInvoice
}, dispatch);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCreate);

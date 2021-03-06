import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input/Input.component';
import { fromJS } from 'immutable';
import { Field, Form, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  // if (!values.get('title')) {
  //   errors.title = 'Required';
  // } else if (values.get('title').length < 5) {
  //   errors.title = 'Must be at least 5 characters';
  // }
  // if (!values.get('published_date')) {
  //   errors.published_date = 'Required';
  // } else if (!Date.parse(values.get('published_date'))) {
  //   errors.published_date = 'Invalid date format';
  // }
  return errors;
};

class InvoiceForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="description"
          component={Input}
          type="textarea"
          placeholder="Title"
          label="Description"
        />
        <Field
          name="date"
          component={Input}
          type="date"
          placeholder="Date"
          label="Date"
        />
        <Field
          name="customer"
          component={Input}
          placeholder="Name..."
          label="Customer"
        />
        <Field
          name="total"
          component={Input}
          placeholder="0"
          label="Total"
        />
        <Field
          name="id"
          component="input"
          type="hidden"
        />
        <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
      </Form>
    );
  }
}

InvoiceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const form = reduxForm({
  form: 'editInvoice',
  validate
})(InvoiceForm);

export default connect(
  (state, props) => {
    const appState = fromJS(state.app);
    const invoice = appState.getIn(['data', 'invoices']).find(p => p.get('id') === props.entityId);

    if (!invoice) {
      return {};
    }

    return ({
      initialValues: {
        id: invoice.get('_id'),
        description: invoice.get('description'),
        date: invoice.get('date') ? invoice.get('date').substr(0, 10) : '',
        customer: invoice.get('customer'),
        total: invoice.get('total')
      }
    });
  }
)(form);

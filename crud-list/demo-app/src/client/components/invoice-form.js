import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm } from 'redux-form/immutable';

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
      submitting,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="title"
          component={Input}
          type="text"
          placeholder="Title"
          label="Title"
        />
        <Field
          name="published_date"
          component={Input}
          type="date"
          placeholder="Published date"
          label="Published date"
        />
        <Field
          name="content"
          component={Input}
          componentClass="textarea"
          placeholder="Enter text here..."
          label="Content"
        />
        <Field
          name="id"
          component="input"
          type="hidden"
        />
        <Button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</Button>
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
    const invoice = state.getIn(['data', 'invoices']).find(p => p.get('id') === props.entityId);

    if (!invoice) {
      return {};
    }

    return ({
      initialValues: {
        id: invoice.get('id'),
        title: invoice.get('title'),
        published_date: invoice.get('published_date').substr(0, 10),
        content: invoice.get('content')
      }
    });
  }
)(form);

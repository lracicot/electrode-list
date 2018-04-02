import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { List, Map, fromJS } from 'immutable';

import { CrudList } from 'crud-list';
import '../styles/raleway.css';
import '../styles/skeleton.css';
import custom from '../styles/custom.css';
import * as InvoiceActions from '../actions/invoice.creators';

const locale = 'en';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(column, order) {
    const { retreiveInvoices } = this.props;
    retreiveInvoices({order: {column, order}});
  }

  render() {
    const { data, cols, retreiveInvoices, deleteInvoice } = this.props;
    return (
      <IntlProvider locale={locale}>
        <div className={custom.demoAppContainer}>
          <h2>
          List of invoices
          </h2>
          <CrudList
            data={data.toJS()}
            cols={cols}
            handleSort={this.handleSort}
            handleDelete={deleteInvoice}
            requestData={retreiveInvoices}
          />
        </div>
      </IntlProvider>
    );
  }
}

Home.propTypes = {
  data: PropTypes.instanceOf(List).isRequired,
  cols: PropTypes.array.isRequired,
  order: PropTypes.instanceOf(Map),
  deleteInvoice: PropTypes.func,
  retreiveInvoices: PropTypes.func
};

Home.defaultProps = {
  order: new Map({ column: 'id', order: 'DESC' }),
  deleteInvoice: null,
  retreiveInvoices: () => {}
};

const mapStateToProps = state => {
  const appState = fromJS(state.app);
  return ({
  data: appState.getIn(['data', 'invoices']),
  cols: [
    { Header: 'Id', accessor: '_id'},
    { Header: 'Subtotal', accessor: 'subtotal'},
    { Header: 'Paid', accessor: 'paid'},
    { Header: 'Customer', accessor: 'customer'}
  ],
  order: new Map({ column: 'data', order: 'DESC' })
})
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteInvoice: InvoiceActions.deleteInvoice,
  retreiveInvoices: InvoiceActions.retreiveInvoices
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

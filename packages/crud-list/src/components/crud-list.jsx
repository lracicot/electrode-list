import React from 'react';
import propTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


export default class CrudList extends React.Component {
  constructor(props) {
    super(props);

    const { defaultPageSize } = this.props;

    this.state = {
      pages: -1,
      pageSize: defaultPageSize,
      loading: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state) {
    const { sorted, page, pageSize, filtered } = state;

    let order = null;

    if (sorted.length) {
      order = { column: sorted[0].id, order: sorted[0].desc ? 'DESC' : 'ASC' };
    }

    // Show the loading
    this.setState({ loading: true });

    this.props.requestData({
      offset: page * pageSize,
      limit: pageSize,
      order,
      filtered
    }).then(action => {
      const newState = state;
      newState.loading = false;
      if (action.type === 'RETREIVE_INVOICES_SUCCESS') {
        newState.pages = Math.ceil(action.total / pageSize)
      }
      this.setState(newState);
    });
  }

  render() {
    const {
      data,
      cols,
      handleDelete,
      handleView,
      handleEdit,
      idCol
    } = this.props;

    const { pages, loading, pageSize } = this.state;

    const hasDelete = !!handleDelete;
    const hasView = !!handleView;
    const hasEdit = !!handleEdit;

    const hasActions = hasDelete || hasView || hasEdit;

    if (hasActions) {
      const getActionButtons = row => {
        let deleteButton = '';
        let editButton = '';
        let viewButton = '';

        if (hasDelete) {
          deleteButton = (
            <button onClick={() => { handleDelete(row.value); }}>Delete</button>
          );
        }

        if (hasEdit) {
          editButton = (
            <button onClick={() => { handleEdit(row.value); }}>Edit</button>
          );
        }

        if (hasView) {
          viewButton = (
            <button onClick={() => { handleView(row.value); }}>Details</button>
          );
        }

        return (
          <div>
            {deleteButton}
            {editButton}
            {viewButton}
          </div>
        );
      };

      cols.push({
        Header: 'Action',
        accessor: idCol,
        Cell: getActionButtons
      });
    }

    return (
      <ReactTable
        manual
        data={data}
        columns={cols}
        pages={pages}
        loading={loading}
        onFetchData={this.fetchData}
        filterable
        defaultPageSize={pageSize}
        className="-striped -highlight"
      />
      // <div>
      //   <List
      //     data={data}
      //     columns={cols}
      //     handleDelete={handleDelete}
      //     handleView={handleView}
      //     handleEdit={handleEdit}
      //     handleSort={sortAction}
      //     order={order}
      //   />
      // </div>
    );
  }
}

CrudList.displayName = 'CrudList';

CrudList.propTypes = {
  data: propTypes.array,
  idCol: propTypes.string,
  cols: propTypes.array,
  defaultOrder: propTypes.object,
  defaultLimit: propTypes.number,
  defaultPageSize: propTypes.number,
  handleDelete: propTypes.func,
  handleView: propTypes.func,
  handleEdit: propTypes.func,
  handleSort: propTypes.func,
  requestData: propTypes.func
};

CrudList.defaultProps = {
  defaultLimit: 5,
  defaultPageSize: 10,
  idCol: '_id'
};

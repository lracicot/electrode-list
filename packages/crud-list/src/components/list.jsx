import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { default as UIRow } from './row';
import { default as UICell } from './cell';
import Header from './header';
import styles from '../styles/crud-list.css';
import { sortedOrder } from '../consts/list';

/**
  * List - A component that show a list
  * @extends Component
  */
class List extends PureComponent {
  render() {
    const {
      data,
      columns,
      order,
      handleDelete,
      handleSort,
      handleView,
      handleEdit
    } = this.props;

    const hasDelete = !!handleDelete;
    const hasView = !!handleView;
    const hasEdit = !!handleEdit;

    const hasActions = hasDelete || hasView || hasEdit;

    // const { order } = this.state;
    const headers = columns.map(col => {
      let currentOrder = sortedOrder.NONE;
      if (order && col.field === order.column) {
        currentOrder = order.order;
      }

      return (
        <Header
          key={`header_${col.header}`}
          sortAction={handleSort}
          sortable={col.sortable}
          sorted={currentOrder}
          columnName={col.field}
        >
          {col.header}
        </Header>
      );
    });

    let headerAction = '';

    if (hasActions) {
      headerAction = (
        <Header key="header_action">
          Actions
        </Header>
      );
    }

    if (data.size === 0) {
      return (<div className={styles.backendui__list}>
        <UIRow>
          {headers}
          {headerAction}
        </UIRow>
        No data
      </div>);
    }

    // Create the rows
    const list = data.map(item => {

    const id = (i => {
      if (i.hasOwnProperty('id')) {
        return i.id;
      }

      if (i.hasOwnProperty('_id')) {
        return i._id;
      }

      return i[Object.keys(i)[0]];
    })(item);

      // Create the cols
      const cells = columns.map(col => (
        <UICell key={`cell_${id}_${col.field}`}>
          {item[col.field]}
        </UICell>
      ));

      let actionCell = '';

      if (hasActions) {
        let deleteButton = '';
        let editButton = '';
        let viewButton = '';

        if (hasDelete) {
          deleteButton = (
            <button onClick={() => { handleDelete(id); }}>Delete</button>
          );
        }

        if (hasEdit) {
          editButton = (
            <button onClick={() => { handleEdit(id); }}>Edit</button>
          );
        }

        if (hasView) {
          viewButton = (
            <button onClick={() => { handleView(id); }}>Details</button>
          );
        }

        actionCell = (
          <UICell key={`cell_${id}_actions`}>
            {deleteButton}
            {editButton}
            {viewButton}
          </UICell>
        );
      }

      return (
        <UIRow
          key={id}
        >
          {cells}
          {actionCell}
        </UIRow>
      );
    });

    return (
      <div className={styles.backendui__list}>
        <UIRow>
          {headers}
          {headerAction}
        </UIRow>
        {list}
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  order: PropTypes.object,
  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSort: PropTypes.func
};

List.defaultProps = {
  handleDelete: null,
  handleView: null,
  handleEdit: null,
  handleSort: null,
  order: null
};

export default List;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/crud-list.css';

import { sortedOrder } from '../consts/list';


/**
  * Header - A component that show a header cell in a list
  * @extends PureComponent
  */
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.sortActionHandler = this.sortActionHandler.bind(this);
  }
  sortActionHandler() {
    const { sorted, sortAction, columnName } = this.props;
    let order;
    if (sorted === sortedOrder.NONE) {
      order = sortedOrder.ASC;
    }
    if (sorted === sortedOrder.ASC) {
      order = sortedOrder.DESC;
    }
    if (sorted === sortedOrder.DESC) {
      order = sortedOrder.ASC;
    }
    sortAction(columnName, order);
  }

  render() {
    const { sortActionHandler } = this;
    const { children, sortable } = this.props;
    let content;

    if (sortable) {
      content = (
        <span>
          <a onClick={sortActionHandler}>
            {children}
          </a>
        </span>
      );
    } else {
      content = (
        <span>
          {children}
        </span>
      );
    }

    return (
      <div className={styles.backendui__list__header}>
        {content}
      </div>
    );
  }
}

Header.propTypes = {
  sortable: PropTypes.bool,
  sorted: PropTypes.string,
  children: PropTypes.node.isRequired,
  sortAction: PropTypes.func,
  columnName: PropTypes.string
};

Header.defaultProps = {
  sortable: false,
  sorted: sortedOrder.NONE,
  sortAction: () => {},
  columnName: null
};

export default Header;

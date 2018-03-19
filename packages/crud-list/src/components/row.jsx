import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/crud-list.css';


/**
  * Row - A component that shows a row in a list
  * @extends PureComponent
  */
class Row extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.backendui__list__row}>
        {children}
      </div>
    );
  }
}

Row.propTypes = {
  children: PropTypes.node.isRequired
};

export default Row;

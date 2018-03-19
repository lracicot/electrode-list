import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/crud-list.css';


/**
  * Cell - A component that show a cell in a list
  * @extends PureComponent
  */
class Cell extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.backendui__list__cell}>
        {children}
      </div>
    );
  }
}

Cell.propTypes = {
  children: PropTypes.node.isRequired
};

export default Cell;

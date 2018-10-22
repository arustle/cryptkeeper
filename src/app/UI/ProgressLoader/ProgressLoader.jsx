import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressLoader.cssmodules.css';

class ProgressLoader extends Component {
  render () {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <div className={styles.loadBar}>
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      );
    }

    return (
      <div className={styles.inactiveLoader} />
    );
  }
}

ProgressLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default ProgressLoader;


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Core from './Core';

import store from '../redux/store';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Core />
      </Provider>
    );
  }

}

ReactDOM.render(
  (<App />),
  document.getElementById('app'),
);

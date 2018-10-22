
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import CoinigyWindow from './CoinigyWindow/CoinigyWindow.container';
import store from '../redux/store';
// const { ipcRenderer } = window.require('electron');


// import { updateCoinigyUrl } from '../redux/actions/components/CoinigyWindow.actions';
// ipcRenderer.on('change-coinigy-data', (e, payload) => {
//   store.dispatch(updateCoinigyUrl(payload));
// });


class Core extends Component {

  render () {
    return (
      <Provider store={store}>
        <CoinigyWindow />
      </Provider>
    );
  }

}

ReactDOM.render(
  (<Core />),
  document.getElementById('coinigy'),
);

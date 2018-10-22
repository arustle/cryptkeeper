/* global document*/

import React, { Component } from 'react';
import ReactTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './CoinigyWindow.cssmodules.css';
// import { ACTIONS } from '../../redux/actions/components/CoinigyWindow.actions';
// var ipcRenderer = require('electron').ipcRenderer;
// ipcRenderer.on('message', function (e, payload) {
//   console.log('message', store, x, y);
// });


const { ipcRenderer } = window.require('electron');

class CoinigyWindow extends Component {
  constructor (props) {
    super(props);

    this._handleUrlChange = this._handleUrlChange.bind(this);
  }
  _handleUrlChange () {



  }

  componentDidMount () {

    const webview = document.querySelector('webview');
    // webview.addEventListener('ipc-message', (event) => {
    //   console.log(event.channel)
    //   // Prints "pong"
    // });
    webview.addEventListener('console-message', (e) => {
      console.log('Guest page logged a message:', e.message)
    });
    // webview.addEventListener('did-frame-finish-load', (e) => {
    //   console.log('did-frame-finish-load', e.message)
    // });
    // webview.addEventListener('did-finish-load', (e) => {
    //   console.log('did-finish-load', e.message)
    // });
    // webview.addEventListener('dom-ready', (e) => {
    //   console.log('dom-ready', e.message)
    // });
    ipcRenderer.on('change-coinigy-page', (e, payload) => {
      webview.executeJavaScript(
        // `console.log('#exchange_${payload.exchange}');` +
        `document.querySelector('#exchange_${payload.exchange}').click();` +
        // `console.log('a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]');` +
        `document.querySelector('a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]').click();`
      );
    });


    // webview.send('ping')
  }


  render () {
    // const {
    //   coinigyData
    // } = this.props;
    // console.log('props', coinigyData)

    // const url = (coinigyData)
    //   ? `https://www.coinigy.com/main/markets/${coinigyData.exchange}/${coinigyData.pairA}/${coinigyData.pairB}`
    //   : 'https://www.coinigy.com';
    //
    // <ReactTable
    //   keyField="asset_id"
    //   data={allAssets}
    //   columns={columns}
    // />
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <webview
          src="https://www.coinigy.com/main"
          style={{ height: '100%', width: '100%' }}
          disableguestresize="true"
        />

      </div>
    );
  }
}


CoinigyWindow.propTypes = {


};

export default CoinigyWindow;

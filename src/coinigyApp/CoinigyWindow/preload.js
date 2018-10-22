/* global document */



// ipcRenderer.on('change-coinigy-page', (e, payload) => {
//   document.write('QWQWQWQWQW');
//   alert('QQQQQQ');
//   console.log(`#exchange_${payload.exchange}`);
//   document.querySelector(`#exchange_${payload.exchange}`).click();
//   console.log(`a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]`);
//   document.querySelector(`a.market_list_entry[data-exchange="${payload.exchange}"][data-displayname="${payload.pairA}/${payload.pairB}"]`).click();
// });
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})

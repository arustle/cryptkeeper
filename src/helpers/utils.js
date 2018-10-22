import moment from 'moment';
var fs = require('fs');


const crossRef = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/CoinigyCrossReference.json`, { encoding: 'utf8' }));


export const buildColumn = function (dataField, text, formatter) {

  const data = {
    dataField,
    text,
  };

  if (formatter) data.formatter = formatter;
  return data;
};

export const formatDateTIme = function (date) {
  return moment(date).format('YY-MMM-DD@hh:mm a');
};
export const formatDate = function (date) {
  return moment(date).format('YY-MMM-DD');
};

export const getCoinigyExchangeName = function (exchange) {

  // BXTH
// CBNK
//OKFT
// PAYM

  for (let i = 0; i < crossRef.length; i++) {
    if (crossRef[i].exchange_id == exchange) return crossRef[i].coinigyId;
  }

  return '';
};

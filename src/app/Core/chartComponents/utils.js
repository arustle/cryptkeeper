
var fs = require('fs');
import { tsvParse, csvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';

function parseData (parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse('%Y-%m-%d');

export function getData () {
  return tsvParse(
    fs.readFileSync('./src/app/Core/chartComponents/MSFT.tsv', { encoding: 'utf8' }),
    parseData(parseDate)
  );
}
//

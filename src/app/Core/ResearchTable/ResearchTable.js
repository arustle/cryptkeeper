/* global window */

import React, { Component } from 'react';
import ReactTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';


import styles from './ResearchTable.cssmodules.css';
import SelectBox from '../../UI/SelectBox/SelectBox';

import { getCoinigyExchangeName } from '../../../helpers/utils';

const { ipcRenderer } = window.require('electron');


class ResearchTable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedPeriodId: '1DAY',
      activePortfolioId: null,
    };
    this._getColumns = this._getColumns.bind(this);

  }
  componentWillMount () {
    const {
      fetchAllSymbols,
      fetchAllPortfolioAssets,
    } = this.props;

    fetchAllSymbols();
    fetchAllPortfolioAssets();
  }

  _getColumns () {
    const { activePortfolioId } = this.state;
    const {
      createPortfolioAsset,
      fetchLatestChartData,
    } = this.props;




    return [{
      dataField: 'symbol_id',
      text: '',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      formatter: (cell, row, i) => {
        // console.log('click button', cell, row)
        return (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              createPortfolioAsset({
                symbolId: row.symbol_id,
                exchangeId: row.exchange_id,
                assetId: row.asset_id_base,
                marketId: row.asset_id_quote,
                portfolioId: activePortfolioId,
              });
            }}
          >
            add
          </button>
        );
      }
    }, {
      dataField: 'coinigy',
      text: '',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      formatter: (cell, row, i) => {
        // console.log('click button', cell, row)
        return (
          <button
            type="button"
            onClick={(event) => {
              ipcRenderer.send('update-coinigy-data', {
                pairA: row.asset_id_base,
                pairB: row.asset_id_quote,
                exchange: getCoinigyExchangeName(row.exchange_id),
              });
            }}
          >
            coinigy
          </button>
        );
      }
    }, {
      dataField: 'usdchart',
      text: '#',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      formatter: (cell, row, i) => {
        // console.log('click button', cell, row)
        return (
          <button
            type="button"
            onClick={(event) => {
              fetchLatestChartData({
                symbolId: row.symbol_id,
                periodId: this.state.selectedPeriodId,
                limit: 100,
                exchangeId: row.exchange_id,
                assetId: row.asset_id_base,
                marketId: row.asset_id_quote,
              });
            }}
          >
            chart
          </button>
        );
      }
    }, {
      dataField: '',
      text: '#',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      formatter: (cell, row, i) => {
        return i + 1;
      }
    }, {
      dataField: 'exchange_id',
      text: 'exchange_id',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      filter: textFilter(),
    }, {
      dataField: 'asset_id_base',
      text: 'Symbol',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      filter: textFilter(),
    }, {
      dataField: 'asset_id_quote',
      text: 'Market',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      filter: textFilter(),
    }, {
      dataField: 'portfolios',
      text: 'Portfolio',
      headerClasses: styles.headerCell,
      // headerFormatter: this._headerFormatter,
      formatter: (cell, row, i) => {
        return (cell || []).map( (portfolio, i) => (
          <h6 key={i} className="badge badge-info">{portfolio.name}</h6>
        ));
      }
    }];

  }


  render () {

    const { activePortfolioId, selectedPeriodId } = this.state;
    const {
      allSymbols,
      fetchLatestChartData,
      allPortfolios,
      isFetchingAllPortfolios,

      periods,
      allPortfolioAssets,
      includePortfolioAssets,
    } = this.props;

    // console.log('allSymbols', allSymbols.length, allSymbols)

    return (
      <div>
        <div>
          <div style={{ padding: '5px 10px 40px', display: 'flex', width: '100%' }}>
            <div style={{ width: '50%' }}>
              <h6>Add currencies to this portfolio:</h6>
              <SelectBox
                isLoading={isFetchingAllPortfolios}
                options={allPortfolios}
                labelKey="portfolioName"
                valueKey="id"
                onChange={(item) => {
                  this.setState({
                    activePortfolioId: item.id,
                  });
                }}
                value={activePortfolioId}
              />
            </div>
            <div style={{ width: '50%' }}>
              <h6>Chart Period:</h6>
              <SelectBox
                options={periods}
                onChange={(item) => {
                  this.setState({
                    selectedPeriodId: item.value,
                  });
                }}
                value={selectedPeriodId}
              />
            </div>
          </div>
        </div>
        <div style={{ height: '300px', overflow: 'auto' }}>
          <ReactTable
            keyField="symbol_id"
            hover={true}
            data={allSymbols}
            columns={this._getColumns()}
            filter={ filterFactory() }
            rowEvents={{
              // onClick: (e, row, rowIndex) => {
              //   ipcRenderer.send('store-data', {
              //     pairA: row.asset_id_base,
              //     pairB: row.asset_id_quote,
              //     exchange: getCoinigyExchangeName(row.exchange_id),
              //   });
              //
              //   fetchLatestChartData({
              //     symbolId: row.symbol_id,
              //     periodId: this.state.selectedPeriodId,
              //     limit: 100,
              //     exchangeId: row.exchange_id,
              //     assetId: row.asset_id_base,
              //     marketId: row.asset_id_quote,
              //   });
              // },
            }}
          />
        </div>
      </div>
    );
  }
}


ResearchTable.propTypes = {


  // allAssets: PropTypes.arrayOf(PropTypes.shape({
  //   asset_id: PropTypes.string.isRequired,
  //   data_end: PropTypes.string.isRequired,
  //   data_orderbook_end: PropTypes.string.isRequired,
  //   data_orderbook_start: PropTypes.string.isRequired,
  //   data_quote_end: PropTypes.string,
  //   data_quote_start: PropTypes.string,
  //   data_start: PropTypes.string.isRequired,
  //   data_symbols_count: PropTypes.number.isRequired,
  //   data_trade_count: PropTypes.number,
  //   data_trade_end: PropTypes.string,
  //   data_trade_start: PropTypes.string,
  //   name: PropTypes.string.isRequired,
  //   type_is_crypto: PropTypes.number.isRequired,
  // })).isRequired,
  // fetchAllAssets: PropTypes.func.isRequired,
  // isFetchingAllAssets: PropTypes.bool.isRequired,

  allSymbols: PropTypes.arrayOf(PropTypes.shape({
    symbol_id: PropTypes.string.isRequired,
    exchange_id: PropTypes.string.isRequired,
    symbol_type: PropTypes.string.isRequired,
    asset_id_base: PropTypes.string.isRequired,
    asset_id_quote: PropTypes.string.isRequired,
  })).isRequired,
  fetchAllSymbols: PropTypes.func.isRequired,
  isFetchingAllSymbols: PropTypes.bool.isRequired,


  fetchAllPortfolioAssets: PropTypes.func.isRequired,
  isFetchingAllPortfolios: PropTypes.bool.isRequired,



  allPortfolioAssets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  allPortfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,




  fetchLatestChartData: PropTypes.func.isRequired,
  fetchHistoricalChartData: PropTypes.func.isRequired,
  periods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ResearchTable;

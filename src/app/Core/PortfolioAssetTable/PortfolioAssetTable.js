import React, { Component } from 'react';
import ReactTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import PropTypes from 'prop-types';

const { ipcRenderer } = window.require('electron');


import styles from './PortfolioAssetTable.cssmodules.css';
import SelectBox from '../../UI/SelectBox/SelectBox';
import { getCoinigyExchangeName } from '../../../helpers/utils';


class PortfolioAssetTable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedPeriodId: '1DAY',
      selectedPortfolioId: null,
      activePortfolioAssetId: null,
    };

    this._getColumns = this._getColumns.bind(this);
  }
  componentWillMount () {

  }
  _headerFormatter (col, colIndex) {
    return (
      <div className={styles.headerCell}>{col.text}</div>
    );
  }


  _getColumns () {
    const { fetchLatestChartData } = this.props;
    return (
      [{
        dataField: 'coinigy',
        text: '',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
        formatter: (cell, row, i) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              ipcRenderer.send('update-coinigy-data', {
                pairA: row.assetId,
                pairB: row.marketId,
                exchange: getCoinigyExchangeName(row.exchangeId),
              });
            }}
          >
            coinigy
          </button>
        ),
      }, {
        dataField: 'usdchart',
        text: '',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
        formatter: (cell, row, i) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              fetchLatestChartData({
                symbolId: row.symbolId,
                periodId: this.state.selectedPeriodId,
                limit: 100,
                exchangeId: row.exchangeId,
                assetId: row.assetId,
                marketId: row.marketId,
              });
            }}
          >
              chart
          </button>
        ),
      }, {
        dataField: 'removeText',
        text: 'Remove (\'delete\')',
        cellEdit: true,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
      }, {
        dataField: 'id',
        text: 'id',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
      }, {
        dataField: 'exchangeId',
        text: 'Exchange',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
        filter: textFilter(),
      }, {
        dataField: 'assetId',
        text: 'Symbol',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
        filter: textFilter(),
      }, {
        dataField: 'marketId',
        text: 'Market',
        cellEdit: false,
        headerClasses: styles.headerCell,
        // headerFormatter: this._headerFormatter,
        filter: textFilter(),
      }, {
        dataField: 'notes',
        text: 'Notes',
        cellEdit: true,
        headerClasses: styles.headerCell,
      }]
    );
  }

  render () {
    const { selectedPortfolioId, activePortfolioAssetId, selectedPeriodId } = this.state;

    const {
      periods,
      isFetchingALlAssets,
      allAssets,
      isFetchingAllSymbols,
      allSymbols,
      changeCoinigySymbol,
      changeActiveExchange,
      changeActiveAsset,
      changeActiveMarket,
      fetchHistoricalChartData,
      fetchLatestChartData,
      fetchPortfolio,
      allPortfolios,
      isFetchingAllPortfolios,


      fetchAllPortfolioAssets,
      fetchPortfolioAssets,
      fetchPortfolioAsset,
      updatePortfolioAsset,
      createPortfolioAsset,
      deletePortfolioAsset,

      isFetchingAllPortfolioAssets,
      allPortfolioAssets,
      portfolioAssetsHashMap,
      portfolioAssetsBeingFetched,
      portfolioAssetsBeingUpdated,
      portfolioAssetsBeingDeleted,
      isCreatingPortfolioAsset,


      portfolioAssets,
      changePortfolio,


    } = this.props;
    //
    // const columns = [
    //   buildColumn('asset_id', 'Asset'),
    //   buildColumn('name', 'Name'),
    //   buildColumn('type_is_crypto', 'IsCrypto'),
    //   buildColumn('data_end', 'data_end', formatDate),
    //   buildColumn('data_orderbook_start', 'data_orderbook_start', (cell, row) => buildDateRange(cell, row, 'data_orderbook_end')),
    //   buildColumn('data_quote_end', 'data_quote_end', formatDateTIme),
    //   buildColumn('data_quote_start', 'data_quote_start', formatDateTIme),
    //   buildColumn('data_start', 'data_start', formatDate),
    //   buildColumn('data_symbols_count', 'data_symbols_count'),
    //   buildColumn('data_trade_count', 'data_trade_count'),
    //   buildColumn('data_trade_end', 'data_trade_end', formatDateTIme),
    //   buildColumn('data_trade_start', 'data_trade_start', formatDateTIme),
    // ];


    const selectedPortfolioData = (selectedPortfolioId) ? portfolioAssetsHashMap.get(selectedPortfolioId) : [];

    selectedPortfolioData.forEach(x => {
      x.removeText = '';
      x.coinigy = '';
      x.usdchart = '';
    });
    //
    // <ReactTable
    //   keyField="asset_id"
    //   data={allAssets}
    //   columns={columns}
    // />


    const cellEdit = cellEditFactory({
      mode: 'click',
      blurToSave: true,
      afterSaveCell: (oldValue, newValue, row, column) => {
        if (column.dataField === 'removeText') {
          if (newValue === 'delete') {
            deletePortfolioAsset(row);
          }
        } else {
          updatePortfolioAsset(Object.assign({}, row, {
            [column.dataField]: newValue,
          }));
        }
      },
    });


    return (
      <div>
        <div style={{ padding: '5px 10px 40px', display: 'flex', width: '100%' }}>
          <div style={{ width: '50%' }}>
            <h6>Active Portfolio:</h6>
            <SelectBox
              isLoading={isFetchingAllPortfolios}
              options={allPortfolios}
              labelKey="portfolioName"
              valueKey="id"
              value={selectedPortfolioId}
              onChange={(item) => {
                // console.log(item)
                this.setState({
                  selectedPortfolioId: item.id,
                });
                fetchPortfolioAssets(item.id);
              }}
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
        <div style={{ height: '300px', overflow: 'auto' }}>
          <ReactTable
            keyField="id"
            hover
            data={selectedPortfolioData}
            columns={this._getColumns()}
            filter={filterFactory()}
            cellEdit={cellEdit}
          />

        </div>
      </div>
    );
  }
}


PortfolioAssetTable.propTypes = {

  periods: PropTypes.arrayOf(PropTypes.shape()).isRequired,


};

export default PortfolioAssetTable;

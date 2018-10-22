import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ResearchTable from './ResearchTable/ResearchTable.container';
import PortfolioAssetTable from './PortfolioAssetTable/PortfolioAssetTable.container';
import ProgressLoader from '../UI/ProgressLoader/ProgressLoader';
import Modal from '../UI/Modal/Modal';
//
//
// import styles from './Core.cssmodules.css';

import AreaChart from './chartComponents/AreaChartUSD';
import PortfolioSetup from './PortfolioSetup/PortfolioSetup';

const PAGES = {
  PORTFOLIO_SETUP: 'PORTFOLIO_SETUP',
  RESEARCH: 'RESEARCH',
  PORTFOLIOS: 'PORTFOLIOS',
};

class Core extends Component {
  constructor (props) {
    super(props);

    this.state = {
      activePage: PAGES.RESEARCH,
    };

    this._renderCoinResearch = this._renderCoinResearch.bind(this);
    this._renderPortfolios = this._renderPortfolios.bind(this);
  }

  componentDidMount () {
    this.props.fetchAllOhclvPeriods();
    this.props.fetchLatestBtcUsdData();
    this.props.fetchAllPortfolios();
  }


  _renderCoinResearch () {
    const {
      activePage,
    } = this.state;

    const {
      normalizedChartData,
      activeAsset,
    } = this.props;


    return (
      <div className="card">
        <div className="card-header">
          <ResearchTable />
        </div>
        <div className="card-body">
          {(activePage === PAGES.RESEARCH)
            ? (<AreaChart title={`${activeAsset}`} vsUsdTitle={`USD-${activeAsset}`} data={normalizedChartData} />)
            : null
          }
        </div>
      </div>
    );
  }

  _renderPortfolios () {
    const {
      activePage,
    } = this.state;

    const {
      normalizedChartData,
      activeAsset,
    } = this.props;


    return (
      <div className="card">
        <div className="card-header">
          <PortfolioAssetTable />
        </div>
        <div className="card-body">
          {(activePage === PAGES.PORTFOLIOS)
            ? (<AreaChart title={`${activeAsset}`} vsUsdTitle={`USD-${activeAsset}`} data={normalizedChartData} />)
            : null
          }
        </div>
      </div>
    );
  }

  render () {
    const {
      activePage,
    } = this.state;

    const {
      isModalVisible,
      modalOptions,
      hideModal,
      appIsLoading,


      allPortfolios,
      createPortfolio,
      updatePortfolio,

      coinApiLimits,
    } = this.props;

    // console.log('props', this.state);
    // console.log('state', this.state)
    // console.log('chartData', chartData)

    return (
      <div>
        <ProgressLoader isLoading={appIsLoading} />
        <div className="container-fluid">
          {
            (isModalVisible)
            ? (<Modal modalOptions={modalOptions} hideModal={hideModal} />)
            : null
          }
          <div className="row">
            <div className="col" style={{ position: 'relative' }}>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={(activePage === PAGES.PORTFOLIO_SETUP) ? 'nav-link active' : 'nav-link'}
                    onClick={() => (this.setState({ activePage: PAGES.PORTFOLIO_SETUP }))}
                    href="#"
                  >
                    Portfolio Setup
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={(activePage === PAGES.RESEARCH) ? 'nav-link active' : 'nav-link'}
                    onClick={() => (this.setState({ activePage: PAGES.RESEARCH }))}
                    href="#"
                  >
                    Research
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={(activePage === PAGES.PORTFOLIOS) ? 'nav-link active' : 'nav-link'}
                    onClick={() => (this.setState({ activePage: PAGES.PORTFOLIOS }))}
                    href="#"
                  >
                    Portfolios
                  </a>
                </li>
              </ul>
              <div style={{ position: 'absolute', right: '0', top: '0', padding: '10px' }}>
                CoinAPI: {coinApiLimits.remaining} / {coinApiLimits.limit}
              </div>
            </div>
          </div>
          <div className="row" style={{ display: (activePage === PAGES.PORTFOLIO_SETUP) ? 'block' : 'none' }}>
            <div className="col">
              <div className="container">
                <PortfolioSetup
                  allPortfolios={allPortfolios}
                  createPortfolio={createPortfolio}
                  updatePortfolio={updatePortfolio}
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ display: (activePage === PAGES.RESEARCH) ? 'block' : 'none' }}>
            <div className="col">
              <div className="container-fluid">
                {this._renderCoinResearch()}
              </div>
            </div>
          </div>
          <div className="row" style={{ display: (activePage === PAGES.PORTFOLIOS) ? 'block' : 'none' }}>
            <div className="col">
              <div className="container-fluid">
                {this._renderPortfolios()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Core.propTypes = {
  appIsLoading: PropTypes.bool.isRequired,
};

export default Core;

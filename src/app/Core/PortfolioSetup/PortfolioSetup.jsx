import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PortfolioSetup extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editingPortfolioId: null,
      editingPortfolioName: null,
      editingPortfolioDescription: null,
    };

    this._renderName = this._renderName.bind(this);
    this._renderDescription = this._renderDescription.bind(this);
    this._renderPortfolios = this._renderPortfolios.bind(this);
  }


  _renderName (portfolio) {
    const {
      editingPortfolioId,
      editingPortfolioName,
    } = this.state;

    const {
      allPortfolios,
      createPortfolio,
      updatePortfolio,
    } = this.props;

    return (editingPortfolioId === portfolio.id)
      ? (
        <input
          style={{ width: '100%', height: '100%' }}
          onChange={(e, i) => {
            this.setState({
              editingPortfolioName: e.target.value,
            });
          }}
          onBlur={() => {
            // console.log(editingPortfolioId, editingPortfolioName);
            updatePortfolio(Object.assign({}, portfolio, {
              portfolioName: editingPortfolioName,
            }));
            this.setState({
              editingPortfolioId: null,
              editingPortfolioName: null,
            });
          }}
          value={editingPortfolioName}
        />
      )
      : (<h5 style={{ borderBottom: '1px solid #ccc' }}>{portfolio.portfolioName}</h5>);
  }
  _renderDescription (portfolio) {
    const {
      editingPortfolioId,
      editingPortfolioName,
      editingPortfolioDescription,
    } = this.state;

    const {
      allPortfolios,
      createPortfolio,
      updatePortfolio,
    } = this.props;

    const isEditing = (editingPortfolioId === portfolio.id);
    return (isEditing)
      ? (<textarea
          style={{ width: '100%', height: '100%' }}
          onChange={(e, i) => {
            this.setState({
              editingPortfolioDescription: e.target.value,
            });
          }}
          onBlur={() => {
            // console.log(editingPortfolioId, editingPortfolioName);
            updatePortfolio(Object.assign({}, portfolio, {
              description: editingPortfolioDescription,
            }));
            this.setState({
              editingPortfolioId: null,
              editingPortfolioName: null,
              editingPortfolioDescription: null,
            });
          }}
          value={editingPortfolioDescription || ''}
        />)
      : (<pre style={{ marginLeft: '20px' }}>{portfolio.description}</pre>);
  }

  _renderPortfolios () {
    const {
      editingPortfolioId,
      editingPortfolioName,
    } = this.state;

    const {
      allPortfolios,
      createPortfolio,
      updatePortfolio,
    } = this.props;

    return allPortfolios.map((portfolio, i) => (
      <li
        key={portfolio.id}
        className="list-group-item"
        onClick={() => {
         // console.log(portfolio);
         this.setState({
           editingPortfolioId: portfolio.id,
           editingPortfolioName: portfolio.portfolioName,
           editingPortfolioDescription: portfolio.description,
         });
       }}
      >
        {this._renderName(portfolio)}
        {this._renderDescription(portfolio)}
      </li>
    ));
  }


  render () {
    const {
      editingPortfolioId,
      editingPortfolioName,
    } = this.state;

    const {
      allPortfolios,
      createPortfolio,
      updatePortfolio,
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col">

            <button
              className="btn btn-primary"
              type="button"
              onClick={() => (createPortfolio({
                id: null,
                portfolioName: 'New Portfolio',
              }))}
            >
              Add
            </button>
          </div>
        </div>
        <div className="row">
          <ul className="list-group">
            {this._renderPortfolios()}

          </ul>
        </div>
      </div>
    );
  }
}

PortfolioSetup.propTypes = {
};

export default PortfolioSetup;

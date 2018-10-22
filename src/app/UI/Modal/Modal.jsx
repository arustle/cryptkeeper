import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Modal extends Component {
  constructor (props) {
    super(props);


  }

  render () {
    const {
      modalOptions,
      hideModal,
    } = this.props;

    return (
      <div className="modal-open">
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalOptions.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{modalOptions.content}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" onClick={hideModal} />
      </div>
    );
  }
}


Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalOptions: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;

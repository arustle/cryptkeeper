import PropTypes from 'prop-types';
import axios from 'axios';
import { ACTIONS as UI_ACTIONS } from '../redux/actions/Ui.actions';


export const ROOT_URL = `${process.env.API_SERVER}/api/v1`;


export const UPLOAD_URL = `${ROOT_URL}/uploads`;

export const ERRORS = {
  ERROR_400_BAD_REQUEST_RESPONSE: 'errors/ERROR_400_BAD_REQUEST_RESPONSE',
  ERROR_429_TOO_MANY_REQUESTS: 'errors/ERROR_429_TOO_MANY_REQUESTS',
  ERROR_UNAUTHORIZED_RESPONSE: 'errors/ERROR_UNAUTHORIZED_RESPONSE',
};


export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};


export const axiosInstance = axios.create({
  headers,
});


export function onCatch ({ response }) {
  // console.log('error', response);

  switch (response.status) {
    case 400:
      return ({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR 400: Bad Request',
          content: JSON.stringify(response.data, null, 4),
        },
      });
    case 429:
      return ({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR 429: Too Many Requests',
          content: JSON.stringify(response.data, null, 4),
        },
      });
    default:
      return ({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'API ERROR',
          content: JSON.stringify(response.data, null, 4),
        },
      });
  }
}

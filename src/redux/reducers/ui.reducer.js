
import { fromJS, Map, List } from 'immutable';
import { ACTIONS as UI_ACTIONS } from '../actions/Ui.actions';

const initialState = {
  isModalVisible: false,
  modalOptions: null,
  appIsLoading: false,
  loaders: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  let newLoaders;

  switch (type) {
    case UI_ACTIONS.INCREMENT_LOADER:
      newLoaders = state.loaders.map(x => (x));
      newLoaders.push(payload);
      return Object.assign({}, state, {
        loaders: newLoaders,
      });
    case UI_ACTIONS.DECREMENT_LOADER:
      return Object.assign({}, state, {
        loaders: state.loaders.filter(x => (x !== payload)),
      });

    case UI_ACTIONS.SHOW_MODAL:
      return Object.assign({}, state, {
        isModalVisible: true,
        modalOptions: payload,
      });
    case UI_ACTIONS.HIDE_MODAL:
      return Object.assign({}, state, {
        isModalVisible: false,
        modalOptions: null,
      });

    default:
      return state;
  }
}

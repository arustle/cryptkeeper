
import { ACTIONS } from '../actions/Session.actions';

const initialState = {
};

export default (state = initialState, action) => {
  const { type, payload } = action;


  switch (type) {


    default:
      return state;
  }
}

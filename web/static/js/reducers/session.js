import Constants from '../constants';

const initialState = {
  currentUser: null,
  socket: null,
  channel: null,
  error: null
};

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case Constants.CURRENT_USER:
      return { ...state, currentUser: action.currentUser, socket: action.socket, channel: action.channel, errro: null };

    case Constants.SESSIONS_ERROR:
      return { ...state, error: action.error };

    case Constants.USER_SIGNED_OUT:
      return initialState;

    default:
      return state;
  }
}

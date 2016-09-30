import { routeActions }                   from 'react-router-redux';
import Constants                          from '../constants';
import { Socket }                         from 'phoenix';
import { httpGet, httpPost, httpDelete }  from '../utils';

export function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user
  });

  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') }
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  channel.on('boards:add', (msg) => {
    dispatch({
      type: Constants.BOARDS_ADDED,
      board: msg.board
    });
  });

  channel.join().receive('ok', () => {
    dispatch({
      type: Constants.SOCKET_CONNECTED,
      socket: socket,
      channel: channel
    });
  });
};

const Actions = {};

Actions.signIn = (email, password) => {
  return dispatch => {
    const data = {
      session: {
        email: email,
        password: password
      }
    };

    httpPost('/api/v1/sessions', data)
    .then((data) => {
      localStorage.setItem('phoenixAuthToken', data.jwt);
      setCurrentUser(dispatch, data.user);
      dispatch(routeActions.push('/'));
    })
    .catch((error) => {
      error.response.json()
      .then((errorJSON) => {
        dispatch({
          type: Constants.SESSIONS_ERROR,
          error: errorJSON.error
        });
      });
    });
  };
};

Actions.currentUser = () => {
  return dispatch => {
    httpGet('/api/v1/current_user')
    .then(function(data) {
      setCurrentUser(dispatch, data);
    })
    .catch(function(error) {
      console.log(error);
      dispatch(routeActions.push('/sign_in'));
    });
  };
};

Actions.signOut = () => {
  return dispatch => {
    httpDelete('/api/v1/sessions')
    .then((data) => {
      localStorage.removeItem('phoenixAuthToken');

      dispatch({
        type: Constants.USER_SIGNED_OUT
      });

      dispatch(routeActions.push('/sign_in'));
    })
    .catch(function(error) {
      console.log(error);
    });
  };
};

export default Actions;

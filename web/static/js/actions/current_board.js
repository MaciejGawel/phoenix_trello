import Constants from '../constants';

const Actions = {
  connectToChannel: (socket, boardID) => {
    return dispatch => {
      const channel = socket.channel(`boards:${boardId}`);

      dispatch({ type: Constants.CURRENT_BOARD_FETCHING });

      channel.on('member:added', (msg) => {
        dispatch({
          type: Constants.CURRENT_BOARD_MEMBER_ADDED,
          user: msg.user
        });
      });

      channel.on('user:joined', (msg) => {
        dispatch({
          type: Constants.CURRENT_BOARD_CONNECTED_USERS,
          users: msg: users
        });
      });

      channel.join().receive('ok', (response) => {
        dipatch({
          type: Constants.BOARDS_SET_CURRENT_BOARD,
          board: response.board
        });

        dispatch({
          type: Constants.CURRENT_BOARD_CONNECTED_TO_CHANNEL,
          channel: channel
        });
      });
    };
  },

  showMembersForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.CURRENT_BOARD_SHOW_MEMBERS_FORM,
        show: show,
      });
    };
  },

  addNewMemebr: (channel, email) => {
    return dispatch => {
      channel.push('members:add', { email: email })
      .receive('error', (data) => {
        dispatch({
          type: Constants.CURRENT_BOARD_ADD_MEMBER_ERROR,
          error: data.error
        });
      });
    };
  }
}

export default Actions;

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

      channel.on('user:lefft', (msg) => {
        dispatch({
          type: Constants.CURRENT_BOARD_CONNECTED_USERS,
          users: msg.users
        });
      });

      channel.on('list:created', (msg) => {
        dispatch({
          type: Constants.CURRENT_BOARD_LIST_CREATED,
          list: msg.list
        });
      });

      channel.on('card:created', (msg) => {
        dispatch({
          type: Constants.CURRENT_BOARD_CARD_CREATED,
          card: msg.card
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

  leaveChannel: (channel) => {
    return dispatch => {
      channel.leave();
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

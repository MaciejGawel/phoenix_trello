import Constants from '../constants';

const Actions = {
  connectToChannel: (socket, boardID) => {
    return dispatch => {
      const channel = socket.channel(`boards:${boardId}`);

      dispatch({ type: Constants.CURRENT_BOARD_FETCHING });

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
  }
}

export default Actions;
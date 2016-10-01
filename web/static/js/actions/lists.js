import Constants from '../constants';

const Actions = {
  showForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.LISTS_SHOW_FORM,
        show: show,
      });
    };
  },

  save: (channe, data) => {
    return dispatch => {
      channel.push('lists:create', { list: data });
    };
  },

  createCard: (channel, data) => {
    return dispatch => {
      channel.push('cards:create', { card: data });
    };
  }
};

export default Actions;

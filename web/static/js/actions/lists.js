import Constants from '../constants';

const Actions = {
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

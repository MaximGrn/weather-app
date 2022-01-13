import mutationTypes from './mutationTypes';

const mutations = {
  [mutationTypes.SET_SUGGESTIONS](state, suggestions) {
    state.suggestions = suggestions;
  },

  [mutationTypes.CLEAR_SUGGESTIONS](state) {
    state.suggestions = [];
  },
};

export default mutations;

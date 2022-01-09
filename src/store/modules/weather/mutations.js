import mutationTypes from './mutationTypes';

const mutations = {
  [mutationTypes.SET_DAILY_FORECAST](state, forecast) {
    state.dailyForecast = forecast;
  },

  [mutationTypes.SET_WEEKLY_FORECAST](state, forecast) {
    state.weeklyForecast = forecast;
  },
};

export default mutations;

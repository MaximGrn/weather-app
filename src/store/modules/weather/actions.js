/* eslint-disable no-console */
import axios from 'axios';
import { API_KEYS, URLS } from 'Constants';
import { getDataFromDailyWeather } from 'Utils/getDataFromDailyWeather';
import { getDataFromWeeklyWeather } from 'Utils/getDataFromWeeklyWeather';
import mutationTypes from './mutationTypes';
import state from './state';

const actions = {
  async getDailyForecast({ commit }, { lat = '', lon = '' }) {
    try {
      const response = await axios.get(`${URLS.WEATHER}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEYS.WEATHER_KEY}
      `);
      const daily = { ...getDataFromDailyWeather(response.data) };

      commit(mutationTypes.SET_DAILY_FORECAST, daily);
    } catch (error) {
      console.log(error);
    }
  },

  async getWeeklyForecast({ commit }, { lat = '', lon = '' }) {
    try {
      const response = await axios.get(`${URLS.WEATHER}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEYS.WEATHER_KEY}
      `);
      const weekly = getDataFromWeeklyWeather(response.data.daily);

      commit(mutationTypes.SET_WEEKLY_FORECAST, weekly);
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;

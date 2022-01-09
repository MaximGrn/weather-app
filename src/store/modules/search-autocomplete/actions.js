/* eslint-disable no-console */
import axios from 'axios';
import { API_KEYS } from 'Constants';
import { getDataFromGeo } from 'Utils/getDataFromGeo';
import mutationTypes from './mutationTypes';

const actions = {
  async getCitiesSuggestions({ commit }, { query = '' }) {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}
      &lang=en&limit=20&type=city&format=json&apiKey=${API_KEYS.PLACE_AUTOCOMPLETION_KEY}`);

      commit(mutationTypes.SET_SUGGESTIONS, getDataFromGeo(response.data));
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;

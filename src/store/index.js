import { createStore } from 'vuex';

export default createStore({
  state: {
    dogData: [],
    loading: true
  },
  mutations: {
    setDogData(state, data) {
      state.dogData = data;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    async fetchDogData({ commit }) {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const responseData = await response.json();
        const breeds = Object.keys(responseData.message);

        const data = [];
        for (const breed of breeds) {
          const breedResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
          const breedData = await breedResponse.json();
          const breedImage = breedData.message;

          data.push({ name: breed, image: breedImage });
        }

        commit('setDogData', data);
        commit('setLoading', false);
      } catch (error) {
        console.error('Error fetching dog data:', error);
        commit('setLoading', false);
      }
    }
  },
  getters: {
    getDogData(state) {
      return state.dogData;
    },
    isLoading(state) {
      return state.loading;
    }
  }
});

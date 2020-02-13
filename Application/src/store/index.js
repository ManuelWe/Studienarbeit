import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    images: [],
  },
  mutations: {
    SAVE_PRODUCTS(state, products) {
      state.products = [];
      products.forEach((product) => {
        state.products.push(product.fields);
      });
    },
    SAVE_IMAGES(state, images) {
      state.images = images;
    },
  },
  actions: {
    saveProducts({ commit }, products) {
      commit('SAVE_PRODUCTS', products);
    },
    saveImages({ commit }, images) {
      commit('SAVE_IMAGES', images);
    },
  },
  getters: {
    getProductByArtNr: state => ArtNr => state.products.find(product => product.ArtNr === ArtNr),
    getImageByArtNr: state => (ArtNr) => {
      const image = state.images.find(img => img.ArtNr === ArtNr);
      if (image === undefined) {
        return state.images.find(img => img.ArtNr === 'default').base64;
      }
      return image.base64;
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
    images: [],
    filters: null,
  },
  mutations: {
    SAVE_PRODUCTS(state, products) {
      state.products = [];
      products.forEach((product) => {
        state.products.push(product.fields);
      });
    },
    SAVE_FILTERED_PRODUCTS(state, products) {
      state.filteredProducts = products;
    },
    SAVE_IMAGES(state, images) {
      state.images = images;
    },
    SAVE_FILTERS(state, filters) {
      state.filters = filters;
    },
  },
  actions: {
    saveProducts({ commit }, products) {
      commit('SAVE_PRODUCTS', products);
    },
    saveFilteredProducts({ commit }, products) {
      commit('SAVE_FILTERED_PRODUCTS', products);
    },
    saveImages({ commit }, images) {
      commit('SAVE_IMAGES', images);
    },
    saveFilters({ commit }, filters) {
      commit('SAVE_FILTERS', filters);
    },
  },
  getters: {
    getProducts: (state) => state.products,
    getProductByArtNr: (state) => (ArtNr) => state.products.find(
      (product) => product.ArtNr === ArtNr,
    ),
    getFilteredProducts: (state) => state.filteredProducts,
    getImageByArtNr: (state) => (ArtNr) => {
      const image = state.images.find((img) => img.ArtNr === ArtNr);
      if (image === undefined) {
        try {
          return state.images.find((img) => img.ArtNr === 'default').url;
        } catch (e) {
          return null;
        }
      }
      return image.url;
    },
    getFilters: (state) => state.filters,
  },
});

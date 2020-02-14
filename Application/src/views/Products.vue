<template>
  <div id="products">
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(product, index) in productsDisplayed"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet is-half-mobile"
      >
        <ProductCard :product="products[index]" />
      </div>
      <infinite-loading @infinite="infiniteHandler" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    ProductCard,
    InfiniteLoading,
  },
  data() {
    return {
      productsDisplayed: 8,
    };
  },
  computed: {
    ...mapState(['products']),
  },
  methods: {
    infiniteHandler($state) {
      if (this.productsDisplayed <= this.products.length - 4) {
        this.productsDisplayed += 4;
        $state.loaded();
      } else if (this.productsDisplayed < this.products.length) {
        this.productsDisplayed = this.products.length();
        $state.complete();
      }
      if (this.productsDisplayed === this.products.length) {
        $state.complete();
      }
    },
  },
};
</script>

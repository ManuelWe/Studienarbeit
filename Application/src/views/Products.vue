<template>
  <div id="products">
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet is-half-mobile"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  computed: {
    ...mapState(['products']),
  },
};
</script>

<template>
  <div id="products">
    <div class="columns is-multiline">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import idbs from '../services/IndexedDB/ProductsService';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    idbs.getAll().then((products) => {
      this.products = products;
    });
  },
};
</script>

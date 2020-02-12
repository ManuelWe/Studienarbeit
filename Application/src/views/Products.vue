<template>
  <div class="products">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="col-md-4"
          >
            <ProductCard :product="product" />
          </div>
        </div>
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

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
import ProductsService from '../services/ProductsService';
import ProductCard from '../components/ProductCard.vue';

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
    this.getProducts();
  },
  methods: {
    getProducts() {
      ProductsService.getProducts().then((response) => {
        console.log(response);
        this.products = response.data.items;
      });
    },
  },
};
</script>

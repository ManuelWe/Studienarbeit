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
import ProductsService from '../services/API/ProductsService';
import ImagesService from '../services/API/ImagesService';
import ProductCard from '../components/ProductCard.vue';
import idbs from '../services/IndexedDB/ProductsService';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      test: null,
    };
  },
  created() {
    this.getProducts();
    this.getImages();
  },
  methods: {
    getProducts() {
      ProductsService.getProducts().then((response) => {
        console.log(response);
        this.products = response.data.items;
        idbs.save(response.data.items);
      });
    },
    getImages() {
      ImagesService.getImages().then((response) => {
        this.test = response.data.items[0].fields.file.url;
      });
    },
  },
};
</script>

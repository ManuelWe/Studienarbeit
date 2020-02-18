<template>
  <div id="products">
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(product, index) in productsDisplayed"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet is-half-mobile"
      >
        <ProductCard :product="products[index].fields" />
      </div>
      <infinite-loading @infinite="infiniteHandler" />
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ProductCard from '../components/ProductCard.vue';
import ProductsService from '../services/ProductsService';
import ImagesService from '../services/ImagesService';

export default {
  components: {
    ProductCard,
    InfiniteLoading,
  },
  data() {
    return {
      products: [],
      productsDisplayed: 0,
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
        this.productsDisplayed = 8;
        this.$store.dispatch('saveProducts', response.data.items);
      });
    },
    getImages() {
      ImagesService.getImages().then((response) => {
        const imagesArray = [];
        response.data.items.forEach((image) => {
          imagesArray.push({ ArtNr: image.fields.title, url: image.fields.file.url });
        });
        this.$store.dispatch('saveImages', imagesArray);
      });
    },
    infiniteHandler($state) {
      if (this.productsDisplayed <= this.products.length - 8) {
        this.productsDisplayed += 8;
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

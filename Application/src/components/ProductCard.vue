<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: 'product', params: {ArtNr: product.ArtNr}}"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by2">
            <img
              :src="productImage"
              :alt="product.Artikelbezeichnung"
            >
          </figure>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            {{ product.Artikelbezeichnung }}
          </a>
        </footer>
      </div>
    </router-link>
  </div>
</template>

<script>
import ImagesDB from '../services/IndexedDB/ImagesService';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productImage: null,
    };
  },
  created() {
    ImagesDB.getOne(this.product.ArtNr).then((image) => {
      if (image === undefined) {
        ImagesDB.getOne('default').then((defaultImg) => {
          this.productImage = defaultImg.base64;
        });
      } else {
        this.productImage = image.base64;
      }
    });
  },
};
</script>

<style scoped>
.router-link, .router-link:hover {
  color: inherit;
}
</style>

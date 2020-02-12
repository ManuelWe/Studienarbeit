<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: 'product', params: {ArtNr: product.ArtNr}}"
    >
      <b-card
        :title="product.Artikelbezeichnung"
        :img-src="productImage"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Kurzer Text
        </b-card-text>
      </b-card>
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

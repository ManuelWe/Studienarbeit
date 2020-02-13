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
  computed: {
    getImage() {
      return this.$store.getters.getImageByArtNr;
    },
  },
  created() {
    this.productImage = this.getImage(this.product.ArtNr);
  },
};
</script>

<style scoped>
.router-link, .router-link:hover {
  color: inherit;
}
</style>

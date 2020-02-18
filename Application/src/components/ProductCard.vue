<template>
  <div>
    <router-link class="router-link" :to="{name: 'product', params: {ArtNr: product.ArtNr}}">
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by2">
            <img
              class="cardImage"
              src="https://images.ctfassets.net/kfibk3xh1vwb/B5SY5CYcZxbmlZWZ0XCcJ/efed3c1a56081b66d4a9fcc469c8d5f2/0100.jpg"
              :alt="product.Artikelbezeichnung"
            />
          </figure>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">{{ product.Artikelbezeichnung }}</a>
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
      required: true
    }
  },
  data() {
    return {
      productImage: null
    };
  },
  computed: {
    getImage() {
      return this.$store.getters.getImageByArtNr;
    }
  },
  created() {
    setTimeout(() => {
      this.productImage = this.getImage(this.product.ArtNr);
    }, 0);
  }
};
</script>

<style scoped>
.router-link,
.router-link:hover {
  color: inherit;
}
.card {
  border-radius: 0.5rem;
  box-shadow: 0.15rem 0.15rem 0.2rem 0.1rem rgba(0, 0, 0, 0.2),
    0 0.1rem 0.2rem 0 rgba(0, 0, 0, 0.19);
}
.cardImage {
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}
</style>

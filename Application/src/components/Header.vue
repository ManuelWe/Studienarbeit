<template>
  <b-navbar id="headerBar">
    <template slot="brand">
      <b-navbar-item tag="div">
        <button
          :style="{visibility: $route.name === 'product' ? 'visible':'hidden'}"
          class="button is-medium returnButton"
          @click="previousPage()"
        >
          <span class="icon">
            <i class="fas fa-arrow-left fa-2x" />
          </span>
        </button>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="div">
        <h1 class="is-size-2">
          {{ headerText }}
        </h1>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <span
          class="is-pulled-right is-size-6"
        >
          <i class="fas fa-history" />
          <span> {{ displayedTime }} </span>
        </span>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: {
    displayedTime: {
      type: String,
      required: true,
      default: '3min',
    },
  },
  computed: {
    headerText() {
      if (this.$route.name === 'products') return 'Backwaren';
      if (this.$route.name === 'product') {
        const queriedProduct = this.getProduct(this.$route.params.ArtNr);
        if (queriedProduct) { // if !queriedProduct it will redirect to products page anyways
          return queriedProduct.Artikelbezeichnung;
        }
      }
      if (this.$route.name === 'kreuztabelle') return 'Kreuztabelle';
      return '';
    },
    getProduct() {
      return this.$store.getters.getProductByArtNr;
    },
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#headerBar {
  border-bottom: black;
  border-width: 4px;
  border-bottom-style: double;
}
</style>

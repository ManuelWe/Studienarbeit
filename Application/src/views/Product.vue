<template>
  <div id="product">
    <h1 class="is-size-1">
      {{ product.Artikelbezeichnung }}
    </h1>
    <button
      :disabled="getFilteredProducts[0].fields.ArtNr === ArtNr"
      class="button returnButton"
      @click="lastProduct()"
    >
      <span class="icon is-small">
        <i class="fas fa-arrow-left fa-2x" />
      </span>
    </button>
    <button
      :disabled="getFilteredProducts[getFilteredProducts.length - 1].fields.ArtNr === ArtNr"
      class="button returnButton"
      @click="nextProduct()"
    >
      <span class="icon is-small">
        <i class="fas fa-arrow-right fa-2x" />
      </span>
    </button>
    <h2
      v-if="product.Produktinfo"
      class="is-size-2"
    >
      {{ product.Produktinfo }}
    </h2>
    <h3 class="is-size-3">
      Gewicht: {{ product.Artikelgewicht }}g
    </h3>
    <h5 class="is-size-5">
      Zutaten:
    </h5>
    <p>{{ product.Zutaten }}</p>
    <div class="columns">
      <div class="column">
        <figure class="image is-512x512">
          <img
            :src="getImage(ArtNr)"
          >
        </figure>
      </div>
      <div class="column">
        <NutritionalTable :product="product" />
      </div>
    </div>
    <h4 class="is-size-4">
      Allergene: {{ product.AllergeneAlle }}
    </h4>
    <h4 class="is-size-4">
      Zusatzstoffe: {{ product.ZusatzstoffeAlle }}
    </h4>
  </div>
</template>

<script>
import NutritionalTable from '@/components/NutritionalTable.vue';

export default {
  components: {
    NutritionalTable,
  },
  data() {
    return {
      ArtNr: this.$route.params.ArtNr,
      product: null,
      productImage: null,
    };
  },
  computed: {
    getProduct() {
      return this.$store.getters.getProductByArtNr;
    },
    getFilteredProducts() {
      return this.$store.getters.getFilteredProducts;
    },
    getImage() {
      return this.$store.getters.getImageByArtNr;
    },
  },
  created() {
    this.product = this.getProduct(this.ArtNr);
  },
  beforeRouteUpdate(to, from, next) {
    this.ArtNr = to.params.ArtNr;
    this.product = this.getProduct(this.ArtNr);
    next();
  },
  methods: {
    lastProduct() {
      const productIndex = this.getFilteredProducts.findIndex((x) => x.fields.ArtNr === this.ArtNr);
      this.$router.replace({
        name: 'product',
        params: {
          ArtNr: this.getFilteredProducts[productIndex - 1].fields.ArtNr,
        },
      });
    },
    nextProduct() {
      const productIndex = this.getFilteredProducts.findIndex((x) => x.fields.ArtNr === this.ArtNr);
      this.$router.replace({
        name: 'product',
        params: {
          ArtNr: this.getFilteredProducts[productIndex + 1].fields.ArtNr,
        },
      });
    },
  },
};
</script>

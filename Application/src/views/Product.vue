<template>
  <div
    v-if="product"
    id="product"
    class="columns"
  >
    <div class="column">
      <button
        :disabled="getFilteredProducts[0].fields.ArtNr === ArtNr"
        class="button navigationButton"
        @click="lastProduct()"
      >
        <span class="icon is-small">
          <i class="fas fa-arrow-left fa-2x" />
        </span>
      </button>
    </div>
    <div class="column is-10">
      <div class="columns">
        <div class="column is-7">
          <figure class="image is-512x512">
            <img
              :src="getImage(ArtNr)"
            >
          </figure>
        </div>
        <div class="column">
          <DayIndicator :baking-days="['Di', 'Sa']" />
          <h2
            v-if="product.Produktinfo"
            class="is-size-5"
          >
            {{ product.Produktinfo }}
          </h2>
          <h3 class="is-size-5">
            Gewicht: {{ product.Artikelgewicht }}g
          </h3>
          <h3 class="is-size-6">
            Allergene: {{ product.AllergeneAlle }}
          </h3>
          <h3 class="is-size-6">
            Zusatzstoffe: {{ product.ZusatzstoffeAlle }}
          </h3>
        </div>
      </div>

      <h5 class="is-size-5">
        Zutaten:
      </h5>
      <p>{{ product.Zutaten }}</p>

      <div class="column">
        <NutritionalTable :product="product" />
      </div>
    </div>
    <div class="column">
      <button
        :disabled="getFilteredProducts[getFilteredProducts.length - 1].fields.ArtNr === ArtNr"
        class="button navigationButton"
        @click="nextProduct()"
      >
        <span class="icon is-small">
          <i class="fas fa-arrow-right fa-2x" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import NutritionalTable from '@/components/NutritionalTable.vue';
import DayIndicator from '@/components/DayIndicator.vue';

export default {
  components: {
    NutritionalTable,
    DayIndicator,
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
    const queriedProducts = this.getProduct(this.ArtNr);
    if (queriedProducts) {
      this.product = queriedProducts;
    } else {
      this.$router.replace({ name: 'products' });
    }
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

<style scoped>
.navigationButton {
  position: fixed;
  top: 50%;
  height: 7rem;
}
</style>

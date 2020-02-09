<template>
  <h1>{{ product }} </h1>
</template>

<script>
import idbs from '../services/IndexedDB/ProductsService';

export default {
  data() {
    return {
      ArtNr: this.$route.params.ArtNr,
      product: null,
    };
  },
  created() {
    idbs.getOne(this.ArtNr).then((product) => { this.product = product; });
  },
};
</script>

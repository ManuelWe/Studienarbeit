<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: 'product'}"
    >
      <b-card
        :title="product.fields.Artikelbezeichnung"
        img-src="https://www.packtech-gmbh.de/site/assets/files/1017/backwaren.1920x1080.jpg"
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
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.router-link, .router-link:hover {
  color: inherit;
}
</style>

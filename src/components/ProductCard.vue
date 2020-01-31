<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: 'products'}"
    >
      <b-card
        :title="product.fields.name"
        img-src="https://picsum.photos/600/300/?image=25"
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

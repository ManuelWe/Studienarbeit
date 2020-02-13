<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: 'products'}"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by2">
            <img
              src="https://unsplash.it/300/200/?random&pic=1"
              alt=""
            >
          </figure>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            {{ category }}
          </a>
        </footer>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
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

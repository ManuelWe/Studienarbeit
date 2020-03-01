<template>
  <div>
    <router-link
      class="router-link"
      :to="{name: category.link}"
      aria-label="Produkte"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-3by2">
            <img
              class="cardImage"
              :src="category.image"
              :alt="category"
            >
          </figure>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            {{ category.name }}
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

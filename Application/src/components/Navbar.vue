<template>
  <footer class="footer">
    <div class="columns is-mobile">
      <div class="column has-text-centered">
        <router-link :to="{name: 'dashboard'}">
          <button class="button">
            Home
          </button>
        </router-link>
      </div>
      <div class="column has-text-centered">
        <router-link :to="{name: 'products'}">
          <button class="button">
            Produkte
          </button>
        </router-link>
      </div>
      <div class="column has-text-centered">
        <router-link :to="{name: 'products'}">
          <button class="button">
            Allergene
          </button>
        </router-link>
      </div>
      <div class="column has-text-centered">
        <router-link :to="{name: 'products'}">
          <button class="button">
            Torten
          </button>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: gray;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
  padding: 1rem;
}
</style>

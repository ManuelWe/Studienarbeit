<template>
  <footer class="footer">
    <div class="columns">
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
            kalskdkw
          </button>
        </router-link>
      </div>
      <div class="column has-text-centered">
        <router-link :to="{name: 'products'}">
          <button class="button">
            mcnsdjdduw
          </button>
        </router-link>
      </div>
    </div>
    <!-- <div class="content centered">
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-link">
            Save changes
          </button>
        </p>
        <p class="control">
          <button class="button">
            Cancel
          </button>
        </p>
        <p class="control">
          <button class="button is-danger">
            Delete post
          </button>
        </p>
      </div> -->
    <!-- <router-link :to="{name: 'dashboard'}">
        Dashboard
      </router-link>
      <router-link :to="{name: 'products'}">
        Produkte
      </router-link>
      <router-link :to="{name: 'products'}">
        Bla
      </router-link>
      <router-link :to="{name: 'products'}">
        Da
      </router-link> -->
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

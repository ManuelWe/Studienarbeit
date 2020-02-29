<template>
  <div id="app">
    <router-view name="landingPage" />
    <section
      v-if="$router.app._route.name !== 'landingPage'"
      class="section"
    >
      <button
        v-if="$router.app._route.name !== 'dashboard'"
        class="button returnButton"
        @click="previousPage()"
      >
        <span class="icon is-small">
          <i class="fas fa-arrow-left fa-2x" />
        </span>
      </button>
      <div class="container">
        <main role="main">
          <router-view />
        </main>
        <Footer v-if="$router.app._route.name !== 'landingPage'" />
      </div>
    </section>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
  },
  mounted() {
    // for github pages; hack to enable routes for spa
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.$router.replace(path);
    }
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.returnButton {
  position: absolute;
}
</style>

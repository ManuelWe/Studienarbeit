<template>
  <div id="app">
    <section class="section">
      <button
        v-if="$router.app._route.name !== 'dashboard'"
        class="button returnButton"
        @click="lastPage()"
      >
        <span class="icon is-small">
          <i class="fas fa-arrow-left fa-2x" />
        </span>
      </button>
      <div class="container">
        <main role="main">
          <router-view />
        </main>
        <Footer />
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
    lastPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.returnButton {
  position: absolute;
}
</style>

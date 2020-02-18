<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <Footer />
        <main role="main">
          <router-view />
        </main>
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
  // for github pages; hack to enable routes for spa
  mounted() {
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.$router.replace(path);
    }
  },
};
</script>

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
  mounted() {
    // for github pages; hack to enable routes for spa
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.$router.replace(path);
    }

    // import font awesome script
    const faScript = document.createElement('script');
    faScript.setAttribute('src', 'https://use.fontawesome.com/releases/v5.3.1/js/all.js');
    faScript.setAttribute('SameSite', 'none Secure');
    document.head.appendChild(faScript);
  },
};
</script>

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
import ProductsService from '@/services/ProductsService';
import ImagesService from '@/services/ImagesService';
import ApiVersionService from '@/services/ApiVersionService';
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
  },
  created() {
    setInterval(() => this.getApiVersion(), 1000); // TODO: check timing
  },
  mounted() {
    this.inactivityTimer();

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
    inactivityTimer() {
      let time;
      const localThis = this;

      function redirect() {
        if (localThis.$router.app._route.name !== 'landingPage') { // eslint-disable-line
          localThis.$router.push({ name: 'landingPage' });
        }
      }

      function resetTimer() {
        clearTimeout(time);
        time = setTimeout(redirect, 20000); // TODO: check time
      }

      window.onload = resetTimer;
      // DOM Events
      document.onmousemove = resetTimer;
      document.onkeypress = resetTimer;
    },
    getApiVersion() {
      ApiVersionService.getApiVersion().then((response) => {
        const apiVersion = response.data.fields.version;
        if (localStorage.getItem('apiVersion') === null) {
          localStorage.setItem('apiVersion', apiVersion);
        } else if (localStorage.getItem('apiVersion') < apiVersion) {
          this.getProducts();
          this.getImages();
          localStorage.setItem('apiVersion', apiVersion);
        }
      }).catch((e) => this.$buefy.toast.open({
        duration: 4000,
        message: e,
        type: 'is-danger',
      }));
    },
    getProducts() {
      ProductsService.getProducts().then((response) => {
        this.$store.dispatch('saveProducts', response.data.items);
      });
    },
    getImages() {
      ImagesService.getImages().then((response) => {
        const imagesArray = [];
        response.data.items.forEach((image) => {
          imagesArray.push({ ArtNr: image.fields.title, url: image.fields.file.url });
        });
        this.$store.dispatch('saveImages', imagesArray);
      });
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

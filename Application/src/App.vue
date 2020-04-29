<template>
  <div id="app">
    <router-view name="landingPage" />
    <section
      v-if="$route.name !== 'landingPage'"
      class="section"
    >
      <button
        v-if="$route.name !== 'dashboard'"
        class="button returnButton"
        @click="previousPage()"
      >
        <span class="icon is-small">
          <i class="fas fa-arrow-left fa-2x" />
        </span>
      </button>
      <h4
        v-show="showTimer"
        class="is-pulled-right has-text-danger is-size-4"
      >
        {{ timer }}
      </h4>
      <div class="container">
        <main role="main">
          <router-view />
        </main>
        <Footer v-if="$route.name !== 'landingPage'" />
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
  data() {
    return {
      timerLength: 25, // TODO: check time
      timer: this.timerLength,
      showTimer: false,
    };
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
      const redirect = () => {
        if (this.$route.name !== 'landingPage') {
          this.$router.push({ name: 'landingPage' });
        }
      };

      const resetTimer = () => {
        this.timer = this.timerLength;
        this.showTimer = false;
      };

      setInterval(() => {
        if (this.$route.name !== 'landingPage') {
          this.timer -= 1;
          if (this.timer < 10) {
            this.showTimer = true;
            if (this.timer === 0) {
              redirect();
            }
          }
        }
      }, 1000);

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

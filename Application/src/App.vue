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
      <span
        class="is-pulled-right is-size-4"
      >
        <i class="fas fa-history" />
        <span> {{ displayedTime }}</span>
      </span>
      <div class="container">
        <main role="main">
          <router-view />
        </main>
        <Footer v-if="$route.name !== 'landingPage'" />
      </div>
    </section>
    <b-modal
      :active.sync="showTimeoutModal"
      has-modal-card
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Rückkehr zur Startseite
          </p>
        </header>
        <section class="modal-card-body">
          Zurück zur Startseite in 20 Sekunden!
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-info"
            @click="showTimeoutModal = false"
          >
            Noch nicht
          </button>
        </footer>
      </div>
    </b-modal>
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
      timerLength: 180, // TODO: check time
      timer: this.timerLength,
      displayedTime: 3, // TODO: check time (Math.trunc(timerLength / 60))
      showTimeoutModal: false,
    };
  },
  created() {
    setInterval(() => this.getApiVersion(), 1000); // TODO: check timing
  },
  mounted() {
    this.inactivityTimer();

    // hack to enable routes for spa when deployed to github pages
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
          this.showTimeoutModal = false;
          this.$router.push({ name: 'landingPage' });
        }
      };

      const resetTimer = () => {
        this.timer = this.timerLength;
      };

      setInterval(() => {
        if (this.$route.name !== 'landingPage') {
          this.timer -= 1;
          this.displayedTime = Math.trunc(this.timer / 60) + 1;
          if (this.timer < 61) {
            this.displayedTime = this.timer;
            if (this.timer === 21) {
              this.showTimeoutModal = true;
            } else if (this.timer === 0) {
              redirect();
            }
          }
        }
      }, 1000);

      window.onload = resetTimer;
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

.modal-card-foot {
  justify-content: flex-end;
}
</style>

<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <Navbar />
        <main role="main">
          <router-view />
        </main>
        <img
          id="test"
          :src="test"
        >
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import ProductsService from './services/API/ProductsService';
import ImagesService from './services/API/ImagesService';
import ProductsDB from './services/IndexedDB/ProductsService';
import ImagesDB from './services/IndexedDB/ImagesService';


export default {
  components: {
    Navbar,
  },
  data() {
    return {
      test: null,
    };
  },
  // for github pages; hack to enable routes for spa
  mounted() {
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.$router.replace(path);
    }
  },
  created() {
    this.getProducts();
    this.getImages();
  },
  methods: {
    getProducts() {
      ProductsService.getProducts().then((response) => {
        console.log(response);
        this.$store.dispatch('saveProducts', response.data.items);
        ProductsDB.save(response.data.items);
      });
    },
    getImages() {
      ImagesService.getImages().then((response) => {
        const base64Images = [];

        response.data.items.forEach((image) => {
          this.convertImgToBase64URL(image.fields.file.url, (base64Img) => {
            base64Images.push({ ArtNr: image.fields.title, base64: base64Img });
          });
        });
        this.$store.dispatch('saveImages', base64Images);
        ImagesDB.save(base64Images);
      });
    },
    convertImgToBase64URL(url, callback, outputFormat) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    },

  },
};
</script>

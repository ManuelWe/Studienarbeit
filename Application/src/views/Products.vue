<template>
  <div id="products">
    <b-field horizontal>
      <p class="control has-icons-left">
        <input
          v-model="searchString"
          class="input"
          aria-label="Suchfeld"
          placeholder="Search..."
          type="search"
          icon-pack="fas"
          icon="search"
        >
        <span class="icon is-left">
          <i class="fas fa-search fa-2x" />
        </span>
      </p>
      <p class="control">
        <b-dropdown
          v-model="selectedFilters"
          multiple
          aria-role="list"
        >
          <button
            slot="trigger"
            class="button is-primary"
            type="button"
          >
            <span>Filter ({{ selectedFilters.length }})</span>
            <b-icon icon="menu-down" />
          </button>

          <b-dropdown-item
            v-for="(option, index) in filterOptions"
            :key="index"
            :value="option"
            aria-role="listitem"
          >
            <span>{{ option }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </p>
      <p class="control">
        {{ filteredProducts.length }} Produkte
      </p>
    </b-field>
    <p>{{ selectedFilters }}</p>

    <div class="columns is-multiline is-mobile">
      <div
        v-for="(product, index) in productsDisplayed"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet is-half-mobile"
      >
        <ProductCard :product="filteredProducts[index].fields" />
      </div>
      <infinite-loading
        @infinite="infiniteHandler"
      >
        <div slot="spinner" />
        <div slot="no-more" />
        <div slot="no-results" />
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ProductCard from '../components/ProductCard.vue';
import ProductsService from '../services/ProductsService';
import ImagesService from '../services/ImagesService';
import store from '../store/index';

export default {
  components: {
    ProductCard,
    InfiniteLoading,
  },
  data() {
    return {
      products: [],
      productsDisplayed: 0,
      searchString: '',
      selectedFilters: [],
      filterOptions: ['Ballaststoffarm X',
        'Ballaststoffreich X',
        'Bio X',
        'Dinkelbrot',
        'Eiweißreich X',
        'Glutenfrei X',
        'Haltbarkeit X',
        'Hefefrei',
        'Kalorienarm X',
        'Kalorienreich X',
        'Low Carb (Kohlenhydratearm) X',
        'Roggenbrot X',
        'Urkorn',
        'Vegan X',
        'Vollkorn X',
        'Weizenbrot',
        'Zuckerfrei X'],
    };
  },
  computed: {
    filteredProducts() {
      const search = this.searchString.toLowerCase().trim();
      let filteredProducts = [];

      if (search) {
        filteredProducts = this.products.filter(
          (c) => c.fields.Artikelbezeichnung.toLowerCase().indexOf(search) > -1,
        );
      } else {
        filteredProducts = this.products;
      }

      if (this.selectedFilters.length) {
        filteredProducts = filteredProducts.filter((e) => {
          let productContained = false;
          this.selectedFilters.forEach((option) => {
            if (option === 'Dinkelbrot') {
              if (e.fields.Zutaten.toLowerCase().includes('dinkelmehl')) productContained = true;
            }
            if (option === 'Weizenbrot') { // TODO sinvolle option??????
              if (e.fields.Zutaten.toLowerCase().includes('weizenmehl')) productContained = true;
            }
            if (option === 'Hefefrei') { // TODO sinvoll?
              if (!e.fields.Zutaten.toLowerCase().includes('hefe')) productContained = true;
            }
            if (option === 'Urkorn') {
              if (e.fields.Zutaten.toLowerCase().includes('urkorn')) productContained = true;
            }
          });
          return productContained;
        });
      }
      this.$store.dispatch('saveFilteredProducts', filteredProducts);
      this.$store.dispatch('saveFilters', {
        searchString: this.searchString, filters: this.selectedFilters,
      });
      return filteredProducts;
    },
  },
  watch: {
    filteredProducts() {
      if (this.productsDisplayed > this.filteredProducts.length) {
        this.productsDisplayed = this.filteredProducts.length;
      } else if (this.filteredProducts.length > 12) {
        this.productsDisplayed = 12;
      } else {
        this.productsDisplayed = this.filteredProducts.length;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'product') {
      const existingFilters = store.getters.getFilters;
      next((vm) => {
        vm.searchString = existingFilters.searchString; // eslint-disable-line no-param-reassign
        vm.selectedFilters = existingFilters.filters; // eslint-disable-line no-param-reassign
      });
    } else {
      next();
    }
  },
  created() {
    this.getProducts();
    this.getImages();
  },
  methods: {
    sortProducts() {
      function compare(a, b) {
        if (a.fields.Artikelbezeichnung < b.fields.Artikelbezeichnung) {
          return -1;
        }
        if (a.fields.Artikelbezeichnung > b.fields.Artikelbezeichnung) {
          return 1;
        }
        return 0;
      }

      this.products = this.products.sort(compare);
    },
    getProducts() {
      ProductsService.getProducts().then((response) => {
        console.log(response);
        this.products = response.data.items;
        this.sortProducts();
        this.productsDisplayed = 12;
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
    infiniteHandler($state) {
      if (this.productsDisplayed <= this.filteredProducts.length - 12) {
        this.productsDisplayed += 12;
        $state.loaded();
      } else if (this.productsDisplayed < this.filteredProducts.length) {
        this.productsDisplayed = this.filteredProducts.length;
        $state.complete();
      }
      if (this.productsDisplayed === this.filteredProducts.length) {
        $state.complete();
      }
    },
  },
};
</script>

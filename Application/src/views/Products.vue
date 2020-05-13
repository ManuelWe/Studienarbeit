<template>
  <div id="products">
    <b-field horizontal>
      <p class="control has-icons-left">
        <input
          v-model="searchString"
          class="input"
          aria-label="Suchfeld"
          placeholder="Suche..."
          type="search"
          icon-pack="fas"
          icon="search"
        >
        <span class="icon is-left">
          <i class="fas fa-search fa-2x" />
        </span>
      </p>
      <p class="control">
        <button
          class="button is-primary"
          type="button"
          @click="showFilterModal = true"
        >
          <span>Filter ({{ selectedFilters.length }})</span>
          <b-icon icon="menu-down" />
        </button>
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

    <goToTopButton />

    <b-modal
      :active.sync="showFilterModal"
      has-modal-card
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Filter
          </p>
        </header>
        <section class="modal-card-body">
          <b-checkbox
            v-for="(option, index) in filterOptions"
            :key="index"
            v-model="preselectedFilters"
            :native-value="option"
          >
            {{ option }}
          </b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-text"
            @click="showFilterModal = false
                    preselectedFilters = selectedFilters"
          >
            Abbrechen
          </button>
          <button
            class="button is-success"
            @click="showFilterModal = false
                    selectedFilters = preselectedFilters"
          >
            ({{ preFilteredProducts.length }}) Artikel anzeigen
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ProductCard from '../components/ProductCard.vue';
import goToTopButton from '../components/goToTopButton.vue';
import ProductsService from '../services/ProductsService';
import ImagesService from '../services/ImagesService';
import store from '../store/index';

export default {
  components: {
    ProductCard,
    goToTopButton,
    InfiniteLoading,
  },
  data() {
    return {
      products: [],
      productsDisplayed: 0,
      searchString: '',
      selectedFilters: [], // filters applied to products list
      preselectedFilters: [], // filters selected in modal but not yet applied
      showFilterModal: false,
      filterOptions: [
        'Ballaststoffarm X',
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
        'Zuckerfrei X',
      ],
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
        filteredProducts = filteredProducts.filter((product) => {
          let productContained = false;
          for (let i = 0; i < this.selectedFilters.length; i += 1) {
            if (this.checkContained(product, this.selectedFilters[i])) {
              productContained = true;
              break;
            }
          }
          return productContained;
        });
      }
      this.$store.dispatch('saveFilteredProducts', filteredProducts);
      this.$store.dispatch('saveFilters', {
        searchString: this.searchString, filters: this.selectedFilters,
      });
      return filteredProducts;
    },
    preFilteredProducts() {
      const search = this.searchString.toLowerCase().trim();
      let filteredProducts = [];

      if (search) {
        filteredProducts = this.products.filter(
          (c) => c.fields.Artikelbezeichnung.toLowerCase().indexOf(search) > -1,
        );
      } else {
        filteredProducts = this.products;
      }

      if (this.preselectedFilters.length) {
        filteredProducts = filteredProducts.filter((product) => {
          let productContained = false;
          for (let i = 0; i < this.preselectedFilters.length; i += 1) {
            if (this.checkContained(product, this.preselectedFilters[i])) {
              productContained = true;
              break;
            }
          }
          return productContained;
        });
      }
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
        if (existingFilters) {
          vm.searchString = existingFilters.searchString; // eslint-disable-line no-param-reassign
          vm.selectedFilters = existingFilters.filters; // eslint-disable-line no-param-reassign
        }
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
    checkContained(product, filterOption) {
      switch (filterOption) {
        case 'Dinkelbrot':
          if (product.fields.Zutaten.toLowerCase().includes('dinkelmehl')) return true;
          break;
        case 'Weizenbrot': // TODO sinvolle option??????
          if (product.fields.Zutaten.toLowerCase().includes('weizenmehl')) return true;
          break;
        case 'Hefefrei': // TODO sinvoll?
          if (!product.fields.Zutaten.toLowerCase().includes('hefe')) return true;
          break;
        case 'Urkorn':
          if (product.fields.Zutaten.toLowerCase().includes('urkorn')) return true;
          break;
        default:
          return false;
      }
      return false;
    },
    getProducts() {
      ProductsService.getProducts().then((response) => {
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

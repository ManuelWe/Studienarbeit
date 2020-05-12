<template>
  <div id="kreuztabelle">
    <h1 class="is-size-2">
      Tolle Kreuztabelle
    </h1>

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
          @change="filterProducts()"
        >
        <span class="icon is-left">
          <i class="fas fa-search fa-2x" />
        </span>
      </p>
      <p class="control">
        {{ filteredProducts.length }} Produkte
      </p>
    </b-field>

    <table>
      <tr>
        <th>
          Artikel
        </th>
        <th
          v-for="(allergen, index) in allergene"
          :key="index"
          class="rotate"
        >
          <div>
            <span>
              {{ allergen }}
            </span>
          </div>
        </th>
      </tr>
      <tr
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <td>{{ product.fields.Artikelbezeichnung }}</td>
        <td
          v-for="(allergen, i) in allergene"
          :key="i"
        >
          <p v-if="allergenEnthalten(product.fields.AllergeneAlle, i)">
            X
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService';

export default {
  data() {
    return {
      allergene: ['Glutenhaltiges Getreide', 'Weizen', 'Roggen',
        'Gerste', 'Hafer', 'Dinkel', 'Kamut', 'Emer', 'Schalentiere',
        'Eier', 'Fisch', 'Erdnüsse', 'Soja', 'Milch und Milchprodukte',
        'Schalenfrüchte', 'Mandeln', 'Haselnüsse', 'Walnüsse', 'Kaschu-/Cashewnüsse',
        'Pecannüsse', 'Paranüsse', 'Pistazien', 'Macadamia-/Queenslandnüsse', 'Sellerie',
        'Senf', 'Sesam', 'Schwefeldioxid und Sulfite', 'Lupine und Lupinenerzeugnisse',
        'Weichtiere und Weichtiererzeugnisse',
      ],
      products: [],
      searchString: '',
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        if (product.fields.Artikelbezeichnung.toLowerCase().includes(this.searchString)) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    allergenEnthalten(allergene, index) {
      return allergene.includes(this.allergene[index]);
    },
    getProducts() {
      ProductsService.getProducts().then((response) => {
        this.products = response.data.items;
      });
    },
  },
};
</script>

<style scoped>
th.rotate {
  height: 140px;
  white-space: nowrap;
}

th.rotate > div {
  transform:
    translate(25px, 51px)
    rotate(315deg);
  width: 30px;
}
th.rotate > div > span {
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
}
table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
}
th {
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>

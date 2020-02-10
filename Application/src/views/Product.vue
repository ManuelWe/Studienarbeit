<template>
  <div id="product">
    <h1> {{ product.Artikelbezeichnung }} </h1>
    <h2 v-if="product.Produktinfo">
      {{ product.Produktinfo }}
    </h2>
    <h3> Gewicht: {{ product.Artikelgewicht }}g</h3>
    <h5> Zutaten:</h5>
    <p> {{ product.Zutaten }}</p>
    <b-table-simple
      small
      responsive
    >
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Nährwerte:</b-th>
          <b-th>
            pro 100 g
          </b-th>
          <b-th>
            pro Portion
          </b-th>
          <b-th>
            GDA* pro 100g
          </b-th>
          <b-th>
            GDA* pro Portion
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-th variant="dark">
            Energie kJ/kcal
          </b-th>
          <b-td>
            {{ product.NWEnergiekjoulepro100g }}/{{ product.NWEnergiekcalpro100g }}
          </b-td>
          <b-td>
            {{ product.NWEnergiekjouleproStckPortion }}/{{ product.NWEnergiekcalproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDAEnergiekjoulepro100g }}
          </b-td>
          <b-td>
            {{ product.GDAEnergiekjouleproStckPortion }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-th variant="dark">
            Fett <br>
            davon gesättigte <br>
            Fettsäuren
          </b-th>
          <b-td>
            {{ product.NWFettpro100g }} <br><br>
            {{ product.NWgesFettsurenpro100g }}
          </b-td>
          <b-td>
            {{ product.NWFettproStckPortion }} <br><br>
            {{ product.NWgesFettsurenproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDAFettpro100g }} <br><br>
            {{ product.GDAgesFettsurenpro100g }}
          </b-td>
          <b-td>
            {{ product.GDAFettproStckPortion }} <br><br>
            {{ product.GDAgesFettsurenproStckPortion }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-th variant="dark">
            Kohlenhydrate <br>
            davon Zucker
          </b-th>
          <b-td>
            {{ product.NWKohlenhydratepro100g }} <br>
            {{ product.NWZuckerpro100g }}
          </b-td>
          <b-td>
            {{ product.NWKohlenhydrateproStckPortion }} <br>
            {{ product.NWZuckerproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDAKohlenhydratepro100g }} <br>
            {{ product.GDAZuckerpro100g }}
          </b-td>
          <b-td>
            {{ product.GDAKohlenhydrateproStckPortion }} <br>
            {{ product.GDAZuckerproStckPortion }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-th variant="dark">
            Eiweiß
          </b-th>
          <b-td>
            {{ product.NWEiweipro100g }}
          </b-td>
          <b-td>
            {{ product.NWEiweiproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDAEiweipro100g }}
          </b-td>
          <b-td>
            {{ product.GDAEiweiproStckPortion }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-th variant="dark">
            Salz
          </b-th>
          <b-td>
            {{ product.NWSalzpro100g }}
          </b-td>
          <b-td>
            {{ product.NWSalzproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDASalzpro100g }}
          </b-td>
          <b-td>
            {{ product.GDASalzproStckPortion }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-th variant="dark">
            Ballaststoffe
          </b-th>
          <b-td>
            {{ product.NWBallaststoffepro100g }}
          </b-td>
          <b-td>
            {{ product.NWBallaststoffeproStckPortion }}
          </b-td>
          <b-td>
            {{ product.GDABallaststoffepro100g }}
          </b-td>
          <b-td>
            {{ product.GDABallaststoffeproStckPortion }}
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot>
        <b-tr>
          <b-td
            colspan="5"
            variant="secondary"
            class="text-center"
          >
            *GDA (Guideline Daily Amount): Richtwert für die empfohlene Tageszufuhr
          </b-td>
        </b-tr>
      </b-tfoot>
    </b-table-simple>
    <h4>Allergene: {{ product.AllergeneAlle }}</h4>
    <h4>Zusatzstoffe: {{ product.ZusatzstoffeAlle }}</h4>
  </div>
</template>

<script>
import idbs from '../services/IndexedDB/ProductsService';

export default {
  data() {
    return {
      ArtNr: this.$route.params.ArtNr,
      product: null,
    };
  },
  created() {
    idbs.getOne(this.ArtNr).then((product) => { this.product = product; });
  },
};
</script>

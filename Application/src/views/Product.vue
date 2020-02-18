<template>
  <div id="product">
    <h1 class="is-size-1">
      {{ product.Artikelbezeichnung }}
    </h1>
    <h2
      v-if="product.Produktinfo"
      class="is-size-2"
    >
      {{ product.Produktinfo }}
    </h2>
    <h3 class="is-size-3">
      Gewicht: {{ product.Artikelgewicht }}g
    </h3>
    <h5 class="is-size-5">
      Zutaten:
    </h5>
    <p>{{ product.Zutaten }}</p>
    <div class="columns">
      <div class="column">
        <figure class="image is-512x512">
          <img
            :src="getImage(ArtNr)"
          >
        </figure>
      </div>
      <div class="column">
        <table class="table">
          <thead head-variant="dark">
            <tr>
              <th>Nährwerte:</th>
              <th>pro 100 g</th>
              <th>pro Portion</th>
              <th>GDA* pro 100g</th>
              <th>GDA* pro Portion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th variant="dark">
                Energie kJ/kcal
              </th>
              <td>{{ product.NWEnergiekjoulepro100g }}/{{ product.NWEnergiekcalpro100g }}</td>
              <td>
                {{ product.NWEnergiekjouleproStckPortion }}/
                {{ product.NWEnergiekcalproStckPortion }}
              </td>
              <td>{{ product.GDAEnergiekjoulepro100g }}</td>
              <td>{{ product.GDAEnergiekjouleproStckPortion }}</td>
            </tr>
            <tr>
              <th variant="dark">
                Fett
                <br>davon gesättigte
                <br>Fettsäuren
              </th>
              <td>
                {{ product.NWFettpro100g }}
                <br>
                <br>
                {{ product.NWgesFettsurenpro100g }}
              </td>
              <td>
                {{ product.NWFettproStckPortion }}
                <br>
                <br>
                {{ product.NWgesFettsurenproStckPortion }}
              </td>
              <td>
                {{ product.GDAFettpro100g }}
                <br>
                <br>
                {{ product.GDAgesFettsurenpro100g }}
              </td>
              <td>
                {{ product.GDAFettproStckPortion }}
                <br>
                <br>
                {{ product.GDAgesFettsurenproStckPortion }}
              </td>
            </tr>
            <tr>
              <th variant="dark">
                Kohlenhydrate
                <br>davon Zucker
              </th>
              <td>
                {{ product.NWKohlenhydratepro100g }}
                <br>
                {{ product.NWZuckerpro100g }}
              </td>
              <td>
                {{ product.NWKohlenhydrateproStckPortion }}
                <br>
                {{ product.NWZuckerproStckPortion }}
              </td>
              <td>
                {{ product.GDAKohlenhydratepro100g }}
                <br>
                {{ product.GDAZuckerpro100g }}
              </td>
              <td>
                {{ product.GDAKohlenhydrateproStckPortion }}
                <br>
                {{ product.GDAZuckerproStckPortion }}
              </td>
            </tr>
            <tr>
              <th variant="dark">
                Eiweiß
              </th>
              <td>{{ product.NWEiweipro100g }}</td>
              <td>{{ product.NWEiweiproStckPortion }}</td>
              <td>{{ product.GDAEiweipro100g }}</td>
              <td>{{ product.GDAEiweiproStckPortion }}</td>
            </tr>
            <tr>
              <th variant="dark">
                Salz
              </th>
              <td>{{ product.NWSalzpro100g }}</td>
              <td>{{ product.NWSalzproStckPortion }}</td>
              <td>{{ product.GDASalzpro100g }}</td>
              <td>{{ product.GDASalzproStckPortion }}</td>
            </tr>
            <tr>
              <th variant="dark">
                Ballaststoffe
              </th>
              <td>{{ product.NWBallaststoffepro100g }}</td>
              <td>{{ product.NWBallaststoffeproStckPortion }}</td>
              <td>{{ product.GDABallaststoffepro100g }}</td>
              <td>{{ product.GDABallaststoffeproStckPortion }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="5"
                variant="secondary"
                class="text-center"
              >
                *GDA (Guideline Daily Amount): Richtwert für die empfohlene Tageszufuhr
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <h4 class="is-size-4">
      Allergene: {{ product.AllergeneAlle }}
    </h4>
    <h4 class="is-size-4">
      Zusatzstoffe: {{ product.ZusatzstoffeAlle }}
    </h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ArtNr: this.$route.params.ArtNr,
      product: null,
      productImage: null,
    };
  },
  computed: {
    getProduct() {
      return this.$store.getters.getProductByArtNr;
    },
    getImage() {
      return this.$store.getters.getImageByArtNr;
    },
  },
  created() {
    this.product = this.getProduct(this.ArtNr);
  },
};
</script>

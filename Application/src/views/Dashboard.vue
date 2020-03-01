<template>
  <div id="dashboard">
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet is-half-mobile"
      >
        <DashboardCard :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from '../components/DashboardCard.vue';

export default {
  components: {
    DashboardCard,
  },
  data() {
    return {
      categories: [
        {
          name: 'Produkte',
          link: 'products',
          image: 'https://images.ctfassets.net/kfibk3xh1vwb/50Rg8FNwpVwosH38jvbfNa/3a67b516fc1ac65224f13470322d7b60/filename_english.jpg',
        },
        {
          name: 'Kreuztabelle',
          link: 'kreuztabelle',
          image: 'https://images.ctfassets.net/kfibk3xh1vwb/IxymMZ96Kxed2Nuzue84R/9220ddaaf63c649e095426928ef2f75d/Titelbild_Allergene_Nachhaltigkeit_Transparenz_680px.png',
        },
        {
          name: 'Torten',
          link: 'products',
          image: 'https://images.ctfassets.net/kfibk3xh1vwb/3gZKwUKRmefyOEt70Ne9p/f7a102c5e6af2ec0a202ced301fe4cba/melissa-walker-horn-4on47p0-bk4-unsplash.jpg',
        },
        {
          name: 'Platzhalter',
          link: 'products',
          image: 'https://images.ctfassets.net/kfibk3xh1vwb/57Cx6ePLcjx2Oj0RuDjdYu/baef7927871dc97cb328cdf3761a0fa0/jules-bassoleil-VW-pFREtl0k-unsplash.jpg',
        },
        {
          name: 'Sonstiges',
          link: 'products',
          image: 'https://images.ctfassets.net/kfibk3xh1vwb/57Cx6ePLcjx2Oj0RuDjdYu/baef7927871dc97cb328cdf3761a0fa0/jules-bassoleil-VW-pFREtl0k-unsplash.jpg',
        },
      ],
    };
  },
};
</script>

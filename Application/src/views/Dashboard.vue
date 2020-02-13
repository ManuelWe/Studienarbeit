<template>
  <div id="dashboard">
    <div class="columns is-multiline">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="column is-one-quarter-desktop is-half-tablet"
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
      categories: ['Produkte', 'Rest', 'Bla', 'lala', '123'],
    };
  },
};
</script>

<template>
  <div class="dashboard">
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="col-md-4"
          >
            <DashboardCard :category="category" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';

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

<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="div">
        <button
          :style="{visibility: $route.name !== 'dashboard' ? 'visible':'hidden'}"
          class="button returnButton"
          @click="previousPage()"
        >
          <span class="icon is-small">
            <i class="fas fa-arrow-left fa-2x" />
          </span>
        </button>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="div">
        <h1 class="is-size-3">
          {{ headerText }}
        </h1>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <span
          class="is-pulled-right is-size-6"
        >
          <i class="fas fa-history" />
          <span> {{ displayedTime }} </span>
        </span>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: {
    displayedTime: {
      type: String,
      required: true,
      default: '3min',
    },
  },
  computed: {
    headerText() {
      if (this.$route.name === 'dashboard') return 'Übersicht';
      if (this.$route.name === 'products') return 'Backwaren';
      if (this.$route.name === 'product') return 'Produkt Name??';
      if (this.$route.name === 'kreuztabelle') return 'Kreuztabelle';
      return '';
    },
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
  },
};
</script>

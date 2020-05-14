<template>
  <button
    v-show="showToTopButton"
    id="toTopButton"
    @click="goToTop()"
  >
    <span
      class="icon is-small"
      style="color: white"
    >
      <i class="fas fa-chevron-up fa-2x" />
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      showToTopButton: false,
    };
  },
  created() {
    window.onscroll = () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        this.showToTopButton = true;
      } else {
        this.showToTopButton = false;
      }
    };
  },
  methods: {
    goToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>


<style scoped>
#toTopButton {
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  border-style: solid;
  border-color: black;
  outline: none;
  cursor: pointer;
  bottom: 14%;
  right: 3%;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>

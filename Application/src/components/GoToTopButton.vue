<template>
  <button
    v-show="showToTopButton"
    id="toTopButton"
    @click="goToTop()"
  >
    <span
      class="icon"
      style="color: white"
    >
      <i class="fas fa-chevron-up fa-3x" />
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
  background-color: rgba(0,0,0,0.7);
  position: fixed;
  border-style: none;
  outline: none;
  cursor: pointer;
  bottom: 14%;
  right: 3%;
  height: 3rem;
  width: 3rem;
  border-radius: 4px;
}
</style>

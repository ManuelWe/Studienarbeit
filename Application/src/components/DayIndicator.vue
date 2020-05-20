<template>
  <div id="dayIndicator">
    <h3 class="is-size-4">
      Backtage:
    </h3>
    <div
      id="circleWrapper"
      class="field is-grouped"
    >
      <span
        v-for="(day, index) in days"
        :key="index"
        class="control circle is-size-6"
        :style="{'background-color': checkContained(day)?'rgb(50, 252, 60)':'rgb(252, 56, 56)'}"
      >{{ day }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bakingDays: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    };
  },
  methods: {
    checkContained(day) {
      if (this.bakingDays.includes(day)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.circle {
  height: 30px;
  width: 30px;
  background-color: rgb(221, 221, 221);
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;       /* The same as height */
  font-size: 30px;
}
#circleWrapper {
  padding: 0.5rem;
  border-style: solid;
}
</style>

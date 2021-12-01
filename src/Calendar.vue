<template>
  <div class="parent">
    <div></div>
    <tree
      v-for="day in this.$store.state.days"
      v-bind:key="`tree${day.id}`"
      v-bind:id="day.id"
      v-bind:x="day.x"
      v-bind:y="day.y"
      v-bind:langs="day.langs"
      v-bind:width="135"
    >
    </tree>
    <snowflakes></snowflakes>
    <about></about>
  </div>
</template>

<script>
import about from "./About.vue";
import tree from "./Tree.vue";
import snowflakes from "./Snowflakes.vue";

export default {
  components: {
    about,
    tree,
    snowflakes,
  },
};
</script>

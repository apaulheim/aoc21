<template>
  <div class="parent">
    <div>{{ message }}</div>
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
let message = "";

const get = async () => {
  const res = await fetch("/api/aocinput");
  console.log("res", res);
  const j = await res.json();
  console.log("res.json", j);
  const { text } = j;
  message = text;
};
get();

export default {
  components: {
    about,
    tree,
    snowflakes,
  },
};
</script>

<template>
  <div class="parent">
    <tree
      v-for="(item, index) in days"
      v-bind:key="`tree${index}`"
      v-bind:x="item.x"
      v-bind:y="item.y"
      v-bind:index="index"
    >
    </tree>
    <snowflakes></snowflakes>
    <about></about>
  </div>
</template>

<script>
import About from "./About.vue";
import Tree from "./Tree.vue";
import Snowflakes from "./Snowflakes.vue";

export default {
  components: {
    about: About,
    tree: Tree,
    snowflakes: Snowflakes,
  },
  data() {
    return {
      days: [
        { x: 3, y: 3 }, // 1
        { x: 50, y: 70 }, // 2
        { x: 8, y: 70 }, // 3
        { x: 73, y: 70 }, // 4
        { x: 10, y: 20 }, // 5
        { x: 63, y: 4 }, // 6
        { x: 40, y: 30 }, // 7
        { x: 90, y: 15 }, // 8
        { x: 70, y: 30 }, // 9
        { x: 30, y: 5 }, // 10
        { x: 50, y: 3 }, // 11
        { x: 80, y: 3 }, // 12
        { x: 60, y: 41 }, // 13
        { x: 30, y: 40 }, // 14
        { x: 90, y: 40 }, // 15
        { x: 18, y: 5 }, // 16
        { x: 40, y: 70 }, // 17
        { x: 80, y: 50 }, // 18
        { x: 63, y: 70 }, // 19
        { x: 20, y: 30 }, // 20
        { x: 27, y: 75 }, // 21
        { x: 20, y: 70 }, // 22
        { x: 40, y: 3 }, // 23
        { x: 3, y: 40 }, // 24
      ],
    };
  },
};
</script>

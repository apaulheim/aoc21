<template>
  <router-link :to="`/day/${id}`">
    <div class="tree" v-bind:style="styleObject">
      <img :src="`trees/${id}.png`" :width="`${width}`" />
      <ornament v-if="langs.indexOf('go') != -1" type="go" x="55" y="35" />
      <ornament v-if="langs.indexOf('py') != -1" type="py" x="40" y="20" />
      <ornament v-if="langs.indexOf('js') != -1" type="js" x="60" y="50" />
      <ornament v-if="langs.indexOf('rs') != -1" type="rs" x="20" y="40" />
    </div>
  </router-link>
</template>
<script>
import ornament from "./Ornament.vue";
export default {
  props: ["id", "x", "y", "langs", "width"],
  components: {
    ornament,
  },
  computed: {
    styleObject() {
      if (this.x && this.y)
        return {
          position: "fixed",
          left: `${this.x}vw`,
          top: `${this.y}vh`,
        };
      else
        return {
          position: "relative",
        };
    },
  },
};
</script>

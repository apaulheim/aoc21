<template>
  <div :style="`left: ${x}vw; top: ${y}vh; position: fixed;`">
    <img :src="`trees/${id}.png`" width="135" />
    <ornament v-if="langs.indexOf('go') != -1" type="go" x="20" y="40" />
    <ornament v-if="langs.indexOf('py') != -1" type="py" x="40" y="20" />
    <ornament v-if="langs.indexOf('js') != -1" type="js" x="60" y="50" />
  </div>
</template>
<script>
import Ornament from "./Ornament.vue";
export default {
  props: ["id", "x", "y", "langs"],
  components: {
    ornament: Ornament,
  },
};
</script>

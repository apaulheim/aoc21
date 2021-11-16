<template>
  <div :style="`left: ${x}vw; top: ${y}vh; position: fixed;`">
    <img :src="`trees/${index + 1}.png`" width="135" />
    <ornament type="goorn" x="20" y="40" />
    <ornament type="py" x="40" y="20" />
    <ornament type="js" x="60" y="50" />
  </div>
</template>
<script>
import Ornament from "./Ornament.vue";
export default {
  props: ["x", "y", "index"],
  components: {
    ornament: Ornament,
  },
};
</script>

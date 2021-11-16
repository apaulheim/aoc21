<template>
  <div class="ornament-container" :style="`left: ${x}%; top:${y}%;`">
    <div :class="`ornament-thread ${type}`"></div>
    <div :class="`ornament ${type}`"></div>
  </div>
</template>
<script>
export default {
  props: ["x", "y", "type"],
};
</script>

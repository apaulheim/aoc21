<template>
  <div class="parent">
    <div class="center">
      <div class="subtitle">Annis</div>
      <div class="title">🎄 Advent of Code 🎄</div>
      <div class="subtitle">2021</div>
    </div>
    <div v-for="(item, index) in days" :key="item.x">
      <img :src="`${publicPath}trees/${index + 1}.png`" width="150" />
    </div>
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake">
        <img :src="`${publicPath}christmas/gift.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/tree.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/rudolph.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/snowman.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/plant.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/santa.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/reindeer.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/plant.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/hat.png`" width="20" />
      </div>
      <div class="snowflake">
        <img :src="`${publicPath}christmas/sock.png`" width="20" />
      </div>
    </div>
    <div class="vue"></div>
    <div class="github"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      days: [
        { x: 3, y: 3 },
        { x: 50, y: 50 },
      ],
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

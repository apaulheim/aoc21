<template>
  <div class="parent">
    <!-- <div class="center">
      <div class="subtitle">Annis</div>
      <div class="title">🎄 Advent of Code 🎄</div>
      <div class="subtitle">2021</div>
    </div> -->
    <div
      v-for="(item, index) in days"
      :key="item.x"
      :style="`left: ${item.x}vw; top: ${item.y}vh; position: fixed;`"
    >
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
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

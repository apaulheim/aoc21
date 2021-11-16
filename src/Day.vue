<template>
  <div class="day">
    <div class="center">
      <div class="subtitle">Annis</div>
      <div class="title">Day {{ id }}</div>
      <div class="content">
        <div class="left">
          <tree v-bind:id="day.id" v-bind:langs="day.langs" v-bind:width="200">
          </tree>
        </div>
        <div class="right">
          <div class="subtitle">Input</div>
          <form action="/result/go/" method="POST">
            <textarea name="body" rows="10" cols="50"></textarea>
            <div class="buttons">
              <input
                v-if="goAvailable"
                type="submit"
                id="solvego"
                value="Solve"
              />
              <input
                v-if="pyAvailable"
                type="submit"
                value="Solve"
                id="solvepy"
                formaction="/result/py/"
              />
              <input
                v-if="jsAvailable"
                type="submit"
                value="Solve"
                id="solvejs"
                formaction="/result/js/"
              />
              <p v-if="!goAvailable && !pyAvailable && !jsAvailable">
                No solutions implemented yet
              </p>
            </div>
          </form>
          <div class="result-container">
            <div class="result-row silver">
              <div class="star">&#9733;</div>
              <div>
                <textarea name="res" rows="1" cols="44"></textarea>
              </div>
            </div>
            <div class="result-row gold">
              <div class="star">&#9733;</div>
              <div>
                <textarea name="res" rows="1" cols="44"></textarea>
              </div>
            </div>
          </div>
          <router-link to="/"
            ><input type="button" value="Back to calendar"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tree from "./Tree.vue";
export default {
  components: {
    tree,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    day() {
      return this.$store.state.days[this.$route.params.id - 1];
    },
    goAvailable() {
      return (
        this.$store.state.days[this.$route.params.id - 1].langs.indexOf("go") !=
        -1
      );
    },
    pyAvailable() {
      return (
        this.$store.state.days[this.$route.params.id - 1].langs.indexOf("py") !=
        -1
      );
    },
    jsAvailable() {
      return (
        this.$store.state.days[this.$route.params.id - 1].langs.indexOf("js") !=
        -1
      );
    },
  },
};
</script>
<style>
.center {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.content {
  display: flex;
  flex-flow: row nowrap;
  align-self: center;
  margin-top: 30px;
}
.left {
  margin-right: 50px;
  align-self: center;
}
.buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.buttons input {
  margin: 0 10px;
}
input#solvego {
  background: transparent url("../public/icon-go.png") no-repeat top left;
  background-size: 15px;
  background-position: 7px 5px;
}
input#solvepy {
  background: transparent url("../public/icon-py.png") no-repeat top left;
  background-size: 15px;
  background-position: 7px 5px;
}
input#solvejs {
  background: transparent url("../public/icon-node.png") no-repeat top left;
  background-size: 15px;
  background-position: 7px 5px;
}
textarea {
  width: 450px;
}
.result-container {
  margin-top: 50px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.result-row {
  display: flex;
  flex-flow: row nowrap;
  min-height: 50px;
  align-items: center;
}
.star {
  font-size: 2em;
  width: 50px;
}
.gold {
  color: gold;
}
.gold textarea {
  color: gold;
  width: 400px;
}
.silver {
  color: silver;
}
.silver textarea {
  color: silver;
  width: 400px;
}
</style>

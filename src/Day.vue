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
          <textarea
            v-model="aocInput"
            name="input"
            rows="10"
            cols="50"
          ></textarea>
          <div class="buttons">
            <input
              v-if="goAvailable"
              type="submit"
              id="solvego"
              value="Solve"
              v-on:click="handleGo"
            />
            <input
              v-if="pyAvailable"
              type="submit"
              value="Solve"
              id="solvepy"
            />
            <input
              v-if="jsAvailable"
              type="submit"
              value="Solve"
              id="solvejs"
              v-on:click="handleClick"
            />
            <p v-if="!goAvailable && !pyAvailable && !jsAvailable">
              No solutions implemented yet
            </p>
          </div>
          <div v-if="!showGo" class="result-container">
            <div class="result-row silver">
              <div class="star">&#9733;</div>
              <div>
                <textarea
                  name="res"
                  rows="1"
                  cols="44"
                  v-model="silver"
                ></textarea>
              </div>
            </div>
            <div class="result-row gold">
              <div class="star">&#9733;</div>
              <div>
                <textarea
                  name="res"
                  rows="1"
                  cols="44"
                  v-model="gold"
                ></textarea>
              </div>
            </div>
          </div>
          <iframe
            v-if="showGo"
            frameborder="0"
            width="100%"
            height="500px"
            src="https://replit.com/@apaulheim/aoc21go?embed=true"
          ></iframe>
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
  data() {
    return {
      aocInput: "",
      silver: "",
      gold: "",
      showGo: false,
    };
  },
  async mounted() {
    const { text } = await (await fetch("/api/aocinput?day=1")).json();
    this.aocInput = text;
  },
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
  methods: {
    handleClick: function() {
      if (this.aocInput.length > 0) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: this.aocInput.split("\r\n").join(";"),
          }),
        };
        console.log(this.aocInput);
        console.log(`/day${this.id}ts`);
        fetch(`/api/day${this.id}ts`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.silver = data.silver;
            this.gold = data.gold;
          });
      }
    },
    handleGo: function() {
      this.showGo = !this.showGo;
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

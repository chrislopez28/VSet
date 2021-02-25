<template>
  <div class="results">
    <h1>Game Summary</h1>
    <h2>Sets Found: {{ numberSets }}</h2>
    <h2>Score: {{ getScore }}</h2>
    <h2><app-timer></app-timer></h2>
    <button class="button" @click="exitResults">
      Close
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

import Timer from "../game/Timer.vue";

export default {
  methods: {
    ...mapMutations(["closeResults", "resetGame"]),
    exitResults: function() {
      this.resetGame();
      this.closeResults();
    }
  },
  computed: {
    ...mapGetters(["getScore", "numberSets"])
  },
  components: {
    appTimer: Timer
  }
};
</script>

<style scoped>
.results {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  font-size: 5rem;
  transition: all 0.2s;
  z-index: 200;
  background-color: whitesmoke;
  color: black;
  font-family: 'Raleway', sans-serif;
}

h1 {
  font-size: 2rem;
  text-decoration: underline;
  text-align: center;
}

h2 {
  font-size: 1rem;
  text-align: center;
}

.button {
  background: #e5a0a7;
  padding: 0.25rem 0.3rem;
  margin: 0.1rem;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 0.25rem;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.button:hover,
.button:focus {
  background: #cf8c93;;
  cursor: pointer;
}

</style>

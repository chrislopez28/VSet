<template>
  <div class="results">
    <h1>Results</h1>
    <h2>You found {{ numberSets }} SETs!</h2>
    <h2>Score: {{ getScore }}</h2>
    <button @click="exitResults">
      Close
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

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
  }
};
</script>

<style scoped>
.results {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
  transition: all 0.2s;
  z-index: 200;
  background: rgb(255, 245, 104);
  color: black;
}

h1 {
  font-size: xx-large;
  text-align: center;
  background: whitesmoke;
  border-radius: 15px;
  padding: 40px;
  font-family: "Caveat", cursive;
}

h2 {
  font-size: x-large;
  font-family: "Raleway", sans-serif;
  text-align: center;
}

button {
  font-size: x-large;
  font-family: "Raleway", sans-serif;
}
</style>

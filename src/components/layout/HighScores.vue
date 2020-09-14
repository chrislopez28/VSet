<template>
  <div v-show="!getGameStatus" class="high-score">
    <h1>High Scores</h1>
    <table class="highscore-table" v-if="getHighScores">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in getHighScores" v-bind:key="idx">
          <td>{{ idx + 1}}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
          <td>{{ entry.time }}</td>
        </tr>
      </tbody>
    </table>
    <button class="button" @click="toggleHighScores">
      Close
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getGameStatus",
      "getHighScores"
      ])
  },

  methods: {
    ...mapMutations(["toggleHighScores"])
  }
};
</script>

<style scoped>
.high-score {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 200;
  background: white;
  font-family: 'Raleway', sans-serif;
}

table {
  width: 75%;
  margin: 1rem auto;
}

table, th, td {
  border: black solid 0.1rem;
  border-collapse: collapse;
  padding: 0.25rem;
  font-family: 'Raleway', sans-serif;
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

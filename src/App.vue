<template>
  <div id="app">
    <transition name="fade">
      <app-title-screen v-if="$store.state.showTitleScreen"></app-title-screen>
    </transition>
    <transition name="fade">
      <app-game-over v-if="$store.state.showResults"></app-game-over>
    </transition>
    <app-sidebar></app-sidebar>
    <app-game></app-game>
    <app-pause v-if="getPauseStatus"></app-pause>
    <app-high-scores v-if="$store.state.showHighScores"></app-high-scores>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Game from "./components/game/Game.vue";

import GameOverScreen from "./components/layout/GameOverScreen.vue";
import HighScores from "./components/layout/HighScores.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import TitleScreen from "./components/layout/TitleScreen.vue";
import PauseScreen from "./components/layout/PauseScreen.vue";

export default {
  name: "App",
  components: {
    appGame: Game,
    appGameOver: GameOverScreen,
    appHighScores: HighScores,
    appSidebar: Sidebar,
    appTitleScreen: TitleScreen,
    appPause: PauseScreen
  },
  computed: {
    ...mapGetters([
      "getPauseStatus"
    ])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Caveat&family=Raleway&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

body {
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.fade-leave-active {
  transition: opacity 3s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

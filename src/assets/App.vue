<template>
  <div class="app">
    <transition name="fade">
      <app-title v-if="$store.state.showTitleScreen"></app-title>
    </transition>
    <transition name="fade">
      <app-results v-if="$store.state.showResults"></app-results>
    </transition>
    <app-sidebar></app-sidebar>
    <app-cards></app-cards>
  </div>
</template>

<script>
import Sidebar from "./components/Shared/Sidebar.vue";
import Header from "./components/Shared/Header.vue";
import Cards from "./components/Card/Cards.vue";
import TitleScreen from "./components/Shared/TitleScreen.vue";
import ResultScreen from "./components/Shared/ResultScreen.vue";

export default {
  components: {
    "app-header": Header,
    "app-cards": Cards,
    "app-sidebar": Sidebar,
    "app-title": TitleScreen,
    "app-results": ResultScreen
  }
};
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 3s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

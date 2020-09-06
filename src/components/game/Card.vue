<template>
  <transition name="fade" appear>
    <div
      v-if="true"
      class="list-group-item card"
      @click="cardSelected"
      :class="{ select: getSelectStatus(index), hint: getHintStatus(index) }"
    >
      <transition name="fade2" mode="out-in" appear>
        <img key="1" v-if="toggle" :src="url" />
        <img key="2" v-else :src="url" />
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["card", "index"],
  data: function() {
    return {
      toggle: true,
      selectSound: new Audio(require("../../assets/sounds/click.wav")),
      unselectSound: new Audio(require("../../assets/sounds/unclick.wav"))
    };
  },
  methods: {
    ...mapMutations(["addSelected", "removeSelected", "changeSelectStatus"]),
    cardSelected() {
      this.changeSelectStatus(this.index);

      if (this.card.selected) {
        this.selectSound.play();
        this.addSelected(this.index);
      } else {
        this.unselectSound.volume = 0.1
        this.unselectSound.play();
        this.removeSelected(this.index);
      }
    }
  },
  watch: {
    card: function() {
      this.toggle = !this.toggle;
    }
  },
  computed: {
    ...mapGetters(["getHintStatus", "getSelectStatus"]),
    url: function() {
      let color = "red";
      let pattern = "solid";
      let number = 1;
      let shape = "oval";

      switch (this.card.color) {
        case 0:
          color = "green";
          break;
        case 1:
          color = "purple";
          break;
        default:
          color = "red";
      }

      switch (this.card.pattern) {
        case 0:
          pattern = "open";
          break;
        case 1:
          pattern = "striped";
          break;
        default:
          pattern = "solid";
      }

      switch (this.card.shape) {
        case 0:
          shape = "diamond";
          break;
        case 1:
          shape = "squiggly";
          break;
        default:
          shape = "oval";
      }

      number = this.card.number + 1;

      return require("../../assets/" +
        color +
        "-" +
        number +
        "-" +
        shape +
        "-" +
        pattern +
        ".svg");
    }
  }
};
</script>

<style scoped>
  .card {
    float: left;
    padding: 0;
    border: black 1px solid;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .card:hover {
    box-shadow: 0 4px 8px 0 rgba(154, 209, 230, 0.8), 0 6px 20px 0 rgba(154, 209, 230, 0.81);
  }

  .card img {
    float: center;
  }

  .select {
    border: orange 1px solid;
    filter: brightness(85%);
    box-shadow: 0 4px 8px 0 rgba(207, 140, 147, 0.8), 0 6px 20px 0 rgba(207, 140, 147, 0.81);
    /* color: rgb(207, 140, 147); */
  }

  @media (min-width: 320px) {
    .card {
      height: 87.5px;
      width: 62.5px;
      margin: 5px;
      background: white;
    }

    .card img {
      height: 87.5px;
      width: 62.5px;
    }
  }

  @media (min-width: 480px) {
    .card {
      height: 61.25px;
      width: 43.75px;
      margin: 2px;
      background: white;
    }

    .card img {
      height: 61.25px;
      width: 43.75px;
    }
  }

  @media (min-width: 801px) {
    .card {
      height: 105px;
      width: 75px;
      margin: 5px;
      border: black 2px solid;
      background: white;
    }

    .card img {
      height: 105px;
      width: 75px;
    }

    .select {
      border: orange 2px solid;
    }
  }

  @media (min-width: 801px) and (max-height: 500px) {
    .card {
      height: 61.25px;
      width: 43.75px;
      margin: 5px;
      border: black 2px solid;
      background: white;
    }

    .card img {
      height: 61.25px;
      width: 43.75px;
    }

    .select {
      border: orange 2px solid;
    }
  }

  .hint {
    animation: shake 1s;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .fade2-leave-active {
    transition: opacity 0.5s;
  }

  .fade2-enter-active {
    transition: opacity 1s;
  }

  .fade2.enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
</style>

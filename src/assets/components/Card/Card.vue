<template>
  <transition name="fade" appear>
    <div
      v-if="true"
      class="list-group-item card"
      style="cursor: pointer"
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
      toggle: true
    };
  },
  methods: {
    ...mapMutations(["addSelected", "removeSelected", "changeSelectStatus"]),
    cardSelected() {
      this.changeSelectStatus(this.index);

      if (this.card.selected) {
        this.addSelected(this.index);
      } else {
        this.removeSelected(this.index);
      }
    }
  },
  watch: {
    card: function() {
      console.log("Hi!");
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
  height: 131.25px;
  width: 93.75px;
  float: left;
  padding: 0;
  margin: 5px;
  border: black 2px solid;
  border-radius: 10px;
  background: white;
}

.card img {
  float: center;
  height: 131.25px;
  width: 93.75px;
}

.select {
  border: orange 2px solid;
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

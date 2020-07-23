<template>
  <div class="game">
    <button class="sidebar-control" @click="toggleSidebar">
      <span v-if="getSidebarSetting">x</span>
      <span v-else>&#8594;</span>
    </button>

    <div class="message-box">
      {{ message }}
    </div>

    <div class="board">
      <app-high-scores v-show="!getGameStatus"></app-high-scores>
      <ul v-show="getGameStatus" class="cards">
        <app-card
          v-for="(card, index) in getCards"
          :key="index"
          :card="card"
          :index="index"
        >
          ></app-card
        >
      </ul>
    </div>

    <div class="controls">
      <div v-show="!getGameStatus" class="stat-bar">
        <button @click="startGame" class="button button-new-game">Play!</button>
        <div class="message-box">{{ message }}</div>
      </div>

      <div v-show="getGameStatus" class="stat-bar">
        <button @click="noSets" class="button">No Sets</button>
        <button @click="getHint" class="button">Hint</button>
        <button class="button">Pause</button>
        <button @click="endGame" class="button">Quit</button>
        <div
          style="display: inline-block; font-size: x-large; margin-left: 10px;"
        >
          Score: {{ getScore }} | Sets: {{ numberSets }} |
          <appTimer></appTimer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Timer from "./Timer.vue";
import HighScores from "./HighScores.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data: function() {
    return {
      cards: [],
      deck: [],
      selectedCards: [],
      message: "",
      messageInterval: null
    };
  },
  methods: {
    ...mapMutations([
      "createDeck",
      "resetGame",
      "zeroDeck",
      "changeHintStatus",
      "changeSelectStatus",
      "clearSelected",
      "removeSelected",
      "removeSet",
      "popCards",
      "addThree",
      "replaceSet",
      "updateScore",
      "displayResults",
      "toggleGameStatus",
      "toggleSidebar"
    ]),
    getHint: function() {
      const hintIndex = Math.floor(Math.random() * 3);
      this.changeHintStatus(this.giveHintIndex[hintIndex]);
      this.updateScore(-5);
      console.log(this.giveHintIndex[hintIndex]);
    },
    startGame: function() {
      this.resetGame();
      this.createDeck();
      this.toggleGameStatus();
    },
    endGame: function() {
      if (confirm("Press OK if you want to quit the current game.")) {
        this.displayResults();
        this.toggleGameStatus();
      }
    },
    unSelect: function() {
      this.getSelected.forEach(index => {
        this.changeSelectStatus(index);
        // card.selected = !card.selected;
      });
      this.clearSelected();
    },
    displayMessage: function(msg) {
      this.message = msg;
      this.messageInterval = setInterval(() => {
        this.message = "";
        clearInterval(this.messageInterval);
      }, 2000);
    },
    checkIfSet: function() {
      const setMessages = [
        "Set!",
        "Excellent!",
        "Good find!",
        "You're doing great!",
        "Well done!",
        "Well met!",
        "Outstanding!"
      ];

      if (this.isSet) {
        // Set
        this.displayMessage(
          setMessages[Math.floor(Math.random() * setMessages.length)]
        );
        this.updateScore(20);
        this.replaceSet();
        this.clearSelected();
      } else {
        // No Set
        this.displayMessage("Not a valid Set.");
        this.updateScore(-10);
        this.unSelect();
      }
    },
    noSets: function() {
      if (this.anySets) {
        this.displayMessage("There is a set on the board.");
        this.updateScore(-5);
      } else {
        if (this.numberDeck > 0) {
          this.addThree();
        } else {
          this.updateScore(300);
          this.displayMessage("Congratulations! You found all the Sets!!!");
          alert("Congratulations! You found all the Sets!!!");
          this.displayResults();
          this.toggleGameStatus();
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "anySets",
      "getDeck",
      "getCards",
      "getGameStatus",
      "getSidebarSetting",
      "getScore",
      "getSelected",
      "getSets",
      "giveHintIndex",
      "numberSelected",
      "numberDeck",
      "numberSets",
      "isSet"
    ]),
    selection: function() {
      this.selectedCards = [];
      for (card of this.cards) {
        this.selectedCards = 4;
      }
    },
    cardCount: function() {
      return this.numberSelected;
    }
  },
  watch: {
    cardCount: function(newCount, oldCount) {
      if (newCount == 3) {
        this.checkIfSet();
      }
    }
  },
  components: {
    appCard: Card,
    appHighScores: HighScores,
    appTimer: Timer
  }
};
</script>

<style>
.game {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  bottom: 0px;
  left: 0px;
}

.sidebar-control {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 15;
  background: whitesmoke;
  width: 30px;
  height: 30px;
  font-family: "Raleway", sans-serif;
  opacity: 60%;
}

.board {
  float: none;
  padding: 20px;
  background: whitesmoke;
  /* background: #8dd7bf; */
  display: flex;
  height: 75%;
  padding-top: auto;
  padding-bottom: auto;
  width: 100%;
  position: relative;
}

.high-score {
  width: 500px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -10px);
  text-align: center;
}

table {
  width: 100%;
}

h1 {
  font-family: "Caveat", cursive;
}

th {
  font-family: "Caveat", cursive;
}

tr {
  font-family: "Raleway", sans-serif;
}

.cards {
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.controls {
  height: 25%;
  width: 100%;
  position: absolute;
  display: fixed;
  text-align: center;
  left: 0;
  bottom: 0;

  font-family: "Caveat", cursive;
}

.button {
  background: #ff5768;
  padding: 3px;
  margin: 2px;
  font-size: large;
  font-weight: bold;
  border: 2px solid silver;
  border-radius: 10px;
  color: black;
  font-family: "Caveat", cursive;
  height: 50px;
  width: 80px;
}

.button-new-game {
  width: 200px;
  font-size: xx-large;
}

.button:hover {
  background: lightgrey;
}

.button:active {
  background: lightsteelblue;
  color: slategrey;
}

.stat-bar {
  background: #00a5e3;
  padding: 2em;

  text-align: center;
}

.info {
  background: white;
  font-size: large;
}

.stat-panel {
  font-size: large;
  padding: 30px;
  background-color: #ff96c5;
  color: black;
  border: 3px solid black;
  border-radius: 10px;
  height: 150px;
  width: 300px;
}

.message-box {
  padding: 0px;
  color: black;
  position: absolute;
  opacity: 0.75;
  text-align: center;
  top: 10px;
  right: 20px;
  width: auto;
  display: flex;
  flex-flow: column;
  justify-content: top;
  align-items: center;
  font-size: 2rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
  transition: all 0.2s;
  z-index: 15;
  font-family: "Raleway", sans-serif;
}
</style>

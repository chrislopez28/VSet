<template>
  <div class="game">
    <button class="sidebar-control" @click="clickSidebarControl">
      <span v-if="getSidebarSetting">x</span>
      <span v-else>&#8594;</span>
    </button>

    <div class="message-box">
      {{ message }}
    </div>

    <div class="board">
      <div v-show="!getGameStatus" class="main-screen">
        <button @click="startGame" class="button button-new-game">Play!</button>
      </div>
      <ul v-show="getGameStatus" class="cards">
        <app-card
          v-for="(card, index) in getCards"
          :key="index"
          :card="card"
          :index="index"
        >
        </app-card
        >
      </ul>
    </div>

    <div v-show="getGameStatus" class="controls">
      <div class="stat-bar">
        <div class="button-bar">
          <button @click="noSets" class="button">No Sets</button>
          <button @click="getHint" class="button">Hint</button>
          <button class="button">Pause</button>
          <button @click="endGame" class="button">Quit</button>
        </div>
      </div>
      <div class="score-bar">
        <div>
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
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  data: function() {
    return {
      cards: [],
      deck: [],
      message: "",
      messageInterval: null,
      setSound: new Audio(require("../../assets/sounds/set.wav")),
      setWrongSound: new Audio(require("../../assets/sounds/set-incorrect.wav")),
      hintSound: new Audio((require("../../assets/sounds/hint.wav"))),
      noSetsSound: new Audio((require("../../assets/sounds/no-sets.wav"))),
      dealSound: new Audio((require("../../assets/sounds/deal.wav"))),
      applauseSound: new Audio((require("../../assets/sounds/applause.wav"))),
      sidebarSound: new Audio((require("../../assets/sounds/whoosh.wav")))    
    };
  },
  methods: {
    ...mapMutations([
      "createDeck",
      "resetGame",
      "changeHintStatus",
      "changeSelectStatus",
      "clearSelected",
      "removeSelected",
      "removeSet",
      "addThree",
      "replaceSet",
      "updateScore",
      "displayResults",
      "toggleGameStatus",
      "toggleSidebar"
    ]),
    getHint: function() {
      if (this.giveHintIndex) {
        const hintIndex = Math.floor(Math.random() * 3);
        this.changeHintStatus(this.giveHintIndex[hintIndex]);
        this.updateScore(-5);
      } else {
        this.displayMessage("There are no hints to give");
      }
      this.hintSound.volume = 0.25;
      this.hintSound.play()
    },
    startGame: function() {
      this.dealSound.volume = 0.5;
      this.dealSound.play();
      this.resetGame();
      this.createDeck();
      this.toggleGameStatus();
    },
    endGame: function() {
      if (confirm("Press OK if you want to quit the current game.")) {
        this.applauseSound.play();
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
        this.setSound.volume = 0.25;
        this.setSound.play();
        this.updateScore(20);
        this.replaceSet();
        this.clearSelected();
      } else {
        // No Set
        this.displayMessage("Not a valid Set.");
        this.setWrongSound.volume = 0.25;
        this.setWrongSound.play();
        this.updateScore(-10);
        this.unSelect();
      }
    },
    noSets: function() {
      if (this.anySets) {
        this.displayMessage("There is a set on the board.");
        this.setWrongSound.volume = 0.25;
        this.setWrongSound.play();
        this.updateScore(-5);
      } else {
        if (this.numberDeck > 0) {
          this.addThree();
          this.noSetsSound.volume = 0.25;
          this.noSetsSound.play();
        } else {
          this.updateScore(300);
          this.displayMessage("Congratulations! You found all the Sets!!!");
          alert("Congratulations! You found all the Sets!!!");
          this.displayResults();
          this.toggleGameStatus();
        }
      }
    },
    clickSidebarControl: function() {
      this.sidebarSound.play();
      this.toggleSidebar();
    }
  },
  computed: {
    ...mapGetters([
      "anySets",
      "getCards",
      "getGameStatus",
      "getSidebarSetting",
      "getScore",
      "getSelected",
      "giveHintIndex",
      "numberSelected",
      "numberDeck",
      "numberSets",
      "isSet"
    ]),
    cardCount: function() {
      return this.numberSelected;
    }
  },
  watch: {
    cardCount: function(newCount) {
      if (newCount == 3) {
        this.checkIfSet();
      }
    }
  },
  components: {
    appCard: Card,
    appTimer: Timer
  }
};
</script>

<style scoped>
  .game {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
  }

  .sidebar-control {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    z-index: 15;
    background: #9ad1e6;
    width: 30px;
    height: 30px;
    font-family: "Raleway", sans-serif;
    border: 2px solid black;
    border-radius: 0.25rem;
  }

  .sidebar-control:hover,
  .sidebar-control:active {
    cursor: pointer;
    background: #7ab1c7;
  }

  .board {
    float: none;
    padding: 20px;
    background: whitesmoke;
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

  .main-screen {
    display: flex;
    width: 90%;
    height: 80%;
    position: absolute;
    text-align: center;
  }

  table {
    width: 100%;
  }

  h1 {
    font-family: "Caveat", cursive;
  }

  .controls {
    max-height: 20vh;
    width: 100%;
    position: absolute;
    text-align: center;
    left: 0;
    bottom: 0;
    font-family: "Raleway", sans-serif;
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
    background: #cf8c93;
    cursor: pointer;
  }

  .button-new-game {
    width: 15rem;
    font-size: 3rem;
    margin: auto;
  }

  .button-new-game:hover,
  .button-new-game:active {
    cursor: pointer;
  }

  .button-bar {
    padding: 0.25rem 0;
    align-items: center;
    background: #9ad1e6;
  }

  .score-bar {
    padding: 0.25rem 0;
    background: white;
    text-align: center; 
    font-size: 1rem; 
    background: #9ad1e6;
  }

  .message-box { 
    text-align: center;
    color: black;
    position: absolute;
    opacity: 0.85;
    width: 100vw;
    top: 1rem;
    font-size: 1.5rem;
    transition: all 0.2s;
    z-index: 15;
    font-family: "Raleway", sans-serif;
  }

  @media (min-width: 320px) {
    .cards {
      width: 360px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (min-width: 480px) {
    .cards {
      width: 360px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (min-width: 801px) {
    .cards {
      width: 550px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (min-width: 801px) and (max-height: 500px) {
    .cards {
      width: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .shake {
    animation: shake 1s;
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

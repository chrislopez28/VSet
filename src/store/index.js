import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    deck: [],
    cards: [],
    sets: [],
    selected: [],
    score: 0,
    gameTime: 0,
    activeGame: false,
    showTitleScreen: true,
    pausedGame: false,
    showResults: false,
    timerOn: false,
    sidebarOn: true,
    hintInterval: null,
    timerInterval: null
  },
  getters: {
    getDeck: state => state.deck,
    getCards: state => state.cards,
    getGameStatus: state => state.activeGame,
    getGameTime: state => state.gameTime,
    getPauseStatus: state => state.pausedGame,
    getHintStatus: state => id => {
      return state.cards[id].hint;
    },
    getSelectStatus: state => id => {
      return state.cards[id].selected;
    },
    getSelected: state => state.selected,
    getScore: state => state.score,
    getSidebarSetting: state => state.sidebarOn,
    getTimerSetting: state => {
      return state.timerOn;
    },
    numberSelected: state => {
      return state.selected.length;
    },
    numberDeck: state => {
      return state.deck.length;
    },
    numberSets: state => {
      return state.sets.length;
    },
    isSet: state => {
      let card1 = state.selected[0];
      let card2 = state.selected[1];
      let card3 = state.selected[2];
      if (state.selected.length == 3) {
        return (
          ((state.cards[card1].color === state.cards[card2].color &&
            state.cards[card2].color === state.cards[card3].color) ||
            (state.cards[card1].color != state.cards[card2].color &&
              state.cards[card2].color != state.cards[card3].color &&
              state.cards[card1].color != state.cards[card3].color)) &&
          ((state.cards[card1].shape === state.cards[card2].shape &&
            state.cards[card2].shape === state.cards[card3].shape) ||
            (state.cards[card1].shape != state.cards[card2].shape &&
              state.cards[card2].shape != state.cards[card3].shape &&
              state.cards[card1].shape != state.cards[card3].shape)) &&
          ((state.cards[card1].number === state.cards[card2].number &&
            state.cards[card2].number === state.cards[card3].number) ||
            (state.cards[card1].number != state.cards[card2].number &&
              state.cards[card2].number != state.cards[card3].number &&
              state.cards[card1].number != state.cards[card3].number)) &&
          ((state.cards[card1].pattern === state.cards[card2].pattern &&
            state.cards[card2].pattern === state.cards[card3].pattern) ||
            (state.cards[card1].pattern != state.cards[card2].pattern &&
              state.cards[card2].pattern != state.cards[card3].pattern &&
              state.cards[card1].pattern != state.cards[card3].pattern))
        );
      }
      return false;
    },
    anySets: state => {
      let i = 0;
      let j = 0;
      let k = 0;

      for (i = 0; i < state.cards.length; i++) {
        for (j = i + 1; j < state.cards.length; j++) {
          for (k = j + 1; k < state.cards.length; k++) {
            if (
              ((state.cards[i].color === state.cards[j].color &&
                state.cards[j].color === state.cards[k].color) ||
                (state.cards[i].color != state.cards[j].color &&
                  state.cards[j].color != state.cards[k].color &&
                  state.cards[i].color != state.cards[k].color)) &&
              ((state.cards[i].shape === state.cards[j].shape &&
                state.cards[j].shape === state.cards[k].shape) ||
                (state.cards[i].shape != state.cards[j].shape &&
                  state.cards[j].shape != state.cards[k].shape &&
                  state.cards[i].shape != state.cards[k].shape)) &&
              ((state.cards[i].number === state.cards[j].number &&
                state.cards[j].number === state.cards[k].number) ||
                (state.cards[i].number != state.cards[j].number &&
                  state.cards[j].number != state.cards[k].number &&
                  state.cards[i].number != state.cards[k].number)) &&
              ((state.cards[i].pattern === state.cards[j].pattern &&
                state.cards[j].pattern === state.cards[k].pattern) ||
                (state.cards[i].pattern != state.cards[j].pattern &&
                  state.cards[j].pattern != state.cards[k].pattern &&
                  state.cards[i].pattern != state.cards[k].pattern))
            ) {
              return true;
            }
          }
        }
      }

      return false;
    },
    possibleSets: state => {
      let i = 0;
      let j = 0;
      let k = 0;
      let foundSets = [];

      for (i = 0; i < state.cards.length; i++) {
        for (j = i + 1; j < state.cards.length; j++) {
          for (k = j + 1; k < state.cards.length; k++) {
            if (
              ((state.cards[i].color === state.cards[j].color &&
                state.cards[j].color === state.cards[k].color) ||
                (state.cards[i].color != state.cards[j].color &&
                  state.cards[j].color != state.cards[k].color &&
                  state.cards[i].color != state.cards[k].color)) &&
              ((state.cards[i].shape === state.cards[j].shape &&
                state.cards[j].shape === state.cards[k].shape) ||
                (state.cards[i].shape != state.cards[j].shape &&
                  state.cards[j].shape != state.cards[k].shape &&
                  state.cards[i].shape != state.cards[k].shape)) &&
              ((state.cards[i].number === state.cards[j].number &&
                state.cards[j].number === state.cards[k].number) ||
                (state.cards[i].number != state.cards[j].number &&
                  state.cards[j].number != state.cards[k].number &&
                  state.cards[i].number != state.cards[k].number)) &&
              ((state.cards[i].pattern === state.cards[j].pattern &&
                state.cards[j].pattern === state.cards[k].pattern) ||
                (state.cards[i].pattern != state.cards[j].pattern &&
                  state.cards[j].pattern != state.cards[k].pattern &&
                  state.cards[i].pattern != state.cards[k].pattern))
            ) {
              foundSets.push([i, j, k]);
            }
          }
        }
      }
      return foundSets;
    },
    giveHintIndex: (state, getters) => {
      let foundSets = getters.possibleSets;

      if (foundSets) {
        let setIndex = Math.floor(Math.random() * foundSets.length);
        return foundSets[setIndex];
      } else {
        return null;
      }
    }
  },
  mutations: {
    removeTitleScreen: state => {
      state.showTitleScreen = false;
    },
    displayResults: state => {
      state.showResults = true;
    },
    closeResults: state => {
      state.showResults = false;
    },
    toggleGameStatus: state => {
      state.activeGame = !state.activeGame;
    },
    togglePauseStatus: state => {
      state.pausedGame = !state.pausedGame;
    },
    toggleSidebar: state => {
      state.sidebarOn = !state.sidebarOn;
    },
    resetGame: state => {
      state.deck = [];
      state.cards = [];
      state.sets = [];
      state.selected = [];
      state.score = 0;
      state.gameTime = 0;
      state.pausedGame = false;
      state.timerOn = false;
      clearInterval(state.hintInterval);
      clearInterval(state.timerInterval);
    },
    popCards: state => {
      state.cards.pop();
    },
    addThree: state => {
      for (let i = 0; i < 3; i++) {
        state.cards.push(state.deck.pop());
      }
    },
    addSelected: (state, index) => {
      state.selected.push(index);
    },
    removeSelected: (state, index) => {
      let toRemove = state.selected.find(selected => selected[index] === index);
      state.selected.splice(toRemove, 1);
    },
    changeHintStatus: (state, id) => {
      state.cards[id].hint = true;
      state.hintInterval = setInterval(() => {
        if (state.cards[id]) {
          state.cards[id].hint = false;
        }
        clearInterval(state.hintInterval);
      }, 1000);
    },
    toggleTimer: state => {
      state.timerOn = !state.timerOn;
      if (state.timerOn) {
        state.timerInterval = setInterval(() => {
          state.gameTime++;
        }, 1000);
      } else {
        clearInterval(state.timerInterval);
      }
    },
    changeSelectStatus: (state, id) => {
      state.cards[id].selected = !state.cards[id].selected;
    },
    clearSelected: state => {
      state.selected = [];
    },
    replaceSet: state => {
      let newSet = [];

      state.selected.sort(function(a, b) {
        return b - a;
      });
      if (state.cards.length > 12 || state.deck.length < 3) {
        for (let toRemove of state.selected) {
          newSet.push(state.cards.splice(toRemove, 1));
        }
      } else {
        for (let toRemove of state.selected) {
          newSet.push(state.cards.splice(toRemove, 1, state.deck.pop()));
        }
      }
      state.sets.push(newSet);
    },
    updateScore: (state, change) => {
      state.score += change;
    },
    createDeck: state => {
      state.deck = [];
      state.cards = [];
      state.sets = [];
      state.selected = [];
      state.score = 0;
      state.timerOn = false;

      class Card {
        constructor(id, shape, color, number, pattern) {
          this.id = id;
          this.shape = shape;
          this.color = color;
          this.number = number;
          this.pattern = pattern;
          this.selected = false;
          this.hint = false;
        }
      }

      let cardID = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
              state.deck.push(new Card(cardID, i, j, k, l));
              cardID += 1;
            }
          }
        }
      }

      // shuffle function from https://javascript.info/task/shuffle
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      shuffle(state.deck);

      let limit = 12;

      while (state.cards.length < limit) {
        state.cards.push(state.deck.pop());
      }
    }
  }
});

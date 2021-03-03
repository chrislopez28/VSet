<template>
  <transition name="slide">
    <aside class="sidebar" v-show="getSidebarSetting">
      <h1><a href="./">VSet</a></h1>
      <section class="background">
        <h2>Background</h2>
        <p>
          VSet is a clone of the
          <a href="https://en.wikipedia.org/wiki/Set_(card_game)"
            ><i>card game Set</i></a
          >. Code for this app is available on
          <a href="https://github.com/chrislopez28/vset" target="_blank"
            >Github</a
          >.
        </p>
      </section>
      <section class="rules">
        <h2>How to Play</h2>
        <p>
          The objective of VSet is to find <b><i>"sets"</i></b> until there are
          no more sets on the game board. Sets are combinations of
          <b>3 cards</b> where each of the 4 properties are either all
          <b>the same</b> or all <b>different</b>.
        </p>
        <p>
          Each card is characterized by
          <b>4 properties</b>:
        </p>
        <ul>
          <li><u>Number</u>: 1, 2, or 3</li>
          <li><u>Shape</u>: Diamond, Oval, or Squiggle</li>
          <li><u>Shading</u>: Solid, Striped, or Open</li>
          <li><u>Color</u>: Green, Red, or Purple</li>
        </ul>
      </section>
      <section class="examples">
        <div class="card-example-container">
          <h3>Example 1:</h3>
          <div class="card-example">
            <img
              src="../../assets/green-1-diamond-open.svg"
              alt="Card: 1 Green Diamond Open"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/red-2-diamond-striped.svg"
              alt="Card: 2 Red Diamond Striped"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/purple-3-diamond-solid.svg"
              alt="Card: 3 Purple Dimaond Solid"
            />
          </div>
          <p>
            This is a set since each card has a different number (1, 2, 3); the
            same shape (dimaond); a different shading (open, solid, striped);
            and a different color (green, red, purple).
          </p>
        </div>
        <div class="card-example-container">
          <h3>Example 2:</h3>
          <div class="card-example">
            <img
              src="../../assets/purple-2-oval-open.svg"
              alt="Card: 2 Purple Oval Open"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/purple-2-oval-striped.svg"
              alt="Card: 2 Purple Oval Striped"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/purple-2-oval-solid.svg"
              alt="Card: 2 Purple Oval Solid"
            />
          </div>
          <p>
            This is a set since each card has the same number (2); the same
            shape (oval); the same color (purple); and a different shading
            (open, striped, solid).
          </p>
        </div>
        <div class="card-example-container">
          <h3>Example 3:</h3>
          <div class="card-example">
            <img
              src="../../assets/red-3-oval-open.svg"
              alt="Card: 3 Red Oval Open"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/purple-2-diamond-striped.svg"
              alt="Card: 2 Purple Diamond Striped"
            />
          </div>
          <div class="card-example">
            <img
              src="../../assets/green-1-squiggly-solid.svg"
              alt="Card: 1 Green Squiggle Solid"
            />
          </div>
          <p>
            This is a set since each card has a different shape (oval, diamond,
            squiggle); a different color (red, purple, green); a different
            number (3, 2, 1); and a different shading (open, striped, solid).
          </p>
        </div>
        <hr />
        <p>2020 <a href="https://github.com/chrislopez28">Chris Lopez</a></p>
      </section>
    </aside>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      sidebarClose: false
    };
  },
  computed: {
    ...mapGetters(["getSidebarSetting"])
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  text-align: center;
  background: whitesmoke;
  border-radius: 15px;
  font-family: "Raleway", sans-serif;
}

h1 a {
  color: black;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1rem;
  text-decoration: underline;
}

p,
ul,
li {
  font-size: 0.75rem;
}

a {
  text-decoration: none;
}

b {
  color: green;
}

section {
  text-align: left;
}

.card-example-container {
  text-align: left;
}

.card-example {
  display: inline-block;
  height: 56px;
  width: 40px;
  padding: 0;
  margin: 2px;
  border: black 1px solid;
  border-radius: 10px;
  background: white;
}

.card-example img {
  height: 56px;
  width: 40px;
  float: center;
}

.sidebar {
  position: absolute;
  background: #fffcc3;
  font-family: "Raleway", sans-serif;
  overflow: auto;
  top: 0px;
  left: 0px;
  height: 100vh;
  z-index: 10;
  padding: 10px;
}

@media (min-width: 320px) {
  .sidebar {
    border: lightyellow 2px solid;
    width: 100%;
  }

  .sidebar.close {
    transform: translateX(-320px);
  }
}

@media (min-width: 480px) {
  .sidebar {
    width: 240px;
  }

  .sidebar.close {
    transform: translateX(-240px);
  }
}

button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-240px);
}
</style>

<template>
    <transition name="slide">
    <aside class="sidebar" v-show="getSidebarSetting">
        <h1><a href="">VSet</a></h1>
        <p>
            VSet is based on the incredibly fun card game <a href="https://www.playmonster.com/product/set/">SET&reg;</a>.
            If you like this app, please consider supporting the makers of this game by purchasing a deck of cards or
            by downloading the official app on iOS or Android. 
        </p>

        <h2>Rules</h2>
        <p>
            Each card is characterized by
            <b>4 properties</b>
            <ul>
                <li><u>Number</u>: 1, 2, or 3</li>
                <li><u>Shape</u>: Diamond, Oval, or Squiggle</li>
                <li><u>Shading</u>: Solid, Striped, or Open</li>
                <li><u>Color</u>: Green, Red, or Purple</li>
            </ul>

            The objective of the game is to find <b><i>"sets"</i></b>. Sets are 
            combinations of <b>3 cards</b> where each of the 4
            properties are either all <b>the same</b> or all <b>different</b>.
        </p>


        <p>
            The code for this app can be found on <a href="">Github</a>.
        </p>
    </aside>
    </transition>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            sidebarClose: false
        }
    },
    computed: {
        ...mapGetters([
            'getSidebarSetting'
        ])
    }
}
</script>


<style scoped>

.sidebar {
    position: absolute;
    background: rgb(255, 245, 104);
    border: lightyellow 2px solid;
    width: 240px;
    height: 100vh; 
    z-index: 10;
    padding: 10px;
    font-family: 'Raleway', sans-serif;
    bottom: 0px;
    left: 0px;
    overflow: auto;
}

.sidebar.close {
    transform: translateX(-240px)
}

button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

h1 {
    font-size: xx-large;
    text-align: center;
    background: whitesmoke;
    border-radius: 15px;
    font-family: 'Caveat', cursive;
}

h1 a {
    color: black;
}

h2 {
    font-size: large;
    font-family: 'Caveat', cursive;

}

p {
    font-size: small;
}

a {
    text-decoration: none;
}

b {
    color: green;
}

.slide-enter-active {
  transition: all .5s ease;
}
.slide-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-240px);
}

</style>
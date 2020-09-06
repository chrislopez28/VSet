<template>
    <div class="paused">
        <h1>Game Paused</h1>
        <button @click="togglePauseStatus" class="button">
            Return to Game
        </button>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    methods: {
        ...mapMutations([
        "togglePauseStatus"
        ])
    }
}
</script>

<style scoped>
    .paused {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        font-size: 5rem;
        transition: all 0.2s;
        z-index: 200;
        background: white;
        opacity: 0.5;
    }

    h1 {
        font-size: 5rem;
        word-wrap: break-word;
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
        opacity: 1;
    }

  .button:hover,
  .button:focus {
    background: #cf8c93;
    cursor: pointer;
  }
</style>
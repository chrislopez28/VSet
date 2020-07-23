<template>
  <div class="title">
    <h1>VSet</h1>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  mounted() {
    setTimeout(() => {
      this.$store.commit("removeTitleScreen");
    }, 2000);
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
  transition: all 0.2s;
  z-index: 200;
  background: rgb(255, 245, 104);
  color: black;
}

h1 {
  font-size: xxx-large;
  text-align: center;
  background: whitesmoke;
  border-radius: 15px;
  padding: 40px;
  font-family: "Caveat", cursive;
}
</style>

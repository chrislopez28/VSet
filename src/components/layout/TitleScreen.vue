<template>
  <div class="title">
    <h1>VSet</h1>
  </div>
</template>

<script>
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
    transition: all 0.2s;
    z-index: 200;
    background: #fffcc3;
    font-family: 'Raleway', sans-serif;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    background: whitesmoke;
    border-radius: 1rem;
    padding: 2rem;
  }
</style>

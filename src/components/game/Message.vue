<template>
    <div class="message-box">
      {{ message }}
    </div>
</template>

<script>
export default {
    props: ["message"]
}
</script>

<style scoped>
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
</style>
<template>
  <span
    >Score: {{ score }} | Sets: {{ numberSets }} | Cards Left:
    {{ cardsLeft }} |</span
  >
</template>

<script>
export default {
  props: ["cardsLeft", "numberSets", "score"]
};
</script>

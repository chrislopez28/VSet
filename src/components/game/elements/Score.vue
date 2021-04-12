<template>
  <span>Score: {{ score }} | Sets: {{ numberSets }} |</span>
</template>

<script>
export default {
  props: ["numberSets", "score"]
};
</script>

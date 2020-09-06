<template>
  <span>
    Time: <span>{{ minutes }}:{{ seconds }}</span>
  </span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getTimerSetting",
      "getGameTime"
      ]),
    minutes: function() {
      return Math.floor(this.getGameTime / 60)
    },
    seconds: function() {
      return ((this.getGameTime - this.minutes * 60) < 10 ? '0' : '') + (this.getGameTime - this.minutes * 60);
    }
  }
};
</script>

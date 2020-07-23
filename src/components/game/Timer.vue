<template>
  <span>
    Timer:
    <span v-if="getTimerSetting">{{ minutes }}:{{ seconds }}</span>
  </span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      interval: null,
      time: 0,
      timerOn: false
    };
  },
  methods: {
    incrementTime() {
      this.time = parseInt(this.time) + 1;
    },
    updateTime: function() {
      this.interval = setInterval(this.incrementTime, 1000);
    }
  },
  computed: {
    ...mapGetters(["getTimerSetting"]),
    minutes: function() {
      return Math.floor(this.time / 60)
    },
    seconds: function() {
      return ((this.time - this.minutes * 60) < 10 ? '0' : '') + (this.time - this.minutes * 60);
    }
  },
  watch: {
    getTimerSetting: function() {
      if (this.getTimerSetting) {
        this.interval = setInterval(this.incrementTime, 1000);
      } else {
        clearInterval(this.interval);
        this.time = 0;
      }
    }
  }
};
</script>

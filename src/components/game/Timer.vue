<template>
    <span> 
        Timer: 
        <span v-if="getTimerSetting">{{ time }}</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            interval: null,
            time: 0,
            timerOn: false
        }
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
        ...mapGetters([
            'getTimerSetting'
        ])
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
}
</script>
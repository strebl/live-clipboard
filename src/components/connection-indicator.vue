<template>
  <span class="connection-indicator">
    <span v-if="state == 'online'" class="tag tag-success">Connected</span>
    <span v-if="state == 'error'" class="tag tag-danger">Connection Error</span>
    <span v-if="state == 'offline'" class="tag tag-primary">Connecting...</span>
  </span>
</template>

<script>
import Bus from '../helpers/bus'

export default {
  data () {
    return {
      state: 'offline'
    }
  },
  created () {
    Bus.$on('clipboard:connected', () => {
      this.state = 'online';
    });
    
    Bus.$on('clipboard:disconnected', () => {
      this.state = 'offline';
    });

    Bus.$on('clipboard:connection_error', () => {
      this.state = 'error';
    });
  }
}
</script>

<style>
#title-bar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: white;
  flex-basis: 50px;
  background: #2E4155;
}
</style>

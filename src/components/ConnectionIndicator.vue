<template>
  <span class="connection-indicator">
    <span v-if="state == 'online'" class="tag is-primary">Connected</span>
    <span v-if="state == 'error'" class="tag is-danger">Connection Error</span>
    <span v-if="state == 'offline'" class="tag is-warning">Connecting...</span>
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

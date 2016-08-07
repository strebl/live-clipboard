<template>
  <div id="title-bar">
    <div>
      {{ clipboardId }}
      <connection-indicator></connection-indicator>
    </div>
  </div>  
</template>

<script>
import ConnectionIndicator from './connection-indicator.vue'
import Store from '../helpers/store'

export default {
  data () {
    return {
      msg: 'Clipboard',
      store: Store
    }
  },
  computed: {
    clipboardId () {
      return this.msg + " " + this.store.clipboardId
    }
  },
  components: { ConnectionIndicator }
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

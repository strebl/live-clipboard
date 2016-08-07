<template>
  <div id="home">
    <title-bar></title-bar>
    <clipboard :clipboard-id="store.clipboardId"></clipboard>
  </div>
</template>

<script>
import TitleBar from './title-bar.vue'
import Clipboard from './clipboard.vue'
import Store from '../helpers/store'

export default {
  name: 'Home',
  data () {
    return {
      store: Store
    }
  },
  mounted() {
    this.store.clipboardId = this.$route.params.clipboard;
  },
  components: {
    TitleBar,
    Clipboard
  },
  methods: {
  }
}
</script>

<style>
#home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

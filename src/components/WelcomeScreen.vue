<template>
  <div id="welcome">
    <div class="row">
      <div class="col-xs-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4 text-xs-center">
        <img src="../assets/clipboard.svg" alt="" class="img-fluid hero-image">
      </div>
      <div class="col-xs-12 text-xs-center m-t-2">
        <h1>Live Clipboard</h1>
        <p>Open the same clipboard on multiple pages and copy text from computer to computer, easly!</p>
      </div>
      <div class="col-xs-12">
        <div class="row p-t-1">
          <div class="col-xs-12 col-sm-6 col-md-4 offset-md-2">
            Create a new Clipboard...
            <button class="btn btn-primary btn-lg btn-block m-b-1" @click="generateClipboard">Create Clipboard</button>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            Or join an existing one...
            <form @submit.prevent="joinClipboard">
              <div class="input-group input-group-lg m-b-1">
                <input type="text"
                       class="form-control"
                       placeholder="Enter the ID"
                       v-model="store.clipboardId">
                <span class="input-group-btn">
                  <button class="btn btn-primary"
                          type="submit"
                          :disabled="! store.clipboardId.length">
                    Join!
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../helpers/store'

export default {
  name: 'welcome',
  data () {
    return {
      clipboardId: '',
      store: Store
    }
  },
  methods: {
    generateClipboard () {
      this.store.clipboardId = (Math.random() + 1).toString(36).substring(2, 7)
      this.$router.push('/' + this.store.clipboardId)
    },
    joinClipboard () {
      this.$router.push('/' + this.store.clipboardId)
    }
  }
}
</script>

<style>
#welcome {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #37495c;
  color: white;
  flex-grow: 1;
  padding: 15px;
}

.hero-image {
  width: 100%;
}
</style>

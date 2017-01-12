<template>
  <div id="welcome">
    <div class="columns is-centered is-multiline is-mobile">
      <div class="column is-6-mobile is-5-tablet is-3-desktop">
        <img src="../assets/clipboard.svg" alt="" class="img-fluid hero-image">
      </div>
      <div class="column is-12 has-text-centered m-t-2">
        <h1 class="title is-1">Live Clipboard</h1>
        <h2 class="subtitle is-4">Open the same clipboard on multiple pages and copy text from computer to computer, easly!</h2>
      </div>
      <div class="column is-12">
        <div class="columns is-centered p-t-2">
          <div class="column is-6-tablet is-4-desktop">
            <h4 class="subtitle m-b-1">Create a new Clipboard...</h4>
            <button class="button is-fullwidth is-large is-primary m-b-1" @click="generateClipboard">Create Clipboard</button>
          </div>
          <div class="column is-6-tablet is-4-desktop">
            <h4 class="subtitle m-b-1">Or join an existing one...</h4>
            <form @submit.prevent="joinClipboard">
              <div class="control has-addons">
                <input type="text"
                       class="input is-large is-expanded"
                       placeholder="Enter the ID"
                       v-model="store.clipboardId">
                <button class="button is-primary is-large"
                        type="submit"
                        :disabled="! store.clipboardId.length">
                  Join!
                </button>
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
  background: #37495c;
  color: #E2F0FB;
  padding: 20px 40px;
}

.hero-image {
  width: 100%;
}

.title,
.subtitle {
  color: inherit;
}
</style>

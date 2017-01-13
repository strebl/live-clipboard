<template>
  <div class="title-bar">
    <div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            Clipboard <span class="clipboard-id">{{ clipboardId }}</span>
          </div>
          <div class="level-item">
            <connection-indicator></connection-indicator>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import ConnectionIndicator from './ConnectionIndicator.vue'
import Store from '../helpers/store'

export default {
  data () {
    return {
      store: Store
    }
  },
  computed: {
    clipboardId () {
      return this.store.clipboardId
    }
  },
  components: { ConnectionIndicator }
}
</script>

<style>
.title-bar {
  text-align: center;
  color: #E2F0FB;
  background: #2E4155;
  padding: 1.75rem 2rem;
  font-size: 1.25rem;
}

.title-bar .tag {
  vertical-align: text-bottom;
}

.clipboard-id {
  font-weight: bold;
}

.clipboard-id::before,
.clipboard-id::after {
  content: '/';
  color: #00D1B2;
  font-size: 1.5rem;
  line-height: 1;
}

.clipboard-id::before {
  margin-left: .6rem;
  margin-right: .2rem;
}

.clipboard-id::after {
  margin-right: .1rem;
  margin-left: .2rem;
}
</style>

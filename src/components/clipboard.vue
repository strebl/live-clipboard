<template>
  <div id="clipboard">
    <div id="code-mirror-container" ref="cm" @keyup="shareClipboard()"></div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/php/php'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/keymap/sublime'
import CryptoJS from 'crypto-js'
import throttle from 'lodash/throttle'
import Pusher from 'pusher-js'
import Bus from '../helpers/bus'
import Store from '../helpers/store'

export default {
  pusher: null,
  data () {
    return {
      clientId: null,
      channel: null,
      code: 'var foo = "bar";',
      store: Store,
      shouldShare: false
    }
  },
  computed: {
    clipboard () {
      return this.encryptClipboard()
    }
  },
  props: ['clipboardId'],
  mounted () {
    this.clientId = (Math.random() + 1).toString(36).substring(7)

    this.pusher = new Pusher('d24f5c60a087b764b609', { 
      cluster: 'eu',
      encrypted: true,
      authEndpoint: 'https://clipboard-backend.dev/broadcasting/auth' 
    })

    this.channel = this.pusher.subscribe('private-Clipboard.' + this.clipboardId)

    this.listenToEvents()

    this.$nextTick(this.initCodeMirror)
  },
  watch: {
    clipboardId (newClipboardId, oldClipboardId) {
      this.updateChannelSubscription(oldClipboardId, newClipboardId)
    }
  },
  methods: {
    listenToEvents () {
      this.listenToChannelEvents()
      this.listenToConnectionEvents()
    },

    listenToChannelEvents() {
      this.channel.bind('pusher:subscription_succeeded', () => {
        Bus.$emit('clipboard:connected')
        this.shouldShare = true
      })

      this.channel.bind('pusher:subscription_error', () => {
        Bus.$emit('clipboard:connection_error')
      })

      this.channel.bind('client-clipboard:changed', (event) => {
        let clipboard = this.decryptClipboard(event.clipboard)

        this.code = clipboard
      })
    },

    listenToConnectionEvents() {
      /* 
       * Connection states
       * https://pusher.com/docs/client_api_guide/client_connect#connection-states
       */
      this.pusher.connection.bind('unavailable', () => {
        Bus.$emit('clipboard:disconnected')
      })

      this.pusher.connection.bind('connecting', () => {
        Bus.$emit('clipboard:disconnected')
      })
    },

    updateChannelSubscription (oldClipboardId, newClipboardId) {
      // Disable sharing until the new subscription is established.
      this.shouldShare = false

      this.pusher.unsubscribe('private-Clipboard.' + oldClipboardId)
      this.code = ''
      this.channel = this.pusher.subscribe('private-Clipboard.' + newClipboardId)

      this.listenToChannelEvents()
    },

    initCodeMirror () {
      var vm = this

      var cm = CodeMirror(this.$refs.cm, {
        mode: 'markdown',
        lineNumbers: false,
        theme: 'material',
        viewportMargin: Infinity,
        keyMap: 'sublime'
      })

      // Update the data if the code mirror value changes
      cm.on('change', () => {
        this.code = cm.getValue()
      })

      // Set the initial value
      cm.setValue(this.code)

      // If the model changes, set the code mirror value
      this.$watch('code', (value) => {                    
        if (value !== cm.getValue()) {
          cm.setValue(value)
        }

        this.detectLanguage(cm, value)
      })
    },

    detectLanguage(cm, value) {
        const regex = /^(?:#|!|#!|\/\/|<\?) ?(\w+) ?$/m
        const match = regex.exec(value)

        let lang = match ? match[1] : 'markdown'
        lang = CodeMirror.modes.hasOwnProperty(lang) ? lang : 'markdown'

        if(cm.getMode() != lang) {
          cm.setOption('mode', lang)
        }
    },

    shareClipboard: throttle(function () {
      if(this.shouldShare) {
        const clipboard = this.encryptClipboard()

        this.channel.trigger('client-clipboard:changed', { 
          client: this.clientId,
          clipboard: clipboard,
          socket_id: this.pusher.connection.socket_id 
        })  
      }
    }, 1000),

    encryptClipboard () {
      return CryptoJS.AES.encrypt(this.code, 'secret key 123').toString()
    },

    decryptClipboard(encryptedClipboard) {
      return CryptoJS.AES.decrypt(encryptedClipboard.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)
    }
  }
}
</script>

<style>
#clipboard {
  background: #36495D;
  color: white;
  flex-grow: 1;

  display: flex;
  align-items: stretch;
}

#code-mirror-container {
  flex: 1;
}

.CodeMirror {
  width: 100%;
  height: 100%;
  background: #36495D;
  font-family: 'Inconsolata', monospace;
}
</style>

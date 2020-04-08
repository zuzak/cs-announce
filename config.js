const convict = require('convict')

let config = convict({
  irc: {
    /* Most of these are taken from the node-irc module */
    server: {
      doc: 'the IRC server to connect to',
      format: String,
      default: 'chat.freenode.net',
      env: 'IRC_SERVER'
    },
    debug: {
      doc: 'Whether to enable debug messages from the node-irc library',
      format: Boolean,
      default: true
    },
    retryCount: {
      doc: 'Number of times to try reconnecting if disconnected',
      format: 'nat',
      default: 0,
    },
    port: {
      doc: 'the port to connect to the IRC server on',
      format: 'port',
      default: 6697,
      env: 'IRC_PORT'
    },
    sasl: {
      doc: 'Whether to use the Simple Authentication and Security Layer to connect',
      format: Boolean,
      default: false,
      env: 'SASL'
    },
    nick: {
      doc: 'The IRC nickname to try to use first',
      format: String,
      default: 'cs-announce-' + Math.round(Math.random() * 100),
      env: 'IRC_NICK'
    },
    realName: {
      doc: 'The string that appears in whois; ideally something that identifies the operator (you)',
      format: String,
      default: 'https://github.com/zuzakistan/cs-announce',
      env: 'IRC_REALNAME'
    },
    userName: {
      doc: 'The bit that appears before the @ in the host string',
      format: String,
      env: 'IRC_USERNAME',
      default: 'csa'
    },
    password: {
      doc: 'The password used to connect to IRC',
      format: String,
      env: 'IRC_PASSWORD',
      sensitive: true,
      default: null
    },
    channels: {
      doc: 'the channels to connect to',
      format: Array,
      default: ['##zuzakistan-feed']
    },
    secure: {
      doc: 'Whether to connect to IRC via SSL',
      format: Boolean,
      env: 'IRC_SECURE',
      default: true
    }
  },
  udp: {
    port: {
      doc: 'UDP port to listen for things to repeat',
      format: 'port',
      default: null,
      env: 'UDP_PORT'
    },
    server: {
      doc: 'IP address to bind UDP port to',
      format: 'ipaddress',
      default: '0.0.0.0',
      env: 'UDP_SERVER',
    }
  }
})

try {
  config.loadFile((process.env.NODE_ENV || 'config') + '.json')
} catch (e) {
  console.error('Not loading configuration from file')
  console.error(e)
}

module.exports = config

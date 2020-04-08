const dgram = require('dgram')
const config = require('./config')
const irc = require('irc')

const bot = new irc.Client(
  config.get('irc.server'),
  config.get('irc.nick'),
  config.get('irc')
)

const PORT = config.get('udp.port')
const SERVER = config.get('udp.server')

const server = dgram.createSocket('udp4')

server.on('message', (msg, rinfo) => {
  const message = msg.toString()
  console.log('=> ' + message)
  for (channel of config.get('irc.channels')) {
    bot.notice(channel, message)
  }
})

server.bind(PORT, SERVER, () => console.log(`Listening for UDP packets on ${SERVER}:${PORT}`))

bot.connect((welcomeMsg) => {
  if (welcomeMsg.user && welcomeMsg.host) {
    console.log(`Connected to ${welcomeMsg.host} as ${welcomeMsg.user}`)
  } else {
    console.log('Connected to IRC')
  }
})

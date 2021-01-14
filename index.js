const quickuptime = require('quickuptime')
const Discord = require('discord.js')
const Client = new Discord.Client()
Client.on('ready', () => {
  console.log(`Bot is Online`)
  console.log("https://discord.com/api/oauth2/authorize?client_id=798895362731409408&permissions=8&scope=bot")
})
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
var prefix
const db = require(`wio.db`)
const client = new quickuptime.Client()
const url1 = "https://discordcanvas-test.ytygrunn1ngark.repl.co"
// Starts uptiming the url's stored the in the db within an interval of 60000ms or the time configured in ms.
client.start() 
Client.on('message', async message => {
  let guild = message.guild
prefix = await db.fetch(`Prefix_${guild.id}`)
if (prefix === null) prefix = "?"
let args = message.content.slice(prefix.length).trim().split(/ +/g)
let cmd = args.shift()
let m = message.channel
if (cmd === "addurl") {
  if (!args[0]) return m.send(`
  please say one of the following 
  **pinging**
  **uptime**
  `)
  if (args[0] === "pinging") {
  if (!args[1]) return m.send('Please send a url')
client.addurl(args[0])
m.send(`
${args[0]} has been added to the database
`) 
}
if (args[0] === "uptime") {
  if (!args[1]) return m.send("please say a url")
  if (!args[2]) return m.send(`Please say a time in milliseconds
  https://www.bing.com/search?q=milliseconds%20to%20seconds&pc=cosp&ptag=G6C15N113674A86D0E8F426&form=CONBDF&conlogo=CT3210127
  `)
  client.uptime(args[1], args[2])
  m.send(`${args[1]} has been added to the db and will ping every ${args[2]} milliseconds`)
}
}
if (cmd === "prefix") {
  if(!args[0]) return m.send(`Prefix is: ${prefix}`)
let oldp = await db.fetch(`Prefix_${guild.id}`)
  m.send(`
  Prefix has been setted
  old prefix: ${oldp}
  new prefix: ${args[0]}
  `)
    db.set(`Prefix_${guild.id}`, args[0])
}
if (cmd === "setuptime") {
   if (message.author.id === process.env.OwnerID) return m.send(`Your not <@${process.env.OwnerID}>`)
  if (!args[0]) return m.send(`Please say a time in milliseconds
  https://www.bing.com/search?q=milliseconds%20to%20seconds&pc=cosp&ptag=G6C15N113674A86D0E8F426&form=CONBDF&conlogo=CT3210127
  `)
  client.setinterval(args[0])
  m.send(`${args[0]} has been set to the interval time`)

}
if (cmd === "clearuptime") {
   if (message.author.id === process.env.OwnerID) return m.send(`Your not <@${process.env.OwnerID}>`)
  client.clear()
  m.send(`Uptime db has been cleared`)
}
if (cmd === "remove") {
  if (!message.author.id === process.env.OwnerID) return m.send(`Your not <@${process.env.OwnerID}>`)
  if (!args[0]) return m.send(`Please say a url from the database`)
  client.removeurl(args[0])
  m.send(`${args[0]} has been removed from the database`)
}
if (cmd === "stop") {
  if (!args[0]) return m.send(`
  **PLEASE SAY ONE OF THE FOLLOWING BELOW**
  **UPTIME**
  **PINGING**
  `)
  if (args[0] === "uptime") {
    client.stopuptime()
  }
  if (args[0] === "pinging") {
    client.stop()
  }
}
if (cmd === "list") {
  m.send(client.allurls())
}
// Adds the url to the database.

// Removes the specific url from the database if exists.
//client.removeurl() 

// Sets up a temp pinger which will ping the url supplied every interval supplied ms.
//client.uptime(url1, 6000) 

// Clear all the data present.
//client.clear() 

// Sets the time in ms to ping the urls after.


// Stops the pinging process.
//client.stop() 

// Stops the temp pinging process.
//client.stopuptime() 

// Returns all of the urls present in the database in an array form.

})
console.log(client.allurls()) 
Client.login(process.env.token)
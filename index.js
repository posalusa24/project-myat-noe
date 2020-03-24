/*preset_msgs = {
  '1.4': 'An interrupt is a mechanism by which other modules (I/O, memory) may interrupt the normal sequencing of the processor.',
  '1.5': 'Two approaches can be taken to dealing with multiple interrupts. The first is to disable interrupts while an interrupt is being processed. A second approach is to define priorities for interrupts and to allow an interrupt of higher priority to cause a lower-priority interrupt handler to be interrupted.'
}*/
stored_files = [
  ["OS Textbook", "https://drive.google.com/open?id=1SQoa5FJs93NZTpcyNtxawcgTstxOqk5_"],
  ["Thomas' Calculus", "https://drive.google.com/open?id=1qtoAgGu6VFwZowBMcyb49Z3UZLS6q6qD"]
]
moti_strings = ["\u1010\u1005\u103A\u1014\u1031\u1037\u1010\u1005\u103A\u101C\u1036 \u1015\u102F\u1002\u1036\u1018\u101A\u103A\u1019\u101B\u103D\u1031\u1037😙", "I need you like a heart needs a beat <3", "Biology is the study of living things🐸", "FA \u1010\u103D\u1031\u1014\u1032\u1037\u1005\u1000\u102C\u1038\u1019\u1015\u103C\u1031\u102C\u1018\u1030\u1038🙄"]
//alias_cmds = {}

const { Client } = require('libfb')
const request = require('request');
const client = new Client()
client.login(process.env.USERNAME, process.env.PASSWORD).then(() => {
  console.log('Logged in')
  client.on('message', message => {
    console.log("message: ")
    console.log(message)
    /*for (const key of Object.keys(alias_cmds)) {
      message.message = message.message.replace(key, alias)
    }*/
    args = message.message.split(' ')
    if (args[0] === '.m') {
      if (args[1] === 'help') {
        client.sendMessage(message.threadId, 'Commands:\n' +
          'help - List commands\n' + 
          'version - Show version\n' +
          'moti - Give motivation\n' +
          'say <sentence> - Repeat sentence\n' +
          'meme - Send meme\n' +
          'listfiles - List stored files by id\n' +
          'getfile <id> - Get link to file with id <id>')
        /*client.sendMessage(message.threadId, 'Commands:')
        client.sendMessage(message.threadId, 'help - List commands')
        client.sendMessage(message.threadId, 'version - Show version')
        client.sendMessage(message.threadId, 'moti - Give motivation')
        client.sendMessage(message.threadId, 'say <sentence> - Repeat sentence')
        client.sendMessage(message.threadId, 'meme - Send meme')
        client.sendMessage(message.threadId, 'file - List stored files by id')
        client.sendMessage(message.threadId, 'file <id> - Get link to file with id <id>')*/
        //client.sendMessage(message.threadId, 'alias <command> <alias> - Binds ".m <command>" to "<alias>"')
      } else if (args[1] === 'version') {
        client.sendMessage(message.threadId, 'Myat Noe v0.1 "Lily"')
      } else if (args[1] === 'moti') {
        client.sendMessage(message.threadId, moti_strings[Math.floor(Math.random() * moti_strings.length)])
      } else if (args[1] === 'say') {
        client.sendMessage(message.threadId, message.message.substring(message.message.indexOf("say")+4))
      } else if (args[1] === 'meme') {
        request('https://meme-api.herokuapp.com/gimme', { json: true }, (err, res, body) => {
          if (err) return console.log(err)
          client.sendMessage(message.threadId, body.url)
        });
      } else if (args[1] === 'listfiles') {
        var temp = "Stored files:\n"
        for (var i = 0; i < stored_files.length; i++) {
          temp += i + ". " + stored_files[i][0] + "\n"
        }
        client.sendMessage(message.threadId, temp)
      } else if (args[1] === 'getfile') {
        if (!isNaN(args[2])) {
          client.sendMessage(message.threadId, "Link to \"" + stored_files[args[2]][0] + "\" -> " + stored_files[args[2]][1])
        } else {
          client.sendMessage(message.threadId, "Invalid argument")
        }
      /*} else if (args[1] === 'alias') {
        if (args[2] && args[3]) {

        } else {
          client.sendMessage(message.threadId, "Invalid arguments for alias")
        }*/
              /*} else if (args[1] === 'OS') {
        for (const key of Object.keys(preset_msgs)) {
          if (args[2] == key) {
            client.sendMessage(message.threadId, preset_msgs[key])
          }
        }
      } else if (args[1] === 'pdf') {
        for (const key of Object.keys(file_urls)) {
          if (args[2] == key) {
            client.sendMessage(message.threadId, file_urls[key])
            return
          }
        }
        client.sendMessage(message.threadId, 'pdf twy ka...\n\'OS\' shi dl\n\'thomas\' shi dl')*/
      } else {
        client.sendMessage(message.threadId, 'Invalid command. Send ".m help"')
      }
    }
  })
})

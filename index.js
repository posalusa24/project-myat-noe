preset_msgs = {
    '1.4': 'An interrupt is a mechanism by which other modules (I/O, memory) may interrupt the normal sequencing of the processor.',
    '1.5': 'Two approaches can be taken to dealing with multiple interrupts. The first is to disable interrupts while an interrupt is being processed. A second approach is to define priorities for interrupts and to allow an interrupt of higher priority to cause a lower-priority interrupt handler to be interrupted.'
}
file_urls = {
    'OS': 'https://drive.google.com/open?id=1SQoa5FJs93NZTpcyNtxawcgTstxOqk5_',
    'thomas': 'https://drive.google.com/open?id=1qtoAgGu6VFwZowBMcyb49Z3UZLS6q6qD'
}

const { Client } = require('libfb')
const client = new Client()
client.login(process.env.USERNAME, process.env.PASSWORD).then(() => {
  console.log('Logged in')
  client.on('message', message => {
    console.log('Got a message!')
    console.log(message)
    args = message.message.split(' ')
    if (args[0] === 'nyima,') {
        if (args[1] === 'OS') {
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
            client.sendMessage(message.threadId, 'pdf twy ka...\n\'OS\' shi dl\n\'thomas\' shi dl')
        } else if (message.message === 'nyima, sar ya p lrr') {
            client.sendMessage(message.threadId, 'hoke, ya pr p')
        } else {
            client.sendMessage(message.threadId, 'pyw ko g')
        }
    }
  })
})

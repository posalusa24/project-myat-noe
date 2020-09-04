const fs = require("fs");
const login = require("facebook-chat-api");

const credentials = {email: '09696268584', password: 'kokoead456'};

var appstate_cb = (err, api) => {
  if(err) {
    console.log("appstate session expired, creating new one");
    login(credentials, cred_cb);
  };    

  api.setOptions({
    selfListen: true,
    listenEvents: true
  });
  api.listenMqtt((err, event) => {
    if(event.type === "message" && event.body && event.body[0] == '!') {
      try {
        var fname = event.body.split('!').pop().split('(')[0];
        var fargs = event.body.split('(').pop().split(')')[0];
        var fextra = event.body.substring(event.body.indexOf(')') + 1);
        console.log(fname + " " + fargs + " " + fextra);
        eval(`api.${fname}(${fargs}, (err, ret) => api.sendMessage(JSON.stringify(err ? err : ret${fextra}, null, 2), event.threadID))`);
      } catch(e) {
        console.log(e);
        api.sendMessage("SysErr: " + JSON.stringify(e, null, 2), event.threadID);
      }
    }
    /*if (event.type === "message" && event.body.startsWith(".mquestion")) {
      var words = event.body.split(" ");
      console.log("Q To be added: Category: " + words[1] + " String: " + words.slice(2).join(" "));
      manager.addDocument('en', words.slice(2).join(" "), words[1]);
      manager.train().then(() => {
        console.log("training complete, saving");
        manager.save();
      });
    }
    if (event.type === "message" && event.body.startsWith(".manswer")) {
      var words = event.body.split(" ");
      console.log("A To be added: Category: " + words[1] + " String: " + words.slice(2).join(" "));
      manager.addAnswer('en', words[1], words.slice(2).join(" "));
      manager.train().then(() => {
        console.log("training complete, saving");
        manager.save();
      });
    }
    if (event.type === "message" && event.body.startsWith("@Myat Noe")) {
      console.log("To be processed: " + event.body.slice(10));
      manager.process('en', event.body.slice(9)).then(result => {
        api.sendMessage((result.answer?result.answer:"li twy pyw ny tr lrr"), event.threadID);
      });
    }*/
  });
};

var cred_cb = (err, api) => {
  if(err) return console.error(err);
  fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
  console.log("logging in again with appstate");
  login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, appstate_cb);
};

try {
  console.log("initial login with appstate");
  login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, appstate_cb);
} catch {
  console.log("appstate.json not valid, creating new one");
  login(credentials, cred_cb);
}


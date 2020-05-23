const fs = require("fs");
const login = require("facebook-chat-api");

const credentials = {email: '09696268584', password: 'kokotad456'};

var appstate_cb = (err, api) => {
  if(err) {
    console.log("appstate session expired, creating new one");
    login(credentials, cred_cb);
  };
  api.listenMqtt((err, event) => {
    if (event.type === "message") {
      api.sendMessage(event.body, event.threadID);
    }
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


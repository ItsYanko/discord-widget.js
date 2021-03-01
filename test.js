const { Widget } = require("./classes/classes");
const constants = require("./constants");
(async () => {
    let a = await new Widget(constants.test.id);
    console.log(`
        ID: ${a.id}
        Name: ${a.name}
        Users: ${a.users.length}
        Voice Channels: ${a.channels.length}
        Online: ${a.presenceCount}
        Invite: ${a.invite || "Not avaliable"}
        `);
})();
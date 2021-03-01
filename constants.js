'use strict'

module.exports = {
    hostnames: {
        discord_api: "https://discord.com/api/"
    },
    endpoints: {
        guild_widget: (str = false) => { return `guilds/${str || this.defaults.id}/widget.json` }
    },
    defaults: {
        name: "Unnamed Channel"
    },
    test: {
        id: "793919117513850880"
    }
}
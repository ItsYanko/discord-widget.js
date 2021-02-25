'use strict'

export default {
    hostnames: {
        discord_api: "https://discord.com/api/"
    },
    endpoints: {
        guild_widget: (str = false) => { return `guilds/${str || this.defaults.id}/widget.json` }
    },
    defaults: {
        id: "613425648685547541", // Discord Developers ID
        name: "Discord Developers" // Discord Developers Name
    }
}
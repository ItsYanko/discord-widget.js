'use strict';
const fetch = require('node-fetch');
const { Channel, Channels } = require("./classes/classes");

module.exports = class Widget {
    /**
     * Internal data structure
     * @private
     * @type {{id: String, name: String, invite: String}}
     */
    #data = {
        id: false,
        name: false,
        invite: false
    }
    /**
     * Widget instance
     * @param {String} ID Guild ID
     * @param {Function=} cb Optional callback
     * @returns {Widget}
     */
    constructor(ID, cb = false) {
        if (!/^[0-9]*$/.test(ID))
            throw new Error("Invalid guildID provided");

        this.#data.id = ID;
        this.#data.name = name;

        return this;
    }
}
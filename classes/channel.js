'use strict';

module.exports = class Channel {
    /**
     * Internal data structure
     * @private
     * @type {{id: String, name: String}}
     */
    #data = {
        id: false,
        name: false
    }
    /**
     * Channel instance
     * @param {String} ID Channel ID
     * @param {String} name Channel Name
     * @returns {Channel}
     */
    constructor(ID, name) {
        if (!ID || !name)
            throw new Error("No ID or Name provided");

        if (!/^[0-9]*$/.test(ID))
            throw new Error("Invalid channelID provided");

        this.#data.id = ID;
        this.#data.name = name;

        return this;
    }

    /**
     * Get guild ID
     * @returns {String}
     */
    get id(){
        return this.#data.id;
    }

    /**
     * Get guild name
     * @returns {String}
     */
    get name(){
        return this.#data.name;
    }
}
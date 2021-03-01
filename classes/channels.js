'use strict';

const constants = require("../constants");
const Channel = require("./channel");

/**
 * Create a new instance of Channels
 * @class
 * @name Channels
 * @param {Array<String, String>|Array<Array<String, String>>|Channel|Array<Channel>} input IDs or instances of channels
 * @returns {Channels}
 */
class Channels {
    #channels = [];
    constructor(input) {
        this.add(input);
        return this;
    }

    /**
    * Add channels to the instance
    * @param {Array<String, String>|Array<Array<String, String>>|Channel|Array<Channel>} input IDs or instances of channels
    */
    add(input) {
        let channels = [], channelInstances = [];
        if (!input)
            throw new Error("At least 1 channel is required.");

        if (input instanceof Channel)
            channels = [input];
        else if (Array.isArray(input))
            if (input.length === 2 && input.filter(e => { return typeof e === 'string' }).length === input.length)
                channels = [input]; // Array of ID/name pair
            else if (input.filter(e => { return e.length === 2 && e.filter(e => { return typeof e === 'string' }).length === e.length }).length === input.length)
                channels = input; // Array of Array of ID/name pair
            else if (input.filter(e => { return e instanceof Channel }).length === input.length)
                channels = input; // Array of channel instances
            else
                throw new Error("Input type is invalid.");
        else
            throw new Error("Input type is invalid.");

        channels.forEach((v, k) => {
            if (v instanceof Channel) {
                channelInstances[k] = v;
            } else {
                channelInstances[k] = new Channel(v[0], v[1] || constants.defaults.name);
            }
        })

        this.#channels.push(...channelInstances);
    }

    /** 
     * Array of Channel instances
     * @type {Array<Channel>}
    */
    get list() {
        return this.#channels;
    }

    /** 
     * Array of Channel IDs
     * @type {Array<String>}
    */
    get IDList() {
        return this.#channels.map(function (ch) { return ch.id; });
    }

    /**
     * Amount of channels
     * @type {Number}
     */
    get length() {
        return this.#channels.length;
    }

}

module.exports = Channels;
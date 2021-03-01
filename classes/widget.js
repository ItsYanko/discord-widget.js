'use strict';
const fetch = require('node-fetch');
const constants = require('../constants');
const Channels = require('./channels');
const Users = require('./users');

/**
 * Widget instance
 * @class 
 * @name Widget
 * @param {String} ID Guild ID
 * @param {Function=} cb Optional callback
 * @returns {Promise<Widget>}
 */
class Widget {
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
     * Cache after fetch
     * @private
     * @type {{users: Users, channels: Channels, presenceCount: Number, __cacheinfo: {cached: Boolean, cachedAt: Number}}}
     */
    #cache = {
        users: false,
        channels: false,
        presenceCount: false,
        __cacheinfo: {
            cached: false,
            cachedAt: false
        }
    }
    constructor(ID, cb = false) {
        return (async () => {
            this.#data.id = ID;

            if (await this.fetch())
                return this;
            else
                throw new Error("Error fetching from server"); // Fallback
        })();
    }

    /**
     * Load from server and save to instance
     * @returns {Promise<Boolean>} Returns true or throws err
     */
    async fetch() {
        if (!/^[0-9]*$/.test(this.#data.id))
            throw new Error("Invalid guildID provided");

        try {
            const res = await fetch(constants.hostnames.discord_api + constants.endpoints.guild_widget(this.#data.id));
            const data = await res.json();
            this.#data.name = data.name || "Unnamed Server";
            this.#data.invite = data.instant_invite || false;
            this.#cache.users = new Users(data.members.sort((a, b) => { return a.id - b.id }).map(e => { return [e.username, e.discriminator, e.avatar_url, e.status, e.game || false] }));
            this.#cache.channels = new Channels(data.channels.sort((a, b) => { return a.position - b.position }).map(e => { return [e.id, e.name] }));
            this.#cache.presenceCount = data.presence_count || (Array.isArray(data.members)) ? data.members.filter(e => { return e.status == 'online' }).length : false;
            this.#cache.__cacheinfo.cached = true;
            this.#cache.__cacheinfo.cachedAt = Date.now();
            return true;
        } catch (e) {
            throw new Error(`Error retrieving data from server: ${e.message || "Unknown error"}`);
        }
    }

    /**
     * Get users instance
     * @returns {Users}
     */
    get users() {
        if (!this.#cache.__cacheinfo.cached)
            throw new Error("Data not cached!")

        return this.#cache.users;
    }

    /**
     * Get channels instance
     * @returns {Channels}
     */
    get channels() {
        if (!this.#cache.__cacheinfo.cached)
            throw new Error("Data not cached!")

        return this.#cache.channels;
    }

    /**
     * Get channels instance
     * @returns {Number}
     */
    get presenceCount() {
        if (!this.#cache.__cacheinfo.cached)
            throw new Error("Data not cached!")

        return this.#cache.presenceCount;
    }

    /**
     * Get guild ID
     * @returns {String}
     */
    get id() {
        return this.#data.id;
    }

    /**
     * Get guild name
     * @returns {String}
     */
    get name() {
        if (!this.#cache.__cacheinfo.cached)
            throw new Error("Data not cached!")

        return this.#data.name;
    }

    /**
     * Get guild invite
     * @returns {String|Boolean}
     */
    get invite() {
        if (!this.#cache.__cacheinfo.cached)
            throw new Error("Data not cached!")

        return this.#data.invite || false;
    }
}

module.exports = Widget;
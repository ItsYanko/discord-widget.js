'use strict';

module.exports = class User {
    /**
     * Internal data structure
     * @private
     * @type {{username: String, discriminator: String, avatar: String, status: ('online'|'away'|'dnd'|'offline'), game: {name: String}}}
     */
    #data = {
        username: false,
        discriminator: false,
        avatar: false, // URL
        status: false,
        game: false
    }
    /**
     * User instance
     * @param {String} username Username
     * @param {String} discriminator XXXX without #
     * @param {String} avatar Avatar URL
     * @param {('online'|'away'|'dnd'|'offline')} status User status
     * @param {{name: String}|Boolean} game Custom activity or false
     * @returns {Channel}
     */
    constructor(username, discriminator, avatar, status, game = false) {
        if (!username || !discriminator || !avatar || !status)
            throw new Error("Required parameter missing");

        if (!/^\d{4}$/.test(discriminator))
            throw new Error("Invalid discriminator provided");

        if (!['online', 'idle', 'dnd', 'offline'].includes(status))
            throw new Error(`Invalid status "${status}" provided`);

        this.#data.username = username;
        this.#data.discriminator = discriminator;
        this.#data.avatar = avatar || false;
        this.#data.status = status;
        this.#data.game = game || false;
        return this;
    }

    /**
     * Get all data as a object
     * @returns {{username: String, discriminator: String, avatar: String, status: ('online'|'away'|'dnd'|'offline'), game: {name: String}}}
     */
    json() {
        return JSON.parse(JSON.stringify(this.#data));
    }

    /**
     * Get full username (w/ discriminator)
     * @returns {String}
     */
    get full() {
        if (!this.#data.username || !this.#data.discriminator)
            return false;
        return this.#data.username + this.#data.discriminator;
    }

    get username() {
        return this.#data.username;
    }

    get discriminator() {
        return this.#data.discriminator;
    }

    get avatar() {
        return this.#data.avatar;
    }

    get status() {
        return this.#data.status;
    }

    get game() {
        return this.#data.game || false;
    }
}
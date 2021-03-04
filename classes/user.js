'use strict';

/**
 * User instance
 * @class
 * @name User
 * @example const userInstance = new User("USERNAME", "DISCRIMINATOR", "AVATAR", "STATUS")
 * @param {String} username Username
 * @param {String} discriminator XXXX without #
 * @param {String} avatar Avatar URL
 * @param {('online'|'away'|'dnd'|'offline')} status User status
 * @param {{name: String}|Boolean} game Custom activity or false
 * @returns {User}
 */
class User {
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
     * All data as a object
     * @returns {{username: String, discriminator: String, avatar: String, status: ('online'|'away'|'dnd'|'offline'), game: {name: String}}}
     */
    json() {
        return JSON.parse(JSON.stringify(this.#data));
    }

    /**
     * full username (w/ discriminator)
     * @type {String}
     */
    get full() {
        if (!this.#data.username || !this.#data.discriminator)
            return false;
        return this.#data.username + this.#data.discriminator;
    }

    /**
     * Username
     * @type {String}
     */
    get username() {
        return this.#data.username;
    }

    /**
     * 4 digit discriminator
     * @type {String}
     */
    get discriminator() {
        return this.#data.discriminator;
    }

    /**
     * Avatar URL
     * @type {String}
     */
    get avatar() {
        return this.#data.avatar;
    }

    /**
     * User Status
     * @type {('online'|'idle'|'dnd'|'offline')}
     */
    get status() {
        return this.#data.status;
    }

    /**
     * Game object (or false)
     * @type {Object|Boolean}
     */
    get game() {
        return this.#data.game || false;
    }
}

module.exports = User;
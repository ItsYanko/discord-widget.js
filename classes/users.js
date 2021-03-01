'use strict';

const constants = require("../constants");
const User = require("./user");

/** 
 * Collection of User instances 
 * @class
 * @name Users
 * @param {Array<String, String, String, String>|Array<Array<String, String, String, String>>|User|Array<User>} input IDs or instances of users
 * @description Create a new instance of Users
 * @returns {Users}
 */
class Users {
    #users = [];
    constructor(input) {
        this.add(input);
        return this;
    }

    /**
    * Add users to the instance
    * @param {Array<String, String, String, String>|Array<Array<String, String, String, String>>|User|Array<User>} input IDs or instances of users
    */
    add(input) {
        let users = [], userInstances = [];
        if (!input)
            throw new Error("At least 1 user is required.");

        if (input instanceof User)
            users = [input];
        else if (Array.isArray(input))
            if ((input.length === 4 || input.length === 5))
                users = [input]; // Array of user data
            else if (input.filter(e => { return (e.length === 4 || e.length === 5) }))
                users = input; // Array of Array of user data
            else if (input.filter(e => { return e instanceof User }).length === input.length)
                users = input; // Array of user instances
            else
                throw new Error("Input type is invalid.");
        else
            throw new Error("Input type is invalid.");

        users.forEach((v, k) => {
            if (v instanceof User) {
                userInstances[k] = v;
            } else {
                userInstances[k] = new User(v[0], v[1], v[2], v[3], v[4] || false);
            }
        })

        this.#users.push(...userInstances);
    }

    /** 
     * Array of User instances
     * @type {Array<User>}
    */
    get list() {
        return this.#users;
    }

    /** 
     * Array of usernames
     * @type {Array<String>}
    */
    get nameList() {
        return this.#users.map((usr) => { return usr.full; });
    }

    /**
     * Amount of users
     * @type {Number}
     */
    get length() {
        return this.#users.length;
    }
}

module.exports = Users;
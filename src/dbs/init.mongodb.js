'use strict'

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect')

const connectionString = `mongodb://localhost:27017/shopDEV`

class Database {
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'mongo') {
        if (type === 'mongo') {
            mongoose.connect(connectionString)
                .then(_ => {
                    console.log(`Connected Mongodb Success`)
                    countConnect()
                })
                .catch(err => console.log(`Error Connect!`))
        }

        // dev
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
require('dotenv').config({path: '../.env'})
const Pool = require('pg').Pool


const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    host: process.env.HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB
})

module.exports = pool
require('dotenv').config()


const mysql = require('mysql2')
const pool = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// pool.end()





// const { createPool } = require('mysql')

// // const pool = createPool({
// //   // ssl  : {
// //   //     rejectUnauthorized: true
// //   // },
// //     host: process.env.DB_HOST,
// //     port: process.env.MYSQL_PORT,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     database: 'coursecenter',
// //     connectionLimit: 10,
// // });


module.exports = pool

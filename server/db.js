const Pool = require('pg').Pool;
const pool = new Pool({
   host:'localhost',
   user:'postgres',
   password:"200212",
   port:5432,
   database:'car_rental'
})

module.exports = pool;
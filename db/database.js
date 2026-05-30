const {Pool} = require("pg")
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

pool.on("connect", ()=>{
  console.log("Database connected Successfully")
})

module.exports = {pool}

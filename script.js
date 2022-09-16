const { Pool, Client } = require("pg")

const dotenv = require("dotenv")
dotenv.config()

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: 5432,
})

async function readAllTableware() {
  const res = await pool.query("SELECT * FROM tableware")
  //console.log(res)
  return res.rows
}

async function createTableware() {
  await pool.query("INSERT INTO food (type, name, price) VALUES ($1, $2, $3)", [
    "fruit",
    fruit.name,
    fruit.price,
  ])
}

readAllTableware()

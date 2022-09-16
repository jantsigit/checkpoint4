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
  console.log(res.rows)
  return res.rows
}

async function createTableware(nimi, maara) {
  await pool.query("INSERT INTO tableware (name, qty) VALUES ($1, $2)", [
    nimi,
    maara,
  ])
  console.log(`Lisätty  ${nimi} ${maara} kpl tableware tauluun`)
}

createTableware("veitsi", 10)

//timeout jotta uusin päivitys näkyy myös
setTimeout(() => {
  readAllTableware()
}, 2000)

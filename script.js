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

async function createTableware(nimi, maara, officeID) {
  await pool.query(
    "INSERT INTO tableware (name, qty, office_id) VALUES ($1, $2, $3)",
    [nimi, maara, officeID]
  )
  console.log(`Lisätty  ${nimi} ${maara} kpl tableware tauluun`)
}

createTableware("kattila", 3, 3)
//timeout jotta uusin päivitys näkyy myös
/*
setTimeout(() => {
  readAllTableware()
}, 2000)*/

async function createOffice(name, location, startYear) {
  await pool.query(
    "INSERT INTO office (name, location, starting_year) VALUES ($1, $2, $3)",
    [name, location, startYear]
  )
  console.log(`Lisätty  ${name} ${location} ${startYear} office tauluun`)
}

//createOffice("Academy Germany", "Munchen", 2018)

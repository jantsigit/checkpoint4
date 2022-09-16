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
  const res = await pool.query(
    "select tableware.name, tableware.qty, office.location from tableware inner join office on tableware.office_id=office.id"
  )
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

async function updateTableware(id, nimi, maara, officeID) {
  await pool.query(
    "UPDATE tableware SET name=$2, qty=$3, office_id=$4 WHERE id = $1",
    [id, nimi, maara, officeID]
  )
  console.log(`Muutettu  ID:${id} tietoja tableware taulussa`)
}

async function deleteTableware(id) {
  await pool.query("DELETE FROM tableware WHERE id=$1", [id])
  console.log(`Poistettu ID:${id} tableware taulusta`)
}

//readAllTableware()
//deleteTableware(12)
//updateTableware(1, "lautanen", 3, 2)
//createTableware("kattila", 3, 3)

async function createOffice(name, location, startYear) {
  await pool.query(
    "INSERT INTO office (name, location, starting_year) VALUES ($1, $2, $3)",
    [name, location, startYear]
  )
  console.log(`Lisätty  ${name} ${location} ${startYear} office tauluun`)
}

//createOffice("Academy Germany", "Munchen", 2018)

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

// TABLEWAREN FUNKTIOT
//readAllTableware()
//deleteTableware(12)
//updateTableware(1, "lautanen", 3, 2)
//createTableware("kattila", 3, 3)

async function readAllOffices() {
  const res = await pool.query("select * from office")
  console.log(res.rows)
  return res.rows
}

async function createOffice(name, location, startYear) {
  await pool.query(
    "INSERT INTO office (name, location, starting_year) VALUES ($1, $2, $3)",
    [name, location, startYear]
  )
  console.log(`Lisätty  ${name} ${location} ${startYear} office tauluun`)
}

async function updateOffice(id, nimi, lokaatio, startYear) {
  await pool.query(
    "UPDATE office SET name=$2, location=$3, starting_year=$4 WHERE id = $1",
    [id, nimi, lokaatio, startYear]
  )
  console.log(`Muutettu  ID:${id} tietoja office taulussa`)
}

async function deleteOffice(id) {
  await pool.query("DELETE FROM office WHERE id=$1", [id])
  console.log(`Poistettu ID:${id} office taulusta`)
}

//OFFICEN FUNKTIOT
//createOffice("Academy Norway", "Oslo", 2022)
//readAllOffices()
//updateOffice(1, "Brights Finland", "Espoo", 2017)
//deleteOffice(4)

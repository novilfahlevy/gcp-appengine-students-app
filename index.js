const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql')

let conn = null

app.get('/', (req, res) => {
  res.send('GCP App Engine Students Data')
})

app.get('/students', (req, res) => {
  if (conn != null) {
    conn.query('SELECT * FROM students', (err, result) => {
      if (err) res.status(500).send(err)
      res.send(result)
    })
  }
})

app.listen(port, () => {
  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })

  console.log(`Example app listening on port ${port}`)
})
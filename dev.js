const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))
app.use(express.static('build'))

app.listen(port, () => {
  console.log(`dev server listening at http://localhost:${port}`)
})
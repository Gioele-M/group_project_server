const express = require('express')
const app = express()
//import cors and app.use cors
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => { 
    // .get requires the page
    res.send('Hello Auguste!') //This is what's put on the page
}) 



module.exports = app

// Dependencies 
const express = require('express')
const path = require('path')

// Server
const app = express()

// View engine 
app.set('view engine', 'ejs')

// Set up static files server needs to access
app.use(express.static('public'))
app.use('/three', express.static(path.join(__dirname, '/node_modules/three/build/three.min.js')))   // Three.js 
app.use('/three/OrbitControls', express.static(path.join(__dirname, '/node_modules/three/examples/js/controls/OrbitControls.js')))

// Routes 
app.get('/room', (req, res) => {
    // Fetch user ID 
    const userID = req.query.id

    // Render files
    res.render('index')
})

// Server listens on PORT 3000
app.listen(3000)
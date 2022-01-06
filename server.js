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
app.use('/three/GLTFLoader', express.static(path.join(__dirname, '/node_modules/three/examples/js/loaders/GLTFLoader.js')))
app.use('/three/RectAreaLightHelper', express.static(path.join(__dirname, '/node_modules/three/examples/js/helpers/RectAreaLightHelper.js')))
app.use('/datgui', express.static(path.join(__dirname, '/node_modules/dat.gui/build/dat.gui.js')))

// Routes 
app.get('/room', (req, res) => {
    // Fetch user ID 
    const userID = req.query.id
    const userItems = req.query.items
    
    // Render files
    res.render('index', { data: userItems })
})

// Server listens on PORT 3000
app.listen(3000)
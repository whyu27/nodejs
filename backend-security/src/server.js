require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const cors = require('../middleware/corsPackage')
app.use(cors)

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/test-cors', (req, res) => {
    res.json({
        message: 'CORS is working',
        origin: req.headers.origin,
        timestamp: new Date().toISOString()
    })
})

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to backend security',
        endpoint: {
            cors: 'GET/test-cors',
            validation: 'POST/validate',
            sanitization: 'POST/sanitize',
            authentication: 'GET/auth',
            hashing: 'POST/register'
        }
    })
})

app.listen(PORT, () => {
    console.log(`Berjalan di http://localhost:${PORT}`)
})
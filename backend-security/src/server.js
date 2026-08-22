require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const cors = require('../middleware/corsPackage')
app.use(cors)

const {validateRegister, validateLogin, isValidEmail, isValidUsername, isValidPassword} = require('../middleware/validator')
const {sanitizeObject} = require('../middleware/sanitizer')

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

app.post('/validate', (req, res) => {
    const {email, username, password} = req.body

    res.json({
        received: {email, username, password},
        validation: {
            email: isValidEmail(email),
            username: isValidUsername(username),
            password:isValidPassword(password)
        }
    })
})

app.post('/register', validateRegister, (req, res) => {
    res.json({
        success: true,
        message: 'register success',
        data: req.body
    })
})

app.post('/login', validateLogin, (req, res) => {
    res.json({
        success: true,
        message: 'login success',
        data: req.body
    })
})

app.post('/sanitize', (req, res) => {
    const original = req.body
    const sanitized = sanitizeObject(req.body);
    res.json({
        original: original,
        sanitized: sanitized,
        message: 'Data has been sanitized'
    })
})

app.listen(PORT, () => {
    console.log(`Berjalan di http://localhost:${PORT}`)
})
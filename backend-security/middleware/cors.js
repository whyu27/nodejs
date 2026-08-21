// Membuat CORS Manual

const cors = (req, res, next) => {
    const allowedOrigin = [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://yourdomain.com'
    ]

    const origin = req.headers.origin

    if(allowedOrigin.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin)
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requester-With')

    if(req.method === 'OPTIONS'){
        return res.sendStatus(204)
    }

    next()
}

const corsDev = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requester-With')

    if(req.method === 'OPTION'){
        return res.sendStatus(204)
    }

    next()
}

module.exports = {cors, corsDev} 
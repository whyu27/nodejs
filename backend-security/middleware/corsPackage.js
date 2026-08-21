// const cors = require('cors')

// const allowedOrigin = [
//     'http://localhost:8080',
//     'http://localhost:3000',
//     'https://yourdomain.com'
// ]

// const corsOption = {
//     origin: function (origin, callback) {

//         // Request tanpa Origin
//         if (!origin) {
//             return callback(null, true)
//         }

//         // Origin diizinkan
//         if (allowedOrigin.includes(origin)) {
//             return callback(null, true)
//         }

//         // Origin tidak diizinkan
//         return callback(new Error('CORS origin not allowed'))
//     },

//     credentials: true,

//     methods: [
//         'GET',
//         'POST',
//         'PUT',
//         'DELETE',
//         'OPTIONS'
//     ],

//     allowedHeaders: [
//         'Content-Type',
//         'Authorization',
//         'X-Requester-With'
//     ]
// }

// const corsDev = cors({
//     origin: '*'
// })

// module.exports = {
//     cors: cors(corsOption),
//     corsDev
// }

const cors = require('cors')

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'https://yourdomain.com'
    ]
}

module.exports = cors(corsOptions)
const http = require('http')
const url = require('url')

let users = [
    {id: 1, nama: 'Wahyu', email: 'wahyu@example.com'},
    {id: 2, nama: 'WahyuZav', email: 'whyuzav@example.com'}
]

let nextId = 3

function sendJSON(res, statusCode, data){
    res.writeHead(statusCode, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify(data))
}

function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            try{
                resolve(JSON.parse(body))
            } catch(err){
                reject(new Error ('Invalid JSON Format'))
            }
        })
    }) 
}

const server = http.createServer(async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const method = req.method
    
    if(path === '/users' && method === 'GET'){
        sendJSON(res, 200, users)
    }

    else if(path === '/' && method === 'GET'){
        sendJSON(res, 200, {message: 'Server siap menampilkan data users, silahkan akses /users'})
    }

    else if(path.startsWith('/users') && method === 'GET'){
        const id = parseInt(path.split('/')[2])
        const user = users.find(user => user.id === id)

        if(user){
            sendJSON(res, 200, user)
        }else{
            sendJSON(res, 404, {error: 'User tidak ditemukan'})
        }
    }

    else if(path === '/users' && method === 'POST'){
        try{
            const data = await parseBody(req)
            if(!data.nama || !data.email){
               return sendJSON(res, 400, {error: 'Nama dan Email Wajib Diisi'})
            }

            const newUser = {id: nextId++, ...data}
            users.push(newUser)

            sendJSON(res, 201, newUser)

        } catch{
            sendJSON(res, 400, {error: 'Body harus berupa JSON'})
        }
    }

    else if(path.startsWith('/users/') && method === 'PUT'){

        const id = parseInt(path.split('/')[2])
        const userIndex = users.findIndex(user => user.id === id)

        if(userIndex === -1){
            return sendJSON(res, 404, {error: 'User tidak ditemukan'})
        }

        try{
            const data = await parseBody(req)
            if(!data.nama || !data.email){
                return sendJSON(res, 400, {error: 'Nama dan Email Wajib Diisi'})
            }

            users[userIndex] = {id, ...data}
            sendJSON(res, 200, users[userIndex]);
        } catch{
            sendJSON(res, 404, {error: 'Body harus berupa JSON'})
        }
    }

    else if(path.startsWith('/users/') && method === 'DELETE'){
        const id = parseInt(path.split('/')[2])
        const initialLength = users.length

        users = users.filter(user => user.id !== id)

        if(users.length < initialLength){
            sendJSON(res, 200, {message: 'User berhasil dihapus'})
        }else{
            sendJSON(res, 404, {error: 'User tidak ditemukan'})
        }
    }

    else{
        sendJSON(res, 404, {error: 'Route tidak ditemukan'})
    }
})

server.listen(3000, () => {
    console.log('Berjalan di http://localhost:3000')
})
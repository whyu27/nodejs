const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('content-type', 'application/json');

    if(path === '/' && method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify({message: 'Selamat datang di server manual'}))
    } else if(path === '/users' && method === 'GET'){
        res.writeHead(200)
        res.end(JSON.stringify({users: ['Wahyu', 'Naila', 'Alya']}));
    } else{
        res.writeHead(404);
        res.end({message: 'Route tidak ditemukan'});
    }
})

server.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
})
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    if(url === '/' && method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify({message: 'success'}));
    } else if(url === '/users' && method === 'POST'){
        let body = '';

        req.on('data', (chunk) => {
            body+=chunk.toString();
        });

        req.on('end', () => {
            try{
                const data = JSON.parse(body);
                console.log('Data berhasil dikirim');
                
                res.writeHead(201);
                res.end(JSON.stringify({
                    message: 'Data diterima',
                    data: data
                }));
            } catch{
                res.writeHead(400);
                res.end(JSON.stringify({error: 'JSON tidak valid'}));
            }
        })


    } else {
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Route tidak ditemukan'}));
    }
})

server.listen(3000, () => {
    console.log('Berjalan di http://localhost:3000');
})
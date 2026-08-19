const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const method = req.method;
    const url = req.url;

    if(url === '/submit' && method === 'POST'){
        let body = '';

        req.on('data', (chunk) => {
            body+=chunk.toString();
        })

        req.on('end', () => {
            try{
                const data = JSON.parse(body);

                if(!data.nama || !data.email){
                    res.writeHead(400);
                    return res.end(JSON.stringify(
                        {
                            error: 'Nama dan Email Wajib Diisi'
                        }
                    ))
                }

                console.log('Berhasil menyimpan data', data);

                res.writeHead(200);
                res.end(JSON.stringify(
                    {
                        pesan: 'Data berhasil dikirim',
                        data: data,
                    }
                ));

            } catch(err){
                res.writeHead(400)
                res.end(JSON.stringify(
                    {
                        error: 'Format JSON tidak valid...'
                    }
                ))
            }
        })
    }
    
    else if(url === '/' && method === 'GET'){
        res.writeHead(200)
        res.end(JSON.stringify(
            {
                pesan: 'Server siap menerima data submit'
            }
        ));
    }
    
    else{
        res.writeHead(404)
        res.end(JSON.stringify(
            {
                error: 'Error Not Found'
            }
        ));
    }
})

server.listen(3000, () => {
    console.log('Berjalan di http://localhost:3000');
})
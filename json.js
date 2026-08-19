const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const data = {
        pesan: 'Hallo! Ini adalah response dari server',
        waktu: new Date().toISOString(),
        status: 'sukses',
        fitur: ['routing manual', 'parsing url', 'response JSON'],
    }

    res.writeHead(200);
    res.end(JSON.stringify(data));
})

server.listen(3000, () => {
    console.log('Berjalan di http://localhost/3000');
})
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathname = parseUrl.pathname;
    const query = parseUrl.query;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    if(pathname === '/cari' && method === 'GET'){
        const {kategori, harga_max} = query;

        if(!kategori){
            res.writeHead(400);
            return res.end(JSON.stringify({error: 'Parameter kategori wajib di isi'}));
        }

        const hasil = [
            {
                nama: 'Laptop',
                kategori: 'elektronik',
                harga: 5000000
            },
            {
                nama: 'Handphone',
                kategori: 'elektronik',
                harga: 3000000
            }
        ]. filter((item) => {
            return item.kategori === kategori && item.harga <= Number(harga_max);
        })

        res.writeHead(200);
        res.end(JSON.stringify(
            {
                query_diterima: query,
                jumlah_hasil: hasil.length,
                data: hasil,
            }
        ))
    }

    else if(pathname === '/'){
        res.writeHead(200);
        res.end(JSON.stringify(
            {
                message: 'Coba akses /cari?kategori=elektronik&harga_max=5000000'
            }
        ));
    }
    else{
        res.writeHead(404);
        res.end(JSON.stringify(
            {
                error: 'Route tidak ditemukan'
            }
        ))
    }
})

server.listen(3000, () => {
    console.log('Berjalan di http://localhost:3000');
})
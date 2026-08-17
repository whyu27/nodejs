// sinkronus

// const fs = require('fs');

// try {
//     const data = fs.readFileSync('read.txt', 'utf-8');
//     console.log(data);
// } catch(err){
//     console.error('Gagal membaca text', err.message);
// }

const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('read.txt', 'utf-8');
        console.log(data);
    } catch(err){
        console.error('Gagal membaca data', err.message);
    }
}

readFile();
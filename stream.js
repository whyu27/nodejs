// const fs = require('fs');

// const readStream = fs.createReadStream('sorting-paralel.mp4');
// const writeStream = fs.WriteStream('video-sorting-paralel.mp4');

// readStream.pipe(writeStream);

// writeStream.on('finish', () => {
//     console.log('Berhasil');
// })

// readStream.on('error', (err) => {
//     console.error('Gagal membaca file', err.message);
// })

// writeStream.on('error', (err) => {
//     console.error('Gagal menulis file', err.message);
// })

const fs = require('fs');
const {pipeline} = require('stream').promises;

async function copyData(){
    try{
        const readStream = fs.createReadStream('sorting-paralel.mp4');
        const writeStream = fs.createWriteStream('vid-sorting-paralel.mp4');

        await pipeline(readStream, writeStream);

        console.log('Berhasil menyalin data');

    } catch(err){
        console.error('Gagal menyalin data', err.message);
    }
}

copyData();
// Sinkronus
// const fs = require('fs');

// try{
//     const data = 'Ini adalah data yang ditambahkan!\n';

//     fs.appendFileSync('append.txt', data, 'utf-8');
//     console.log('Berhail ditambahkan');

// }catch(err){
//     console.error('Gagal menambahkan data', err.message);
// }

// Asinkronus
const fs = require('fs').promises;
const logger = require('./logging');

async function appendFile(){
    try{
        const data = 'Ini adalah data yang ditambahkan!\n';

        await fs.appendFile('append.txt', data, 'utf-8');
        logger.info('Berhasil menambahkan data ke append.txt');
        console.log('Berhasil ditambahkan');

    }catch(err){
        console.error('Gagal menambahkan data', err.message); 
    }
}

appendFile();
// Sinkronus
// const fs = require('fs');

// try{
//     const data = JSON.stringify(
//         {
//             pesan: 'Hallo, ini dari backend!',
//             waktu: new Date().getDay()
//         }
//     )

//     fs.writeFileSync('write.json', data, 'utf-8');
//     console.log('Berhasil membuat file');

// }catch(err){
//     console.error('Gagal membuat file', err.message);
// }


// Asinkronus
const fs = require('fs').promises;

async function writeFile(){
    try{
        const data = JSON.stringify(
            {
                pesan: 'Hallo, ini dari backend!',
                waktu: new Date()
            }
        )

        await fs.writeFile('write.json', data, 'utf-8');
        console.log('Berhasil membuat file');

    }catch(err){
        console.error('Gagal membuat file', err.message);
    }
}

writeFile();
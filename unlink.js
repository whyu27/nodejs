// Sinkronus
// const fs = require('fs');

// try{
//     fs.unlinkSync('unlink.txt');
//     console.log('File berhasil dihapus');

// } catch(err){
//     console.error('Gagal menghapus file', err.message);
// }

// Asinkronus
const fs = require('fs').promises;

async function unlink(){
    try{
        await fs.unlink('unlink.txt');
        console.log('Berhasil menghapus file');

    } catch(err){
        console.error('Gagal menghapus file', err.message);
    }
}

unlink();
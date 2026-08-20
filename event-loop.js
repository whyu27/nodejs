console.log('1. Mulai eksekusi')
console.log('2. Ini kode sinkron')

setTimeout(() => {
    console.log('Timeout 0 detik selesai')
}, 0)

Promise.resolve().then(() => {
    console.log('Promise selesai')
})

console.log('Akhir kode sinkron')
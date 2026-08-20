const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200)
    res.send('Hallo, backend udah siap nih!!')
})

app.get('/api/users', (req, res) => {
    const users = [
        {id: 1, nama: 'Wahyu', email: 'wahyu@example.com'},
        {id: 2, nama: 'Nei', email: 'nei@example.com'}
    ]

    res.status(200)
    res.json(
        {
            status: 'success',
            data: users
        }
    )
})

app.post('/api/login', (req, res) => {
    const {username, password} = req.body

    if(username === 'Wahyu' && password === 'WAHYU123'){
        res.status(200).json(
            {
                message: 'Selamat anda berhasil login'
            }
        )
    }else{
        res.status(401).json(
            {
                error: 'Username atau password anda salah'
            }
        )
    }
})

app.listen(PORT, () => {
    console.log(`Berjalan di http://localhost:${PORT}`)
})
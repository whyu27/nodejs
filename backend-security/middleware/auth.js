const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Basic')){
        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'Please provided basic authentication'
        })
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')

    const [username, password] = credentials.split(':')
    const validUsers = [
        {username: 'admin', password: 'admin123', role: 'admin'},
        {username: 'user', password: 'user123', role: 'user'},
    ]

    const user = validUsers.find(user => 
        user.username === username && 
        user.password === password
    )

    if(!user){
        return res.status(401).json({
            succes: false,
            error: 'Invalid credentials',
            message: 'Username or password is wrong'
        })
    }

    req.user = {
        username: user.username,
        role: user.role
    }

    next()
}

const requireRole = (roles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                error: 'Forbidden',
                message: `Require roles: ${roles.join('or')}`
            })
        }

        next()
    }
}

module.exports = {
    basicAuth, requireRole
}
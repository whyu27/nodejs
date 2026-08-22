const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    return passwordRegex.test(password)
}

const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
}

const validateRequired = (fields, data) => {
  const missing = []

  fields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      missing.push(field);
    }
  })

  return missing
}


const validateRegister = (req, res, next) => {
    const {username, email, password, confirmPassword} = req.body
    const errors = []

    const missing = validateRequired(['username', 'email', 'password', 'confirmPassword'], req.body)

    if(missing.length > 0){
        return res.status(400).json({
            success:  false,
            errors: `Missing required fields: ${missing.join(', ')}`
        })
    }

    if(!isValidEmail(email)){
        errors.push("Email harus memiliki format yang valid, contoh: user@example.com")
    }

    if(!isValidUsername(username)){
        errors.push("Username harus 3-20 karakter dan hanya boleh menggunakan huruf, angka, dan underscore (_)")
    }

    if(!isValidPassword(password)){
        errors.push("Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, angka, serta karakter khusus")
    }

    if(password !== confirmPassword){
        errors.push('Password dan confirm password tidak cocok')
    }

    if(errors.length > 0){
        return res.status(400).json({
            success: false,
            error: errors
        })
    }

    next()
}

const validateLogin = (req, res, next) => {
    const {username, password} = req.body
    const errors = []

    const missing = validateRequired(['username', 'password'], req.body)

    if(missing.length > 0){
        return res.status(400).json({
            success:  false,
            errors: `Missing required fields: ${missing.join(', ')}`
        })
    }

    if(!isValidUsername(username)){
        errors.push("Username yang anda masukkan salah")
    }

    if(password.length < 8){
        errors.push("Minimal password 8 karakter")
    }

    if(errors.length > 0){
        return res.status(400).json({
            success: false,
            error: errors
        })
    }

    next()
}

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidUsername,
    validateRegister,
    validateLogin
}
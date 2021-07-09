import jwt from 'jsonwebtoken'

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id },
                    process.env.JWT_SECRET,
                    { expiresIn: '14d' })
}

export default generateToken
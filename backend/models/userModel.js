import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({

    name: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true, },

    password: { type: String, required: true, },

    phoneNumber: { type: String, },

    profileImage: { type: String },

    profileType: { type: String, required: true },  // 2 options: user, company

    locality: { type: String, required: true },

    profileInfo: { type: String },

    marketPolicy: { type: String },

    favoriteProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]

}, { timestamps: true })

// Check if passwords match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Hashing middleware
// Hash password before saving to db
// Done when we call method .create(), .save()
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
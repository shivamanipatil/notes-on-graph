const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email!")
            }
        }
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("Passward contains password!")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    favouriteSongs: [{
        'track': {
            type: String
        }, 
        'artist': {
            type: String
        }
    }],
    favouriteArtists: [{
        'artist': {
            type: String
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//hash password before saving 
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken =  async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})    
    if(!user) {
        throw new Error('Unable to login')
    }
    const doMatch = await bcrypt.compare(password, user.password)
    if(!doMatch) {
        throw new Error('Uable to login')
    }
    return user     
}


const User = mongoose.model('User', userSchema)

module.exports = User
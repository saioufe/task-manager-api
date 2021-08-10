const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("please provide a valid email address")
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("don\t enter a password keyword")
            }
        }
    },

    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("please provide positive age number")
            }
        }

    },

    tokens: [{
        token: {
            type: String,
            required: true
        }

    }],

    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    console.log(this)
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRIT)
    user.tokens = user.tokens.concat({ token }) // this is used to add to arrey
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user2 = await user.findOne({ email })

    if (!user2) {
        throw new Error('unable to login!')
    }


    const isMatch = await bcrypt.compare(password, user2.password)

    if (!isMatch) {
        throw new Error('unable to login!')
    }

    return user2
}



// Hash password brfore saving the user
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})
const user = mongoose.model('user', userSchema)


module.exports = user
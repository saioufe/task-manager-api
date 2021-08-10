const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")
const multer = require("multer")
const sharp = require("sharp")
const { sendWelcomeEmail, sendCancelEmail } = require("../emails/account")
const router = new express.Router()


router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(404).send(e)
    }

})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('Error : ' + e)
    }



})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})
router.get('/users/me', auth, async (req, res) => {

    res.send({ "user": req.user, "token": req.token })

})


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))


    if (!isValidUpdate) {
        return res.status(404).send("Invalid Update!")
    }

    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status(201).send(req.user)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()

        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(404).send(e)
    }
})



const upload = multer({
    // dest: "images",
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            cb(new Error('please upload an image'))
        }

        cb(undefined, true)

    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(404).send(error.message)
})


router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(404).send("Error ! " + e)
    }
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set("context-type", "image/jpg")
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }

})


module.exports = router

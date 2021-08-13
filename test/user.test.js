const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "saif maher",
    email: "saif@yahoo.com",
    password: "saioufe100",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRIT)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})



test("should sign in user ", async () => {
    await request(app).post('/user').send({
        name: "saif maher",
        email: "saioufeyoutube@yahoo.com",
        password: "saioufe100"
    }).expect(201)
})


test("should login to old user ", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test("should not login to notExisting user ", async () => {
    await request(app).post("/users/login").send({
        email: "test@yahoo.com",
        password: userOne.password
    }).expect(400)
})


test("should get profile for user ", async () => {

    await request(app)
        .get("/users/me")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("should not get profile for unAuthorized user ", async () => {

    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})


test("shoud delete user", async () => {

    await request(app)
        .delete("/users/me")
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
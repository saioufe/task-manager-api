const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const app = require('./app')


const port = process.env.PORT



app.listen(port, () => {
    console.log("server is connected to port : " + port)
})


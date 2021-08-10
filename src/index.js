const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")


const app = express()

const port = process.env.PORT



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log("server is connected to port : " + port)
})



const main = async () => {
    // const task = await Task.findById("6111f5eaf70be604c68f2ca1")
    // await task.populate('owner').execPopulate() 
    // console.log(task.owner)

    // try {
    //     const user = await User.findById("6111f4997f98490464e82c38")
    //     await user.populate('tasks').execPopulate();
    //     console.log(user.tasks)
    // } catch (e) {
    //     console.log("error : " + e)
    // }

}

main()
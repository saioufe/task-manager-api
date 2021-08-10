require("../src/db/mongoose.js")
const Task = require("../src/models/Task.js")



const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ "completed": false })
    return count
}

deleteTaskAndCount("61093ec6c60f76c013f747c1").then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
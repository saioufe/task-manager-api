const mongoose = require("mongoose")
const validator = require("validator")



const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
} , {
    timestamps : true
})
const task = mongoose.model('task', taskSchema)

module.exports = task
// const firstTask = new task({
//     description: "finish the job      ",
// })
// firstTask.save().then(() => {

// }).catch((error) => {
//     console.log("Error !" + error)
// })
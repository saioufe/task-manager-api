require("../src/db/mongoose.js")
const User = require("../src/models/user.js")

// User.findByIdAndUpdate("6103fd711d851907da010d7f", { "age": 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ "age": 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })



const updateUserAge = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments(age)
    return count
}

updateUserAge("6103fd711d851907da010d7f", 10).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})







// const me = new user({
//     name: "hussain",
//     email: "hussain@gmail.com",
//     password: "saioufe100",
//     age: 24,
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error ! " + error)
// })
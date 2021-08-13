const calculateTop = (total, tipPercentage = 0.2) => {
    return total + (total * tipPercentage)

}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000)
    })

}





module.exports = {
    calculateTop,
    add
}

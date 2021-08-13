
const { calculateTop , add } = require('../src/math')


test('should calculate tip with total ', () => {
    const total = calculateTop(10, 0.2)

    expect(total).toBe(12)

    // if (total !== 12) {
    //     throw new Error('total count with tip is not 12 , Got : ' + total)
    // }
})


test('should calculate tip with total and default percentage', () => {
    const total = calculateTop(10)

    expect(total).toBe(12)

    // if (total !== 12) {
    //     throw new Error('total count with tip is not 12 , Got : ' + total)
    // }
})

// test('async test method', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)
// })


test('should add two numbers ', async () => {
    const sum = await add(1,4)
    expect(sum).toBe(5)
})
import emailValidationTest from './validation.js'

test('Check if email is valid', () => {
    expect(emailValidationTest("test123@gmail.com")).toBe(true)
})
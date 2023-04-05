const jwt = require('jsonwebtoken')

console.log("Test")
let accessDate = new Date();
accessDate.setDate(accessDate.getDate() + 10)
let accessTimestamp = Math.floor(accessDate.getTime() / 1000)
let refreshDate = new Date();
refreshDate.setDate(refreshDate.getDate() + 20)
let refreshTimestamp = Math.floor(refreshDate.getTime() / 1000)
let data = {
        name : 'shakeel',
        email: 'shkhaider2015@gmail.com'
}

let accessOption = {
    expiresIn: accessTimestamp
}
let refreshOption = {
    expiresIn: refreshTimestamp
}

let secret = "It is my secret"
let secret1 = 'Its is another secret'

const accessToken = jwt.sign(data, secret, accessOption);
const refreshToken = jwt.sign(data, secret, refreshOption);

// Verify the access JWT
let decodedAccessToken = null;
try {
    decodedAccessToken = jwt.verify(refreshToken, secret)
} catch (error) {
    console.log("Token Error ", error)
}

console.log('Access Token:', accessToken);
console.log('Refresh Token:', refreshToken);
console.log('Decoded Access Token:', decodedAccessToken);
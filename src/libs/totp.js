const speakeasy = require("speakeasy")
const QRCode = require("qrcode")
const { createHmac } = require("node:crypto")
const env = process.env

const totp = {
    makeKey: () => {
        return speakeasy.generateSecret({ length: 64 }).base32
    },
    makeQR: async (app, key) => {
        return await QRCode.toDataURL(`otpauth://totp/${app}?secret=${key}`)
    },
    verifyOTP: (key, otp) => {
        return speakeasy.totp.verify({
            secret: key,
            encoding: "base32",
            token: otp
        })
    },
    viewTOTP: (secret) =>{
        return speakeasy.totp({ secret, encoding: 'base32' });
    },
    fixDate: (fecha) => {
        return fecha < 10 ? '0' + fecha : fechavcode
    },
    getDate: () => {
        const data = new Date()
        const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
        const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
        const year = data.getFullYear()
        const hours = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
        const minutes = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
        const seconds = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}` 
    },
    encodePasswd: (text) => {
        return createHmac('sha512', env.TKEY).update(text).digest('hex')
    }
}

module.exports = totp
const Routes = require('express').Router()
const Users = require('../../controllers/')["Users"]
const secure = require('../../libs/secure')

Routes.get('/count', async (req, res) => {
    res.json({ count: await Users.count() })
})

Routes.post('/add', async (req, res) => {
    res.json(await Users.add(req.body))
})

Routes.get('/qr/:id?', secure.midsec, async (req, res) => {
    res.json({ qr: await Users.qrcode(req.params) })
})

Routes.post('/verify', secure.midsec, async (req, res) => {
    res.json({ verify: await Users.validarotp(req.body) })
})

Routes.post('/verifyemail', async (req, res) => {
    res.json({ verify: await Users.validarEmail(req.body) })
})

Routes.post('/verifyemailpasswd', async (req, res) => {
    res.json({ verify: await Users.validarEmailPasswd(req.body) })
})

Routes.post('/addconfig', async (req,res) => {
    res.json({ message: await Users.addConfig(req.body) })
})

Routes.post('/forgot', async (req, res) => {
    res.json({ message: await Users.forgotPassword(req.body)})
})

Routes.post('/vcode', secure.midsec, async (req, res) => {
    res.json({ message: await Users.verifyCode(req.body) })
})

Routes.post('/viewcode', async (req, res) => {
    res.json({ message: await Users.viewCode(req.body) })
})

module.exports = Routes
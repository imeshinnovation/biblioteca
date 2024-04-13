//genera un token con el valor proporcionado y la clave secreta
const jwt = require("jsonwebtoken")
require('dotenv').config().parsed
const env = process.env

const secure = {
    encode: (v1) => {
        return new Promise((resolve) => {
            jwt.sign({ v1 }, env.TKEY, { expiresIn: '60d' }, (err, token) => {
                if (err) throw err
                resolve(token)
            })
        })
    },
    //decodifica un token utilizando la clave secreta almacenada en la variable de entorno 
    decode: (v1) => {
        return new Promise((resolve, reject) => {
            jwt.verify(v1, env.TKEY, (err, authData) => {
                if (err) {
                    reject('Token Invalido')
                } else {
                    resolve(authData)
                }
            })
        })
    },
    // Nuestro Middleware de Seguridad con Token
    midsec: (req, res, next) => {
        const bheader = req.headers['authorization']
        if(typeof bheader !== 'undefined'){
            const bToken = bheader.split(" ")[1]
            req.token = bToken
            module.exports.decode(bToken).then((result) => {
                if(typeof result !== 'undefined'){
                    next()
                } else {
                    res.json({ msg: 'No Autorizado'})
                }
            }).catch((err) => {
                res.json({ msg: 'No Autorizado'})
            })
        } else {
            res.json({ msg: 'No Autorizado'})
        }
    }
}


module.exports = secure
//secure.encode({ name: 'Alex', lastname: 'Rubio', id: 'ghght4556uhdg', email: 'ceo@imesh.app', identificacion: '9586774', state: 1}).then((data) => console.log(data))

//secure.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2MSI6eyJuYW1lIjoiQWxleCIsImxhc3RuYW1lIjoiUnViaW8iLCJpZCI6ImdoZ2h0NDU1NnVoZGciLCJlbWFpbCI6ImNlb0BpbWVzaC5hcHAiLCJpZGVudGlmaWNhY2lvbiI6Ijk1ODY3NzQiLCJzdGF0ZSI6MX0sImlhdCI6MTcwNzM2MTc0NywiZXhwIjoxNzA3MzYxODA3fQ.cDY7P7KBULV40Q06aDE3pooEzknIbdNH3H7V-cQDKDg')
//.then((dato) => console.log(dato))
//.catch((err) => console.log(err))

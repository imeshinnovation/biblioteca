const express = require("express")
const app1 = express()
const morgan = require("morgan")
const env = require("dotenv").config().parsed

const BaseDatos = require('./libs/dbs')
BaseDatos.connect()

app1.use(morgan("dev"))
app1.use(express.json())
app1.use(express.urlencoded({ extended: true }))

app1.use(require("./views"))

app1.listen(env.PORT, env.IP, ()=>{
    console.log('Servidor Escuchando por el Puerto:', env.PORT);
})
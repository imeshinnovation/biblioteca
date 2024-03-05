const mongoose = require('mongoose')

const env = process.env

const MONGO_URI = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=admin`

const BaseDatos = {
    connect: () => {
        try {
            mongoose.connect(MONGO_URI).then(() => console.log('Conectado a la Base de Datos'))
        } catch (error) {
            console.log('Error en la Conexión:', error )
        }
    },
    disconnect: () => {
        mongoose.disconnect().then(() => console.log('Base de Datos Desconectada'))
    }
}

module.exports = BaseDatos
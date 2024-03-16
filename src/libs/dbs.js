const mongoose = require('mongoose')
//variables de entorno
const env = process.env
//URI de conexion a la base de datos
const MONGO_URI = `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWD}@${env.MONGO_HOST}/${env.MONGO_DB}?retryWrites=true&w=majority&appName=Biblioteca1000`
//este objeto contiene metodos para conectar y desconetar la base de datos mongoDB
const BaseDatos = { //conectar a la base de datos MongoDButilizando la URI 
    connect: () => {
        try {
            mongoose.connect(MONGO_URI).then(() => console.log('Conectado a la Base de Datos'))
        } catch (error) {
            console.log('Error en la Conexión:', error )
        }
    },
    //desconectar la conexion a la base de datos mongoDB
    disconnect: () => {
        mongoose.disconnect().then(() => console.log('Base de Datos Desconectada'))
    }
}

module.exports = BaseDatos
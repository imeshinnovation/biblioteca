const Confis = require('../../models')["config"] //Importa el modelo config
const ConfigX = {
    add: async (body) => {
        body.email = btoa(btoa(body.email)) //Codificamos el email
        body.password = btoa(btoa(body.password)) //Codificamos la contraseña
        const Conf = await Confis.create(body) // creamos una nueva configuracion en la base de datos
        return Conf
    },
    read: async () => {
        return await Confis.find({}).lean() //aqui obtenemos todas las configuraciones de la base de datos
    }
}

module.exports = ConfigX //exportamos el controlador ConfigX
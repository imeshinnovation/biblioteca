const Users = require('../../models')["users"] //Importamos el modelo Users
const Codes = require('../../models')["codes"] //Importamod el modelo Codes
const ConfigX = require('./config') //Importamos el controlador ConfigX
const totp = require('../../libs/totp') //Importamod el Módulo TOTP
const helpers = require('../../libs/helpers') //Importamos el Móduloa Helpers 
const secure = require('../../libs/secure')

const User = {
    upd: async (body) => {
        return await Users.updateOne({ _id: body.id }, { $set: body })
    },
    count: () => {
        return Users.find({}).count() // con esta funcion contamos todos los usuarios de la base de datos 
    },
    add: async (body) => {
        try {
            body.totp = totp.makeKey() //nos ayuda a generar la clave TOTP para los usuarios
            body.password = totp.encodePasswd(body.password) //Codifica la contraseña
            body.date_record = totp.getDate() //Obtenemos la fecha de registro 
            //const datosConfig = await ConfigX.read() //lee la configuracion de del correo electronico
            //console.log(datosConfig); //
            //await helpers.EnviarCorreo(atob(atob(datosConfig[0].email)), atob(atob(datosConfig[0].password)), body.email, 'Cuenta Creada', '', `<h1>Bienvenido ${body.name}</h1><hr>Ya eres parte de nuestro equipo de trabajo.`) //envia correo de confirmacion 
            return Users.create(body) //nos permite crear un nuevo usuario en la base de datos
        } catch (err) {
            return err.Message //nos ayuda con los errores
        }
    },
    //Nos ayuda a generar un codigo QR para la autenticacion en dos factores 
    qrcode: async (body) => {
        if (body.id) {
            const userx = await Users.findOne({ _id: body.id }) //Busca al usuario por su id en la base de datos
            return await totp.makeQR('SpeedMe', userx.totp) //nos genera un codigo QR utilizando el TOTP
        } else {
            return {} // devuelve el valor vacio si no hay id de usuario
        }
    },
    //aqui podemos validar con el codigo con un solo uso
    validarotp: async (body) => {
        if (body.id && body.otp) {
            const userx = await Users.findOne({ _id: body.id })//Busncamos al usuario por id en la base de datos
            const estado = totp.verifyOTP(userx.totp, body.otp)//validamos si el codigo top es valido para la clave totp del ususario 
            if(estado === true){
                return secure.encode({ email: userx.email, id: userx._id, a2f: userx.a2f })
            } 
        } else {
            return {}//devuelve false si no se proporciona el cosigo del id del usuario 
        }
    },
    //validamos si el correo electronico ya esta registrado en la base de datos 
    validarEmail: async (body) => {
        if (body.email) {
            return await Users.findOne({ email: body.email }).count() > 0 ? true : false //buscamos si el correo electronico ya esta resgistrado en la base de datos
        } else {
            return false //devuelve false si no hay correo proporcioando el correo 
        }
    },
    //aqui validaremos el usuario y contraseña del usuario
    validarEmailPasswd: async (body) => {
        if (body.email && body.password) {
            try {
                const userx = await Users.findOne({ email: body.email })//buscamos al usuario  por correo electronico en la base de datos
                const prepasswd = totp.encodePasswd(body.password)//se codifica la contraseña porprorcionada para compararla con la q se encuentra almacenada
                if (userx.password === prepasswd) { // se valida que las contraseñas coinciden
                    return { verify: true, id: userx._id, a2f: userx.a2f } // credenciales validas
                } else {
                    return false //contraseña
                }
            } catch {
                return false //manejamos errores de busqueda 
            }
        } else {
            return false //no se proporciono correo ni contraseña
        }
    },
    //aqui vamos a agregar una nueva configuracion al sistema
    addConfig: async (body) => {
        body.date_record = totp.getDate()// obtener la fecha de configuracion
        console.log(body); 
        return await ConfigX.add(body) //agregamos la confiuracion utilizando elcontrolador configX
    },
    //aqui se inicia el proceso para recuperar la contraseña del usuario 
    forgotPassword: async (body) => {
        const correo = await Users.findOne({ email: body.email }).count()//verifica si el correo existe en la base de datos
        const datos = await Users.findOne({ email: body.email }) //se obtiene los datos del usuario por el correo electronico
        const datosConfig = await ConfigX.read() //lee la confiuracion del correo electonico
        if (correo === 1) {
            const code = totp.viewTOTP(datos.totp) //genera un codigo para verificacion de la recuperacion de la contraseña
            await Codes.create({ email: body.email, code, date_record: totp.getDate() }) //crea un registro del codigo de verificacion 
            await helpers.EnviarCorreo(atob(atob(datosConfig[0].email)), atob(atob(datosConfig[0].password)), body.email, 'Código de Verificación', '', helpers.htmlTemplateSendCode(code)) //envia correo con el codigo de verificacion 
            //helpers.schedule(null, 1, null, null, null, null, code, Codes)
            return true // proceso de recuperacion de clave exitoso
        } else {
            return false // correo no registrado en la base de datos
        }
    },
    //verifica y actualiza la contraseña del usuario utilizando el codigo de verificacion 
    verifyCode: async (body) => {
        const codeg = await Codes.findOne({ code: body.code })//busca el codigo de verificacion en la base de datos 
        if (!codeg) {
            return false //el codigo no esta almacenado en la base de datos
        } else {
            // Validar que el codigo este almacenado y corresponda con un correo de usuario
            const datos = await Users.findOne({ email: body.email })
            if (totp.verifyOTP(datos.totp, body.code) === true) {// Actualizar la Contraseña del Usuario Propietario del Correo
                await Users.updateOne({ email: codeg.email }, { password: totp.encodePasswd(body.password) }) // Eliminar ese Código de la Lista Almacenada
                await Codes.deleteOne({ code: body.code })
                return true //contraseña actualizada correctamente
            } else {
                await Codes.deleteOne({ code: body.code })
                return false //codigo de verificacion invalido
            }
        }

    },
    //obtener el codigo TOTP de un usuario
    viewCode: async (body) => {
        const datos = await Users.findOne({ _id: body.id })//buscar el usuario por su id en la base de datos
        console.log(datos.totp)
        return totp.viewTOTP(datos.totp) //obyener y devolver el codigo TOTP del usuario  
    }
}



module.exports = User

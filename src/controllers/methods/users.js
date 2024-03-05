const Users = require('../../models')["users"]
const Codes = require('../../models')["codes"]
const ConfigX = require('./config')
const totp = require('../../libs/totp')
const helpers = require('../../libs/helpers')

const User = {
    count: () => {
        return Users.find({}).count()
    },
    add: async (body) => {
        try {
            body.totp = totp.makeKey()
            body.password = totp.encodePasswd(body.password)
            body.date_record = totp.getDate()
            const datosConfig = await ConfigX.read()
            console.log(datosConfig);
            await helpers.EnviarCorreo(atob(atob(datosConfig[0].email)), atob(atob(datosConfig[0].password)), body.email, 'Cuenta Creada', '', `<h1>Bienvenido ${body.name}</h1><hr>Ya eres parte de nuestro equipo de trabajo.`)
            return Users.create(body)
        } catch (err) {
            return err.Message
        }
    },
    qrcode: async (body) => {
        if (body.id) {
            const userx = await Users.findOne({ _id: body.id })
            return await totp.makeQR('SpeedMe', userx.totp)
        } else {
            return {}
        }
    },
    validarotp: async (body) => {
        if (body.id && body.otp) {
            const userx = await Users.findOne({ _id: body.id })
            return totp.verifyOTP(userx.totp, body.otp)
        } else {
            return {}
        }
    },
    validarEmail: async (body) => {
        if (body.email) {
            return await Users.findOne({ email: body.email }).count() > 0 ? true : false
        } else {
            return false
        }
    },
    validarEmailPasswd: async (body) => {
        if (body.email && body.password) {
            try {
                const userx = await Users.findOne({ email: body.email })
                const prepasswd = totp.encodePasswd(body.password)
                if (userx.password === prepasswd) {
                    return true
                } else {
                    return false
                }
            } catch {
                return false
            }
        } else {
            return false
        }
    },
    addConfig: async (body) => {
        body.date_record = totp.getDate()
        console.log(body);
        return await ConfigX.add(body)
    },
    forgotPassword: async (body) => {
        const correo = await Users.findOne({ email: body.email }).count()
        const datos = await Users.findOne({ email: body.email })
        const datosConfig = await ConfigX.read()
        if (correo === 1) {
            const code = totp.viewTOTP(datos.totp)
            await Codes.create({ email: body.email, code, date_record: totp.getDate() })
            await helpers.EnviarCorreo(atob(atob(datosConfig[0].email)), atob(atob(datosConfig[0].password)), body.email, 'Código de Verificación', '', helpers.htmlTemplateSendCode(code))
            //helpers.schedule(null, 1, null, null, null, null, code, Codes)
            return true
        } else {
            return false
        }
    },
    verifyCode: async (body) => {
        const codeg = await Codes.findOne({ code: body.code })
        if (!codeg) {
            return false
        } else {
            // Validar que el codigo este almacenado y corresponda con un correo de usuario
            // Actualizar la Contraseña del Usuario Propietario del Correo
            // Eliminar ese Código de la Lista Almacenada
            const datos = await Users.findOne({ email: body.email })
            if (totp.verifyOTP(datos.totp, body.code) === true) {
                await Users.updateOne({ email: codeg.email }, { password: totp.encodePasswd(body.password) })
                await Codes.deleteOne({ code: body.code })
                return true
            } else {
                await Codes.deleteOne({ code: body.code })
                return false
            }
        }

    },
    viewCode: async (body) => {
        const datos = await Users.findOne({ _id: body.id })
        console.log(datos.totp)
        return totp.viewTOTP(datos.totp)
    }
}



module.exports = User
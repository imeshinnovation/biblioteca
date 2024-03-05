const nodemailer = require("nodemailer")
const cron = require('node-cron')

const helpers = {
    EnviarCorreo: async (from, passwd, to, subject, text, html) => {
        const transporte = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: from,
                pass: passwd,
            },
        })
        const formatoCorreo = await transporte.sendMail({
            from,
            to,
            subject,
            text,
            html
        })
        return formatoCorreo.messageId ? true : false
    },
    htmlTemplateSendCode: (code) => {
        return `
            <h1 style="color: #0000FF">Código de Validación</h1>
            <h1 style="font-weight: bold; color: #00FF00">${code}</h1>
            <hr>
        `
    },
    schedule: (secus, minus, hours, days, months, weeks, code, Codes) => {
        secus === null ? secus = '*' : secus
        minus === null ? minus = '*' : minus
        hours === null ? hours = '*' : hours
        days === null ? days = '*' : days
        months === null ? months = '*' : months
        weeks === null ? weeks = '*' : weeks
        cron.schedule(`${secus} ${minus} ${hours} ${days} ${months} ${weeks}`, async () => {
            await Codes.deleteOne({ code })
        }, {
            scheduled: true,
            timezone: "America/Bogota"
        })
        console.log(cron)
    }
}
/*
const enviar = async () =>{
    console.log( await helpers.EnviarCorreo('pruebacamilo77@hotmail.com', 'mvcCamilo77', 'imesh.innovation@gmail.com', 'Prueba en Clase 2', 'Esta es una Prueba de Envio de Correo Electrónico.', helpers.htmlTemplateSendCode(456890)))
}

enviar()
*/

module.exports = helpers
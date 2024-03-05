const Confis = require('../../models')["config"]
const ConfigX = {
    add: async (body) => {
        body.email = btoa(btoa(body.email))
        body.password = btoa(btoa(body.password))
        const Conf = await Confis.create(body)
        return Conf
    },
    read: async () => {
        return await Confis.find({}).lean()
    }
}

module.exports = ConfigX
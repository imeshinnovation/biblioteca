const loanBooks = require('../../models')["loanBook"]
const loanBook = {
    countAll: async () => {
        return await loanBooks.find().count()
    },
    countMonth: async (body) => { //"04-03-2024" - "03"
        return await loanBooks.find({ loan_date: {$regex: "-"+body.month+"-"}  }).count()
    }
}

module.exports = loanBook
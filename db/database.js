let mongoose = require('mongoose')

const server = process.env.MONGODB_URI | '127.0.0.1:27017'
const database = 'accounts'
class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err) => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database()

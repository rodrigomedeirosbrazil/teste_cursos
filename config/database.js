const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://teste:123@testecursos-kabbj.mongodb.net/test?retryWrites=true';
const database = "teste_cursos"
mongoose.connect(mongoDB, {dbName: database,  useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;

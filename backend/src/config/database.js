const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todo';
/*url para se conectar com o MongoDB
27017 é a porta que o MongoDB usa
todo é nome do banco de dados que será usado no projeto*/

mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose;  //devolve a variável "mongoose" quando o arquivo for chamado em outro lugar
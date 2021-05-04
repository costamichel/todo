const mongoose = require('../config/database');     //chama o retorno do database.js, que é o "mongoose" já conectado
const Schema = mongoose.Schema;

//Representação do banco de dados
const TaskSchema = new Schema({
    macaddress: {type: String, required: true},  //required indica se é obrigatório
    type: {type: Number, required: true},    //tipo da tarefa cadastrada
    title: {type: String, required: true},      //título da tarefa
    description: {type: String, required: true},
    when: {type: Date, required: true},     //o Mongo armazena data e hora juntos
    done: {type: Boolean, default: false},      //indica se tarefa já foi concluída
    created: {type: Date, default: Date.now()} //armazena data e hora de criação de uma tarefa
});

module.exports = mongoose.model('Task', TaskSchema);    //para quando for chamado de outros lugares
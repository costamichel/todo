const TaskModel = require('../model/TaskModel');    //traz o modelo do BD - arquivo TaskModel.js

const current = new Date();     //constante que armazena data e hora atuais

const { startOfDay, endOfDay, 
    startOfWeek, endOfWeek, 
    startOfMonth, endOfMonth,
    startOfYear, endOfYear } = require('date-fns');    //importa o date-fns

class TaskController{

    /*async indica que é uma função assíncrona - juntamente com o await garante que o resto do 
    programa não seja executado antes de voltar do BD*/
    async create(req, res){
        const task = new TaskModel(req.body);
        /*then se tudo deu certo e catch se houve algum erro*/
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id' : req.params.id}, req.body, {new: true})      //a propriedade new:true devolve os dados atualizados como resposta
            .then(response=>{
                return res.status(200).json(response);
            })
            .catch(error=>{
                return res.status(500).json(error);
            })
    }

    async all(req, res){
        await TaskModel.find({ macaddress: { '$in' : req.params.macaddress}})
            .sort('when')       //já traz organizado por data e hora
            .then(response =>{
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response =>{
            if (response)       //verifica se encontrou tarefa
                return res.status(200).json(response);
            else
                return res.status(404).json({ error : 'tarefa não encontrada' });
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async delete(req, res){
        await TaskModel.deleteOne({ '_id' : req.params.id})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            { '_id' : req.params.id },  //procurar
            { 'done' : req.params.done },   //atualizar
            { new : true }      //retornar valor atualizado
        )
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async late(req, res){
        await TaskModel.find(
            { 'when' : {'$lt' : current},      //lt -> less than
            'macaddress' : { '$in' : req.params.macaddress},
            'done': {'$ne': true}}
        )
        .sort('then')
        .then( response => {
            return res.status(200).json(response);
        })
        .catch( error => {
            return res.status(500).json(error);
        });
    }

    async today(req, res){
        await TaskModel.find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : { '$gte' : startOfDay(current), '$lte' : endOfDay(current)}     //gte -> maior ou igal
        })
        .sort('when')
        .then( response =>{
            return res.status(200).json(response);
        })
        .catch( error =>{
            return res.status(500).json(error);
        });
    }

    async week(req, res){
        await TaskModel.find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : { '$gte' : startOfWeek(current), '$lte' : endOfWeek(current)}
        })
        .sort('when')
        .then( response =>{
            return res.status(200).json(response);
        })
        .catch( error =>{
            return res.status(500).json(error);
        });
    }

    async month(req, res){
        await TaskModel.find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : { '$gte' : startOfMonth(current), '$lte' : endOfMonth(current)}
        })
        .sort('when')
        .then( response =>{
            return res.status(200).json(response);
        })
        .catch( error =>{
            return res.status(500).json(error);
        });
    }

    async year(req, res){
        await TaskModel.find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : { '$gte' : startOfYear(current), '$lte' : endOfYear(current)}
        })
        .sort('when')
        .then( response =>{
            return res.status(200).json(response);
        })
        .catch( error =>{
            return res.status(500).json(error);
        });
    }

}

module.exports = new TaskController();
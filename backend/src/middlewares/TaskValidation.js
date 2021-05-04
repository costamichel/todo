const TaskModel = require('../model/TaskModel');

const { isPast } = require('date-fns');     //importa a função do date-fns pra verificar se uma data está no passado

const TaskValidation = async (req, res, next) => {      //next indica que validou correto

    const { macaddress, type, title, description, when} = req.body;

    if(!macaddress){
        return res.status(400).json({error: "MacAddress é obrigatório"});
    }
    else if(!type){
        return res.status(400).json({error: "type é obrigatório"});
    }
    else if(!title){
        return res.status(400).json({error: "title é obrigatório"});
    }
    else if(!description){
        return res.status(400).json({error: "description é obrigatório"});
    }
    else if(!when){
        return res.status(400).json({error: "data e hora são obrigatório"});
    }
    else {
        let exists;

        if(req.params.id){      //se for atualização de tarefa
            exists = await TaskModel.findOne({
                '_id' : { '$ne' : req.params.id},        //ne -> not equals - deve verificar o horário e data apenas em relação a outras tarefas
                'when' : {'$eq' : new Date(when)},
                'macaddress' : {'$in' : macaddress}
            });
        } else {        //se for criação de nova tarefa
            if(isPast(new Date(when))){        //when chega no formato de texto e deve ser transformado em formato Date
                //não deixa usuário cadastrar tarefa em data ou hora do passado
                return res.status(400).json({erro: "escolha uma data e hora futura"});
            }
            exists = await TaskModel.findOne({
                'when' : {'$eq' : new Date(when)},
                'macaddress' : {'$in' : macaddress}
            });
        }
        //impede usuário de cadastrar uma tarefa no mesmo dia e horário
        if(exists){
            return res.status(400).json({error: 'já existe uma tarefa neste dia e horário'});
        }

        next();
    }
}

module.exports = TaskValidation;
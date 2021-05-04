const { roundToNearestMinutes } = require('date-fns');
const express = require('express');
const router = express.Router();    //identifica as rotas que estão chegando

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskController.create);    //injeta o arquivo TaskController dentro da API
router.put('/:id', TaskValidation ,TaskController.update);      //":id" indica que o parâmetro recebido se chamará id
router.get('/filter/all/:macaddress', TaskController.all);    //rota para exibir todas as tarefas
router.get('/:id', TaskController.show);    //exibir uma única tarefa
router.delete('/:id', TaskController.delete);   //deleta uma tarefa
router.put('/:id/:done', TaskController.done);  //atualiza status de uma tarefa
router.get('/filter/late/:macaddress', TaskController.late);    //mostra tarefas atrasadas
router.get('/filter/today/:macaddress', TaskController.today);    //mostra tarefas do dia
router.get('/filter/week/:macaddress',  TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress', TaskController.year);

module.exports = router;
const express = require('express'); //importa o módulo express
const server = express();
const cors = require('cors');

server.use(cors())
server.use(express.json());     //indica que o servidor vai receber requisições e enviar respostas no formato JSON

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

server.listen(3333, () =>{
    console.log('API ONLINE');
});
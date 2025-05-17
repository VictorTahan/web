const express = require('express')
const app = express()

// Permitir arquivos estáticos da pasta 'front'
app.use(express.static(__dirname + '/front'))

app.get('/',function(req,res){
    res.sendFile(__dirname + '/front/index.html')
})

app.listen(8081, function(){
    console.log('Servidor rodando na url http://localhost:8081')
})
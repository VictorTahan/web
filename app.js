const express = require('express')
const app = express()
const path = require('path')
const gerarTabela = require('./ranking')
const {gerarNumeroRodada,renderRodada} = require('./rodadas')
const handlebars = require('express-handlebars')
const axios = require('axios')
require('dotenv').config()

//configurações
    //Template Engine
    app.engine('handlebars',handlebars.engine())
    app.set('view engine','handlebars')
    app.set('views',path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname,'public')))


app.get('/',async(req,res) => {
    try{
        const headers = { 'X-Auth-Token': process.env.FOOTBALL_API_TOKEN}
        const rodadasBr = await axios.get('https://api.football-data.org/v4/competitions/BSA/matches', headers)
        const tabelaBr = await axios.get('https://api.football-data.org/v4/competitions/BSA/standings',headers)
        const tabela = await gerarTabela(tabelaBr.data)
        const rodada = await gerarNumeroRodada(rodadasBr.data)
        const rodadas = renderRodada(rodada)
        res.render('index', {
        tabelaHTML: tabela,
        rodadasHTML: rodadas,
        numeroRodadaInicial: rodada
        })
    }
    catch(err){
        res.status(500).send('Erro ao carregar dados: ' + err.message)
    }

})

app.get('/rodada/:numero', async (req, res) => {
  const numero = parseInt(req.params.numero);
  try {
    const htmlRodada = renderRodada(numero);
    res.send({ html: htmlRodada });
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao carregar rodada: ' + err.message });
  }
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
const express = require('express')
const {requerirJson,criarArquivoJson} = require('./requisicao')
const app = express()
const fs = require('fs/promises')
const path = require('path')
const gerarTabela = require('./ranking')
const {gerarRodadas,renderRodada} = require('./rodadas')
const handlebars = require('express-handlebars')

//configurações
    //Template Engine
    app.engine('handlebars',handlebars.engine())
    app.set('view engine','handlebars')
    app.set('views',path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname,'public')))


app.get('/',async(req,res) => {
    try{
        const classBr = requerirJson('https://api.football-data.org/v4/competitions/BSA/standings')
        const rodadasBr = requerirJson('https://api.football-data.org/v4/competitions/BSA/matches')
        criarArquivoJson(classBr,'classificacaoBr.json')
        criarArquivoJson(rodadasBr,'rodadasBr.json')
        const tabela = await gerarTabela()
        const rodada = await gerarRodadas()
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
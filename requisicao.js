const axios = require('axios')
const fs = require('fs')

function requerirJson(api){
  const config = {
      method: 'get',
      url: api,
      headers: {
        'X-Auth-Token': 'b12b659d755e43caacc9830940d8fa13'
      }
  }
  return config
}

async function criarArquivoJson(config,nome_arquivo){
  try{
    const response = await axios(config)
    const jsonData = JSON.stringify(response.data, null, 2); //formata bonitinho
    await fs.writeFile(nome_arquivo, jsonData)
    console.log(`Arquivo ${nome_arquivo} salvo com sucesso!`)
    }catch(error){
        console.log('Erro ao salvar arquivo: ', error)
    }
}


module.exports = {requerirJson,criarArquivoJson}
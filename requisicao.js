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

function criarArquivoJson(config,nome_arquivo){
  axios(config)
    .then(function (response) {
      const jsonData = JSON.stringify(response.data, null, 2); //formata bonitinho

      fs.writeFile(nome_arquivo, jsonData, (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo: ', err);
        } else {
          console.log('Arquivo salvo com sucesso!');
        }
      });
    }) 
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {requerirJson,criarArquivoJson}
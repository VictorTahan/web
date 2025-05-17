const axios = require('axios')
const fs = require('fs')

const config = {
    method: 'get',
    url: 'https://api.football-data.org/v4/competitions/BSA/standings',
    headers: {
      'X-Auth-Token': 'b12b659d755e43caacc9830940d8fa13'
    }
}

axios(config)
  .then(function (response) {
    const jsonData = JSON.stringify(response.data, null, 2); //formata bonitinho

    fs.writeFile('resultado.json', jsonData, (err) => {
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

let rodadas = []
let rodadas_naoIniciadas = []
let numero_rodada = 0

async function gerarNumeroRodada(data) {
  rodadas = Array.from({ length: 38 }, () => [])
  rodadas_naoIniciadas.length = 0
  const todasRodadas = data.matches

  todasRodadas.forEach(rdd => {
    const partida = {
      numero: rdd.matchday,
      data: `${rdd.utcDate.slice(8,10)}/${rdd.utcDate.slice(5,7)}/${rdd.utcDate.slice(0,4)}`,
      hora: rdd.utcDate.slice(11,16),
      sta: rdd.status,
      mandante: {
        abreviacao: rdd.homeTeam.tla,
        imagem: rdd.homeTeam.crest,
        gols1t: rdd.score.halfTime.home,
        golsfinal: rdd.score.fullTime.home
      },
      visitante: {
        abreviacao: rdd.awayTeam.tla,
        imagem: rdd.awayTeam.crest,
        gols1t: rdd.score.halfTime.away,
        golsfinal: rdd.score.fullTime.away
      }
    };
    rodadas[rdd.matchday - 1].push(partida);
  });

  rodadas.forEach((rodada) => {
    const finalizados = rodada.filter(j => j.sta === 'FINISHED').length;
    if (finalizados < 9) {
      rodadas_naoIniciadas.push(rodada);
    }
  });

  numero_rodada = rodadas_naoIniciadas[0]?.[0]?.numero || 1;
  return numero_rodada;
}

function renderRodada(n) {
  const substituicoes = {
    REC: 'SCR',
    FBP: 'GRE',
    SCI: 'INT',
    PAU: 'SPA',
    FEC: 'FOR', 
    CSC: 'CEA'
  };

  const rodada = rodadas[n - 1] || [];
  let cardsHtml = '';

  rodada.forEach(jogo => {
    jogo.mandante.abreviacao = substituicoes[jogo.mandante.abreviacao] || jogo.mandante.abreviacao;
    jogo.visitante.abreviacao = substituicoes[jogo.visitante.abreviacao] || jogo.visitante.abreviacao;

    const golsMand = jogo.mandante.golsfinal ?? ''
    const golsVis = jogo.visitante.golsfinal ?? ''

    cardsHtml += `
      <div class="rodada">
        <div id="img_man"><img src="${jogo.mandante.imagem}" style="width: 45px;height: 45px;"></div>
        <div id="data_local">${jogo.data} ${jogo.hora}</div>
        <div id="mandante">${jogo.mandante.abreviacao}</div>
        <div id="placar_man">${golsMand}</div>
        <div id="versus" style="color:white">X</div>
        <div id="placar_vis">${golsVis}</div>
        <div id="visitante">${jogo.visitante.abreviacao}</div>
        <div id="img_vis"><img src="${jogo.visitante.imagem}" style="width: 45px;height: 45px;"></div>
        <div id="status_partida">${jogo.sta}</div>
      </div>
    `
  })

  return cardsHtml
}

module.exports = {
  gerarNumeroRodada,
  renderRodada
}
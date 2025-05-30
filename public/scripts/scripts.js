document.addEventListener('DOMContentLoaded', () => {
  const botaoAvancar = document.getElementById('avancar')
  const botaoVoltar = document.getElementById('voltar')
  const containerRodadas = document.getElementById('rodadas')
  const spanNumeroRodada = document.getElementById('numero-rodada')

  botaoAvancar.addEventListener('click', async () => {
    if (rodadaAtual < 38) {
      rodadaAtual++;
      await carregarRodada()
    }
  });

  botaoVoltar.addEventListener('click', async () => {
    if (rodadaAtual > 1) {
      rodadaAtual--
      await carregarRodada()
    }
  });

  async function carregarRodada() {
    try {
      const response = await fetch(`/rodada/${rodadaAtual}`)
      const data = await response.json()
      containerRodadas.innerHTML = ''
      containerRodadas.innerHTML = data.html
      spanNumeroRodada.textContent = rodadaAtual
    } catch (err) {
      console.error('Erro ao carregar rodada:', err)
    }
  }
})
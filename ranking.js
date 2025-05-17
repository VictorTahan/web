const fs = require('fs')
const path = require('path')

fs.readFile('resultado.json','utf8',(err,data)=>{
    if (err){
        console.error('Erro ao ler o arquivo: ',err)
        return
    }else{
        const objeto = JSON.parse(data)
        const classificacao = objeto.standings
        let cardsHtml = ''
        let bgcolor = ""
        classificacao.forEach(element => {
            element.table.forEach(time =>{
                let equipe = {
                    nome: time.team.shortName,
                    pos: time.position,
                    jogos: time.playedGames,
                    vitorias: time.won,
                    empates: time.draw,
                    derrotas: time.lost,
                    pontos: time.points,
                    golsPro: time.goalsFor,
                    golsSofridos: time.goalsAgainst,
                    saldoDeGols: time.goalDifference,
                    aproveitamento: ((time.points/114) * 100).toFixed(2),
                    imagem: time.team.crest
                }
                if(equipe.nome === 'Recife'){
                    equipe.nome = 'Sport Recife'
                }
                if(equipe.nome === 'Mineiro'){
                    equipe.nome = 'Atlético-MG'
                }
                if(equipe.pos >= 1 && equipe.pos <5){
                    bgcolor = "background-color: rgba(0, 3, 175, 0.61)"
                }else if(equipe.pos >=5 && equipe.pos <7){
                    bgcolor = "background-color: rgba(0, 241, 40, 0.61)"
                }else if(equipe.pos >=7 && equipe.pos < 13){
                    bgcolor = "background-color: rgba(179, 255, 1, 0.61)"
                }else if(equipe.pos >= 17 && equipe.pos <21){
                    bgcolor = "background-color: rgba(233, 0, 0, 0.61)"
                }else{
                    bgcolor = "background-color: rgba(0, 0, 0, 0.61)"
                }
                cardsHtml += `
                <tr style="${bgcolor}">
                    <td>${equipe.pos}º</td>
                    <td><div class="picture"><img src=${equipe.imagem}></td>
                    <td>${equipe.nome}</td>
                    <td>${equipe.pontos}</td>
                    <td>${equipe.jogos}</td>
                    <td>${equipe.vitorias}</td>
                    <td>${equipe.empates}</td>
                    <td>${equipe.derrotas}</td>
                    <td>${equipe.golsPro}</td>
                    <td>${equipe.golsSofridos}</td>
                    <td>${equipe.saldoDeGols}</td>
                    <td>${equipe.aproveitamento}</td>
                </tr>
                `
            })
        })
        const htmlPath = path.join(__dirname, 'front', 'index.html')
        fs.readFile(htmlPath,'utf8',(err,index)=> {
            if(err) return console.error('Erro ao ler o index.html: ', err)
            
            const htmlFinal = index.replace('<!--tabela-->', cardsHtml)
        fs.writeFile(htmlPath,htmlFinal, (err) => {
            if(err) return console.error('Erro ao salvar o arquivo HTML: ',err)
            console.log('Arquivo index.html salvo com sucesso!')
        })
        })
    }
})


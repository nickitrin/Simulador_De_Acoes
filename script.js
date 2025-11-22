import {acoes} from './acoes.js';

let acoesdisponiveisparacompra = document.getElementById("acoesdisponiveisparacompra")
let portfoliodeacoes= document.getElementById("portfoliodeacoes")

function CarregarAcoes() {

    for(let i=0; i<acoes.length; i++){
        let acaodisponivel = document.createElement("div")
        acaodisponivel.setAttribute('id', 'acao' + i ) 
        acaodisponivel.setAttribute('class', 'acaodisponivel')
        acoesdisponiveisparacompra.append(acaodisponivel)

        let acaocodigo = document.createElement("p")
        acaocodigo.textContent = acoes[i]["codigo"]
        acaocodigo.setAttribute('id', acoes[i]["codigo"]) 
        acaocodigo.setAttribute('class', 'acaocodigo')     
        acaocodigo.setAttribute('value', acoes[i]["codigo"])    

        let acaopreco = document.createElement("p")
        acaopreco.textContent = acoes[i]["preco"]
        acaopreco.setAttribute('class', 'acaopreco') 
        acaopreco.setAttribute('value', acoes[i]["preco"])

        let botaocompraracao = document.createElement('button')
        botaocompraracao.setAttribute('type', 'button' )
        botaocompraracao.textContent = 'comprar acao'
        botaocompraracao.addEventListener("click", function (){ ComprarAcao(acaocodigo.id)})      

        
        acaodisponivel.append(acaocodigo)
        acaodisponivel.append(acaopreco)
        acaodisponivel.append(botaocompraracao)
    }
}
CarregarAcoes()

let carteira=[]
function ComprarAcao(codigodaacao){
    
    let indice = carteira.findIndex(item => item.codigo === codigodaacao);
        if (indice === -1) {
            carteira.push({
                codigo: codigodaacao,
                quantidade: 1,
                preco: acoes[acoes.findIndex(item => item.codigo === codigodaacao)]["preco"]
            })
            indice = carteira.length - 1 
            CriarContainerAcaoComprada(indice)

        } else {
            carteira[indice].quantidade++;
        AtualizarQuantidadeAcao(indice)}
    console.log(carteira)
}

function CriarContainerAcaoComprada(indice){
    let acaodisponivel = document.createElement("div")
        acaodisponivel.setAttribute('id', 'acao' + carteira[indice].codigo ) 
        acaodisponivel.setAttribute('class', 'acaodisponivel')
        portfoliodeacoes.append(acaodisponivel)

        let acaocodigo = document.createElement("p")
        acaocodigo.textContent = carteira[indice].codigo
        acaocodigo.setAttribute('id', carteira[indice].codigo) 
        acaocodigo.setAttribute('class', 'acaocodigo')     
        acaocodigo.setAttribute('value', carteira[indice].codigo)    

        let acaopreco = document.createElement("p")
        acaopreco.textContent = carteira[indice].preco
        acaopreco.setAttribute('class', 'acaopreco') 
        acaopreco.setAttribute('value', carteira[indice].preco)

        let quantidadeacao = document.createElement('p')
        quantidadeacao.setAttribute('id', 'quantidade' + carteira[indice].codigo )
        quantidadeacao.textContent = carteira[indice].quantidade

        
        acaodisponivel.append(acaocodigo)
        acaodisponivel.append(acaopreco)
        acaodisponivel.append(quantidadeacao)

}

function AtualizarQuantidadeAcao(indice){
    let quantidadeacao = document.getElementById('quantidade'+ carteira[indice].codigo)
    quantidadeacao.textContent = carteira[indice].quantidade

}
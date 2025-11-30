import {acoes} from './acoes.js';

let acoesdisponiveisparacompra = document.getElementById("acoesdisponiveisparacompra")
let portfoliodeacoes= document.getElementById("portfoliodeacoes")
let saldodisponivel = document.getElementById("saldodisponivel")

saldodisponivel.value = 10000

 
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
        acaopreco.textContent = "R$ " + acoes[i]["preco"]
        acaopreco.setAttribute('class', 'acaopreco') 
        acaopreco.setAttribute('value', acoes[i]["preco"])

        let botaocompraracao = document.createElement('button')
        botaocompraracao.setAttribute('type', 'button' )
        botaocompraracao.textContent = 'Comprar Ação'
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
        if (acoes[acoes.findIndex(item => item.codigo === codigodaacao)]["preco"]<= saldodisponivel.value)
            if (indice === -1) {
                carteira.push({
                    codigo: codigodaacao,
                    quantidade: 1,
                    preco: acoes[acoes.findIndex(item => item.codigo === codigodaacao)]["preco"]
                })
                indice = carteira.length - 1 
                CriarContainerAcaoComprada(indice)
                AtualizarSaldo(carteira[indice].preco, "comprar")
                

            } else {
                carteira[indice].quantidade++;
                
            AtualizarSaldo(carteira[indice].preco, "comprar")
            AtualizarQuantidadeAcao(indice, "comprar")}
        else {
            alert("Saldo insuficiente!")
        }
    
    
     
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

        let botaovenderacao = document.createElement('button')
        botaovenderacao.setAttribute('type', 'button' )
        botaovenderacao.textContent = 'Vender Ação'
        botaovenderacao.addEventListener("click", function (){ VenderAcao(carteira[indice])})      

        
        acaodisponivel.append(acaocodigo)
        acaodisponivel.append(quantidadeacao)
        acaodisponivel.append(botaovenderacao)


}

function AtualizarQuantidadeAcao(indice, compraouvenda){
    if (compraouvenda === "comprar"){
        let quantidadeacao = document.getElementById('quantidade'+ carteira[indice].codigo)
        quantidadeacao.textContent = carteira[indice].quantidade
    }
    if (compraouvenda === "vender"){
        let quantidadeacao = document.getElementById('quantidade'+ carteira[indice].codigo)
        let quantidadeacaoatualizada = Number(quantidadeacao.textContent) 
        quantidadeacaoatualizada = quantidadeacaoatualizada - 1
        if (quantidadeacaoatualizada > 0){
            quantidadeacao.textContent = quantidadeacaoatualizada
        }
        else {
            DeletarContainerAcaoComprada(indice)
            carteira.splice(indice, 1)
        }
        
    }
}
function DeletarContainerAcaoComprada(indice){
    document.getElementById('acao' + carteira[indice].codigo).remove()
}

function MudarPrecos(){
    const elementosPreco = document.getElementsByClassName("acaopreco");

    for (let i = 0; i < acoes.length; i++) {

        let precoatual = Number(acoes[i]["preco"])
        let novopreco = Math.random() * Math.floor( precoatual * 1.1 - precoatual * 0.9 )  +  precoatual * 0.9 + 0.2
        elementosPreco[i].textContent = "R$ " + novopreco.toFixed(2);
        acoes[i]["preco"] = novopreco.toFixed(2)
        
    }
}

function AtualizarSaldo(valoracao, compraouvenda){
    if (compraouvenda === "comprar"){
        saldodisponivel.value = saldodisponivel.value - valoracao
        saldodisponivel.textContent = "R$ " + saldodisponivel.value.toFixed(2) 
    }
    
    if (compraouvenda === "vender"){
        saldodisponivel.value = saldodisponivel.value + Number(valoracao)
        saldodisponivel.textContent = "R$ " + saldodisponivel.value.toFixed(2)
    }

}

function VenderAcao(acaovendida){
    let codigodaacao = acaovendida.codigo
    let acaovendidapreco = acoes[acoes.findIndex(item => item.codigo === codigodaacao)]["preco"]
    AtualizarSaldo(acaovendidapreco, "vender")

    let acaovendidaindex = carteira.findIndex(item => item.codigo === codigodaacao)
    AtualizarQuantidadeAcao(acaovendidaindex, "vender")
}
setInterval(() => MudarPrecos(), 5000)
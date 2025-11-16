import {acoes} from './acoes.js';

let acoesdisponiveisparacompra = document.getElementById("acoesdisponiveisparacompra")
let portfoliodeacoes= document.getElementById("portfoliodeacoes")
function CarregarAcoes() {

    for(let i=0; i<acoes.length; i++){
        
        let acaocodigo = document.createElement("p")
        acaocodigo.textContent = acoes[i]["codigo"]
        let acaopreco = document.createElement("p")
        acaopreco.textContent = acoes[i]["preco"]
        let botaocompraracao = document.createElement("button")
        
        botaocompraracao.textContent = "comprar acao"
        botaocompraracao.setAttribute("id", "comprou " + acoes[i]["codigo"])
        acoesdisponiveisparacompra.append(acaocodigo)
        acoesdisponiveisparacompra.append(acaopreco)
        acoesdisponiveisparacompra.append(botaocompraracao)
    }
}
CarregarAcoes()

//document.getElementsByTagName("button").onclick = function ComprarAcao (event){
//    event.preventDefault()
//    console.log(button.id)
//}

acoesdisponiveisparacompra.addEventListener('click', function(e) {
    let acaoadquirida= document.createElement("p")
    acaoadquirida.textContent=(e.target.id);
    portfoliodeacoes.append(acaoadquirida)

});
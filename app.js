// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 a 10";
let listasNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.0}); 
}

function mensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 a 10");
    
}

mensagemInicial();


function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? "Tentativas": "Tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("h1", "Acertou !");
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");

    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é menor");
        }
        else{
            exibirTextoNaTela("p", "O número secreto é maior");
        }
        tentativas++; // tentativas = tentativas + 1
        limparCampo() 
    }
    
}

function gerarNumeroAleatorio(){

    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadesDeNumerosSorteados = listasNumerosSorteados.length;

    if (quantidadesDeNumerosSorteados == numeroLimite){
        listasNumerosSorteados = [];
    }
    if(listasNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listasNumerosSorteados.push(numeroEscolhido);
        console.log(listasNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    mensagemInicial();
    limparCampo();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

import { Geladeira } from './Geladeira.js';
class Simulador{
    constructor(){
        this.geladeira = new Geladeira();
        this.executando = false;
        this.init();
    }

    //metodo para iniciar a simulação
    init(){
        this.executando = true;
        this.geladeira.tempoSimulacao = 0;
        this.geladeira.temperaturaAmbiente = 25;
        this.geladeira.temperaturaFreezer = this.geladeira.temperaturaAmbiente;
        this.geladeira.temperaturaResistencia = this.geladeira.temperaturaAmbiente;
        this.geladeira.resistenciaQueimada = false;
        this.geladeira.temperaturaEvaporador = this.geladeira.temperaturaAmbiente;
        this.geladeira.temperaturaCompressor = this.geladeira.temperaturaAmbiente;
        this.geladeira.releTermicoAtutou = 0;
        this.geladeira.releTermicoAcionado = false;
        this.geladeira.tempReleTermico = 100.0;
        this.geladeira.tempoCompressorLigado = 0;
        this.status
        //inicia a simulação
    }

    //metodo para parar a simulação
    pararSimulacao(){
        this.executando = false;
        //para a simulação
    }

    //metodo para reiniciar a simulação
    reiniciarSimulacao(){
        this.init();
    }

    //metodo para executar a simulação
    // @param segundos: tempo em segundos para executar a simulação
    // @return: retorna o tempo em segundos que foi executado
    executaSimulacao(segundos){
        for (let i = 0; i < segundos; i++){
            this.geladeira.atualizar(1);
        }
        return this.geladeira.tempoSimulacao;
    }

   getStatus(){

   }


}
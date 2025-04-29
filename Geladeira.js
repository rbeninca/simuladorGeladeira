class Geladeira {
    constructor() {
        this.tempoSimulacao = 0.0;
        this.temperaturaAmbiente = 25.0;
        this.temperaturaFreezer = this.temperaturaAmbiente;
        this.temperaturaResistencia = this.temperaturaAmbiente;
        this.resistenciaQueimada = false;
        this.temperaturaEvaporador = this.temperaturaAmbiente;
        this.temperaturaCompressor = this.temperaturaAmbiente;
        this.releTermicoAtutou = 0;
        this.releTermicoAcionado = false;
        this.tempReleTermico = 100.0;
        this.tempoCompressorLigado = 0;

        this.compressorLigado = false;
        this.resistenciaLigada = false;
        this.portaFreezerAberta = false;
        this.portaGeladeiraAberta = false;

        this.ventoinhaCompressor = false;
        this.ventoinhaFreezer = false;
        this.luzFreezer = false;
        this.luzGeladeira = false;
    }

    atualizar(dt) {
        this.tempoSimulacao += dt;

        this.atualizarMotor(dt);
        this.atualizarFreezer(dt);
        this.atualizarResistencia(dt);
        this.atualizarEvaporador(dt);
        this.transferirCalorEvaporadorFreezer(dt);
    }

    atualizarMotor(dt) {
        const limite = this.compressorLigado
            ? (this.ventoinhaCompressor ? 80 + this.tempoCompressorLigado * 0.01 : 130 + this.tempoCompressorLigado * 0.2)
            : this.temperaturaAmbiente;
        const taxa = 0.002;

        this.temperaturaCompressor += (limite - this.temperaturaCompressor) * taxa * dt;

        if (this.compressorLigado) {
            this.tempoCompressorLigado++;
        } else {
            this.tempoCompressorLigado = 0;
        }

        if (this.temperaturaCompressor >= this.tempReleTermico && !this.releTermicoAcionado) {
            this.releTermicoAcionado = true;
            this.releTermicoAtutou++;
            this.compressorLigado = false;
            this.temperaturaCompressor = this.tempReleTermico + 10;
            console.log("Relé Térmico Atuou!");
        }

        if (this.releTermicoAcionado && this.temperaturaCompressor < 70) {
            this.releTermicoAcionado = false;
            console.log("Relé Térmico Resetado!");
        }

        if (this.releTermicoAcionado && this.temperaturaCompressor >= 70) {
            this.compressorLigado = false;
        }
    }

    atualizarFreezer(dt) {
        const alvo = (this.compressorLigado && !this.portaFreezerAberta && !this.releTermicoAcionado)
            ? -30
            : this.temperaturaAmbiente;

        const taxa = (this.compressorLigado && !this.portaFreezerAberta)
            ? (this.ventoinhaFreezer ? 0.001 : 0.0005)
            : (this.portaFreezerAberta
                ? (this.ventoinhaFreezer ? 0.005 : 0.002)
                : 0.00004);

        this.temperaturaFreezer += (alvo - this.temperaturaFreezer) * taxa * dt;
    }

    atualizarResistencia(dt) {
        if (this.resistenciaLigada && !this.resistenciaQueimada) {
            const limite = 100.0;
            this.temperaturaResistencia += (limite - this.temperaturaResistencia) * 0.01 * dt;

            if (this.temperaturaResistencia >= limite) {
                this.resistenciaQueimada = true;
                this.resistenciaLigada = false;
                this.temperaturaResistencia = limite;
                alert("Resistência Queimada!");
            }
        } else {
            this.temperaturaResistencia += (this.temperaturaEvaporador - this.temperaturaResistencia)*0.003 *  dt;
        }
    }

    atualizarEvaporador(dt) {
        if (this.compressorLigado && !this.resistenciaLigada) {
            this.temperaturaEvaporador += (-30 - this.temperaturaEvaporador) * 0.0025 * dt;
        } else if (this.compressorLigado && this.resistenciaLigada) {
            const equilibrio = this.temperaturaResistencia - 10;
            this.temperaturaEvaporador += (equilibrio - this.temperaturaEvaporador) * 0.005 * dt;
        } else if (this.resistenciaLigada) {
            this.temperaturaEvaporador += (this.temperaturaResistencia - this.temperaturaEvaporador) * 0.01 * dt;
        } else {
            const taxa = this.portaFreezerAberta ? 0.004 : 0.001;
            this.temperaturaEvaporador += (this.temperaturaAmbiente - this.temperaturaEvaporador) * taxa * dt;
        }
    }

    transferirCalorEvaporadorFreezer(dt) {
        const taxa = this.ventoinhaFreezer ? 0.002 : 0.001;
        this.temperaturaFreezer += (this.temperaturaEvaporador - this.temperaturaFreezer) * taxa * dt;
    }
    getTempoSimulacao() {
        return Math.trunc(this.tempoSimulacao * 1);
    }

   
}
    
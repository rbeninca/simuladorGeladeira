/* Classe JS  que cria os htmls dos menus com as opções dos botões, 
    e os eventos de clique para cada botão, div para status das temperaturas no aside
    um grafico de temperatura e um gráfico de tempo  no main
    e o footer com os dados do autor.
    O gráfico de temperatura é atualizado a cada 5 segundos com os dados do servidor
*/
const header = document.querySelector('header');
const menu = document.querySelector('menu');
const aside = document.querySelector('aside');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

//Definição de uma lista de objetos com os ids e labels dos botões do menu switch input text  para os compoenentes do sistema de refrigeracao 
class App {
    constructor() {
        this.criaMenu();
        this.criaGraficoTemperatura();
        this.criaGraficoTempo();
        this.criaDivStatusTemperatura();
        this.criaDivStatusTempo();
        this.criaFooter();
    }


    static parametrosRefrigeracao = [
        { id: 'temperaturaAmbiente', label: 'Temperatura Ambiente', input: 'number', enable: true, valor: "25", objdom: null },
        { id: 'umidadeAmbiente', label: 'Umidade Ambiente', input: 'number', enable: true, valor: "25", objdom: null },

        { id: 'temperaturaCompressor', label: 'Temperatura Compressor', input: 'number', valor: "25", enable: true, objdom: null },
        { id: 'temperaturaEvaporador', label: 'Temperatura Evaporador', input: 'number', valor: "25", enable: true, objdom: null },
        { id: 'temperaturaRefrigerador', label: 'Temperatura Refrigerador', input: 'number', valor: "25", enable: true, objdom: null },
        { id: 'temperaturaFreezer', label: 'Temperatura Freezer', input: 'number', valor: "25", enable: true, objdom: null },
        { id: 'temperaturaResistencia', label: 'Temperatura Resistencia', input: 'number', valor: "25", enable: true, objdom: null },


        { id: 'limiteReleTermico', label: 'Limite Rele Termico', input: 'number', valor: "25", enable: true, objdom: null },

        { id: 'numeroAtuacoesReleTermico', label: 'Numero Atuacoes Rele Termico', input: 'number', valor: "25", enable: true, objdom: null },
        { id: 'tempoSimulacao', label: 'Tempo Simulacao', input: 'number', enable: true, objdom: null }
    ];

    static componentesRefrigeracao = [
        { id: 'ventoinhaCompressor', label: 'Ventoinha Compressor', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },
        { id: 'ventoinhaEvaporador', label: 'Ventoinha Evaporador', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },

        { id: 'compressor', label: 'Compressor', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },
        { id: 'releTemico', label: 'Rele Termico', input: 'switch', enable: true, objdom: null },

        { id: 'resistencia', label: 'Resistencia', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },
        { id: 'fusivelTermico', label: 'Fusivel Termico', input: 'switch', enable: true, valor1: 'Fechado', valor2: 'Aberto', objdom: null },

        { id: 'ventoinhaFreezer', label: 'Ventoinha Freezer', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },

        { id: 'ventoinhaRefrigerador', label: 'Ventoinha Refrigerador', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },
        { id: 'ventoinhaCondensador', label: 'Ventoinha Condensador', input: 'switch', enable: true, valor1: 'Ligado', valor2: 'Desligado', objdom: null },

        { id: 'portaFrezerAberta', label: 'Porta Freezer', input: 'switch', enable: true, valor1: 'Aberta', valor2: 'Fechada', objdom: null },
        { id: 'portaRefrigeradorAberta', label: 'Porta Refrigerador', input: 'switch', enable: true, valor1: 'Aberta', valor2: 'Fechada', objdom: null },
    ]
    // Definição de uma lista de objeto para configurar o simulador, run, pause, stop, reset, step  e tipo da simulação {manual,simulada,fisico}
    static componentesSimulador = [
        { id: 'run', label: 'Run', input: 'button', enable: true, valores: ['Executar', 'Pause'], objdom: null },
        { id: 'reset', label: 'Reset', input: 'button', enable: true, valores: ['Ligado', 'Desligado'], objdom: null },
        { id: 'step', label: 'Step', input: 'button', enable: true, valores: 'Passo 1', objdom: null },
        { id: 'velocidade', label: 'Velocidade', input: 'number', enable: true, valores: '1', objdom: null },
        { id: 'aumentarVelocidade', label: 'Aumentar Velocidade', input: 'button', enable: true, valores: ['Aumentar +'], objdom: null },
        { id: 'diminuirVelocidade', label: 'Diminuir Velocidade', input: 'button', enable: true, valores: ['Diminuir -'], objdom: null },

        { id: 'tipoSimulacao', label: 'Tipo Simulacao', input: 'select', enable: true, valores: ['manual', 'simulada', 'fisica'], objdom: null }
    ]

    static criaMenuSimulador = () => {
        header.innerHTML = '';
        this.componentesSimulador.forEach(item => {
            //label para os botoes do simulador
            var input = `<label for="${item.id}">${item.label}:</label>`
            switch (item.input) {
                case 'button':
                    if (item.valores.length > 1) {
                        input += `<button id="${item.id}" ${item.enable ? '' : 'disabled'}>${item.valores[0]}</button>`;
                    }
                    else {
                        input += `<button id="${item.id}" ${item.enable ? '' : 'disabled'}>${item.valores}</button>`;
                    }
                    break;
                case 'select':
                    input += `<select id="${item.id}" ${item.enable ? '' : 'disabled'}>`;
                    item.valores.forEach(valor => {
                        input += `<option value="${valor}">${valor}</option>`;
                    });
                    input += `</select>`;
                    break;
                case 'number':
                    input += `<input type="${item.input}" id="${item.id}" value="${item.valores}" ${item.enable ? '' : 'disabled'}>`;
                    break;
                default:
                    break;
            }
            header.innerHTML += input;
            item.objdom = document.getElementById(item.id);
            item.objdom.addEventListener('click', (event) => {
                const valor = event.target.value;
                console.log(`${item.label} ${valor}`);
                // Aqui você pode adicionar a lógica para enviar o valor para o servidor
            });
        });      
}

    static criaMenuComponetes = () => {
    menu.innerHTML = '';
    this.componentesRefrigeracao.forEach(item => {
        const switchInput = `<span class="switch-label">${item.label} :<span>
                                <label class="switch">
                                <input type="checkbox" id="${item.id}">
                                <div class="slider round">
                                    <!--ADDED HTML -->
                                    <span class="on">${item.valor1}</span>
                                    <span class="off">${item.valor2}</span>
                                    <!--END-->
                                    </div>
                                </label>
                             </span>
        `
        menu.innerHTML += switchInput;
        item.objdom = document.getElementById(item.id);
        item.objdom.addEventListener('change', (event) => {
            const valor = event.target.checked ? item.valor1 : item.valor2;
            console.log(`${item.label} ${valor}`);
            // Aqui você pode adicionar a lógica para enviar o valor para o servidor
        });
    });
};

    static criaMenuStatusParametros = () => {
    aside.innerHTML = '';
    this.parametrosRefrigeracao.forEach(item => {
        //label para os parametros de temperatura com input numérico
        const input = `<label for="${item.id}">${item.label}:</label>
                          <input type="${item.input}" id="${item.id}" value="${item.valor}" ${item.enable ? '' : 'disabled'}>`
        aside.innerHTML += input;
        item.objdom = document.getElementById(item.id);
        item.objdom.addEventListener('change', (event) => {
            const valor = event.target.value;
            console.log(`${item.label} ${valor}`);
            // Aqui você pode adicionar a lógica para enviar o valor para o servidor
        });
    });
};


}

App.criaMenuComponetes();
App.criaMenuStatusParametros();
App.criaMenuSimulador();
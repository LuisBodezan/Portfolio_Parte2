const tela = document.getElementById('tela');
const contexto = tela.getContext('2d');
const botaoTema = document.getElementById('botao-tema');

const tamanhoFonte = 24;
const texto = "ルイス・グスタボ・デ・モウラ・ボデザン";

let gotas = [];
let posicao = [0, 0, 0, 0, 0];
let larguraColuna, colunasPorSecao;

const temas = {
  escuro: {
    cores: ['#31e6f0', '#858585', '#f3008e', '#858585', '#31e6f0'],
    fundo: [
      'rgba(5, 44, 44, 0.18)',
      'rgba(0, 0, 0, 0.1)',
      'rgba(59, 0, 35, 0.1)',
      'rgba(0, 0, 0, 0.1)',
      'rgba(5, 44, 44, 0.18)'
    ]
  },
  claro: {
    cores: ['#007BFF', '#07288bff', '#F5C542', '#07288bff', '#007BFF'],
    fundo: [
      'rgba(6, 28, 48, 0.18)',
      'rgba(1, 3, 17, 0.1)',
      'rgba(65, 56, 8, 0.1)',
      'rgba(1, 3, 17, 0.1)',
      'rgba(6, 28, 48, 0.18)'
    ]
  }
};

let temaAtual = 'escuro';

function iniciarTela() {
  tela.width = window.innerWidth;
  tela.height = window.innerHeight;

  larguraColuna = tela.width / 5;
  colunasPorSecao = Math.floor(larguraColuna / tamanhoFonte);

  gotas = Array.from({ length: 5 }, () =>
    Array.from({ length: colunasPorSecao }, () => Math.random() * tela.height)
  );
}

function letra(coluna) {
  const char = texto[posicao[coluna]];
  posicao[coluna] = (posicao[coluna] + 1) % texto.length;
  return char;
}

function desenharChar(char, x, y, cor) {
  contexto.lineWidth = 2;
  contexto.strokeStyle = 'black';
  contexto.strokeText(char, x, y);
  contexto.fillStyle = cor;
  contexto.fillText(char, x, y);
}

function desenhar() {
  const cores = temas[temaAtual].cores;
  const fundos = temas[temaAtual].fundo;

  for (let i = 0; i < 5; i++) {
    const inicioX = i * larguraColuna;
    contexto.fillStyle = fundos[i];
    contexto.fillRect(inicioX, 0, larguraColuna, tela.height);

    contexto.font = tamanhoFonte + 'px monospace';
    const cor = cores[i];

    for (let j = 0; j < colunasPorSecao; j++) {
      const x = inicioX + j * tamanhoFonte;
      const y = gotas[i][j];

      desenharChar(letra(i), x, y, cor);

      gotas[i][j] += tamanhoFonte;
      if (gotas[i][j] > tela.height) gotas[i][j] = 0;
    }
  }
}

iniciarTela();
setInterval(desenhar, 45);
window.addEventListener('resize', iniciarTela);

botaoTema.addEventListener('click', () => {
  temaAtual = temaAtual === 'escuro' ? 'claro' : 'escuro';
  document.body.classList.toggle('claro');
});
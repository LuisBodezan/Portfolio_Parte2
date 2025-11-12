/* ======================= 1. MODAIS ======================= */
  // Sequência de modais (removido o "modal-bom-dia")
const modais = [
  "modal-anuncio",
  "modal-cookies",
  "modal-termos",
  "modal-bemvindo"
];

let indiceModal = 0;

// Função para abrir modal
function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "flex";
}

// Função para fechar modal e abrir o próximo
function fecharModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
  indiceModal++;
  if (indiceModal < modais.length) {
    setTimeout(() => abrirModal(modais[indiceModal]), 1000);
  }
}

// ==================== MODAL ANÚNCIO ====================
let anuncioClicado = false;
const btnAnuncio = document.getElementById("btn-anuncio");
btnAnuncio.addEventListener("click", () => {
  const modal = document.getElementById("modal-anuncio");
  const link = "https://www.bet365.bet.br/#/HO/";

  if (!anuncioClicado) {
    console.log("Abrindo site Bet365...");
    window.open(link, "_blank");
    anuncioClicado = true;
  } else {
    console.log("Fechando modal anúncio");
    fecharModal("modal-anuncio");
    anuncioClicado = false;
  }
});

// Fecha ao clicar fora
document.getElementById("modal-anuncio").addEventListener("click", (e) => {
  if (e.target.id === "modal-anuncio") fecharModal("modal-anuncio");
});

// ==================== MODAL COOKIES ====================
document.getElementById("btn-aceitar-cookies").addEventListener("click", () => {
  console.log("Cookies aceitos!");
  fecharModal("modal-cookies");
});

document.getElementById("btn-recusar-cookies").addEventListener("click", () => {
  console.log("Cookies recusados!");
  fecharModal("modal-cookies");
});

// ==================== MODAL TERMOS ====================
document.getElementById("btn-aceitar-termos").addEventListener("click", () => {
  console.log("Termos de uso aceitos!");
  fecharModal("modal-termos");
});

// ==================== MODAL BEM-VINDO PORTFÓLIO ====================
document.getElementById("btn-fechar-bemvindo").addEventListener("click", () => {
  console.log("Bem-vindo ao portfólio!");
  fecharModal("modal-bemvindo");
});

// ==================== Inicia automaticamente ====================
window.onload = () => {
  setTimeout(() => abrirModal(modais[indiceModal]), 500);
};

/* ======================= 2. MENU RESPONSIVO (HAMBÚRGUER) ======================= */
// ======== HEADER SOME AO ROLAR ========
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");

  if (window.scrollY > 100) {
    header.style.top = "-100px"; // move o header pra cima (fora da tela)
    header.style.transition = "top 0.4s ease";
  } else {
    header.style.top = "0"; // volta a aparecer no topo
  }
});

// ======== MOSTRAR ÍCONE DE MENU QUANDO HEADER SOME ========
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  const menuIcon = document.getElementById("menu-icon");

  if (window.scrollY > 100) {
    header.style.top = "-100px"; // header sobe
    menuIcon.style.display = "block"; // ícone aparece
  } else {
    header.style.top = "0"; // header volta
    menuIcon.style.display = "none"; // ícone some
  }
});

// ======== MOSTRAR/ESCONDER MENU ========
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("menu-mobile");

menuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

/* ======================= 3. SCROLL SUAVE ======================= */
// Seleciona links do header + links do menu hamburguer
const links = document.querySelectorAll("header a, .menu-mobile a");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault(); 

    // fecha o menu se estiver aberto
    const menu = document.querySelector(".menu-mobile");
    if (menu.classList.contains("mostrar")) {
      menu.classList.remove("mostrar");
    }

    // faz scroll suave
    const destino = document.querySelector(this.getAttribute("href"));
    if(destino){
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ======================= 4. TROCA DE TEMA (SINCRONIZADO) ======================= */
// === Seleciona elementos do DOM ===
const botaoDesktop = document.getElementById('btn-tema');        // botão no header
const botaoMobile = document.getElementById('btn-tema-mobile');  // botão no menu
const body = document.body;

// === Função para aplicar um tema específico ===
function aplicarTema(tema) {
  if (tema === 'claro') {
    body.classList.add('light');
    if (botaoDesktop) botaoDesktop.textContent = '🌙';
    if (botaoMobile) botaoMobile.textContent = '🌙';
  } else {
    body.classList.remove('light');
    if (botaoDesktop) botaoDesktop.textContent = '☀️';
    if (botaoMobile) botaoMobile.textContent = '☀️';
  }
  localStorage.setItem('tema', tema);
}

// === Carrega o tema salvo no localStorage ===
const temaSalvo = localStorage.getItem('tema') || 'escuro';
aplicarTema(temaSalvo);

// === Alterna o tema ao clicar em qualquer botão ===
function alternarTema() {
  const temaAtual = body.classList.contains('light') ? 'escuro' : 'claro';
  aplicarTema(temaAtual);
}

if (botaoDesktop) botaoDesktop.addEventListener('click', alternarTema);
if (botaoMobile) botaoMobile.addEventListener('click', alternarTema);

/* ======================= 5. RELÓGIO + SAUDAÇÃO DINÂMICA ======================= */
function atualizarSaudacao() {
  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes().toString().padStart(2, "0");
  const barra = document.getElementById("barra-saudacao");
  const texto = document.getElementById("texto-saudacao");

  let saudacao = "";
  let gradiente = "";

  if (hora >= 0 && hora < 5) {
    saudacao = `🌌 Acordado essa hora? CLT KKKKKKKKKK | ${hora}:${minutos}`;
    gradiente = "linear-gradient(90deg, #0B132B, #555)";
  } else if (hora >= 5 && hora < 12) {
    saudacao = `🌞 Bom dia! Que a luz do amanhecer ilumine seu caminho! | ${hora}:${minutos}`;
    gradiente = "linear-gradient(90deg, #FFD700, #87CEFA)";
  } else if (hora >= 12 && hora < 18) {
    saudacao = `🌇 Boa tarde! Continue brilhando com força e energia! | ${hora}:${minutos}`;
    gradiente = "linear-gradient(90deg, #ff8800ff, #ff2600ff)";
  } else {
    saudacao = `🌙 Boa noite! Que o trovão descanse até o novo amanhecer! | ${hora}:${minutos}`;
    gradiente = "linear-gradient(90deg, #0B132B, #6A0DAD)";
  }

  barra.style.background = gradiente;
  texto.textContent = saudacao;
}

// Atualiza saudação e hora em tempo real
setInterval(atualizarSaudacao, 1000);
atualizarSaudacao();

/* ==================== 6. CARROSSEL DE IMAGENS ===================== */
const carrossel = document.getElementById("carrossel3D");
const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");
const total = slides.length;

const angulo = 360 / total; // ângulo entre as imagens
let indice = 0; // slide atual
let rotacaoAtual = 0; // rotação atual do carrossel
let animando = false; // impede cliques durante a animação

// === Posiciona os slides em um círculo 3D ===
slides.forEach((slide, i) => {
  const rotacao = angulo * i;
  slide.style.transform = `rotateY(${rotacao}deg) translateZ(250px)`; // posiciona cada slide no círculo
});

// === Atualiza o carrossel e o indicador ativo ===
function atualizarCarrossel() {
  if (animando) return; // evita cliques durante transição
  animando = true;
  carrossel.style.transform = `rotateY(${rotacaoAtual}deg)`; // gira o carrossel

  // atualiza o estado dos indicadores (pontinhos)
  indicadores.forEach((dot, i) => {
    dot.classList.toggle("ativo", i === indice);
  });

  setTimeout(() => animando = false, 500); // desbloqueia após 1s
}

// === Avança para o próximo slide ===
function proximoSlide() {
  indice = (indice + 1) % total; // vai para o próximo (ou volta ao 1º)
  rotacaoAtual -= angulo; // ajusta o ângulo
  atualizarCarrossel();
}

// === Vai para um slide específico (clicando no indicador) ===
function irParaSlide(index) {
  const diferenca = index - indice;
  rotacaoAtual -= diferenca * angulo;
  indice = index;
  atualizarCarrossel();
}

setInterval(() => {
  if (!animando) proximoSlide();
}, 2000);



/* ======================= 7. VALIDAÇÃO DO FORMULÁRIO ======================= */
const form = document.getElementById("contato-form");
const status = document.getElementById("status");

const scriptEmailJS = document.createElement("script");
scriptEmailJS.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
document.head.appendChild(scriptEmailJS);

scriptEmailJS.onload = () => {
  emailjs.init("zDLDr1Axqwg-dQ2i-");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Campos
    const nome = document.getElementById("from_name");
    const email = document.getElementById("to_email");
    const mensagem = document.getElementById("message");

    // Erros
    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroMensagem = document.getElementById("erro-mensagem");

    // Limpa erros anteriores
    [erroNome, erroEmail, erroMensagem].forEach(el => el.textContent = "");
    [nome, email, mensagem].forEach(el => el.classList.remove("erro-borda"));

    let valido = true;

    // Validação Nome
    if (nome.value.trim() === "") {
      erroNome.textContent = "⚠️ Por favor, digite seu nome.";
      nome.classList.add("erro-borda");
      valido = false;
    }

    // Validação E-mail
    const emailVal = email.value.trim();
    if (emailVal === "") {
      erroEmail.textContent = "⚠️ O campo de e-mail não pode ficar vazio.";
      email.classList.add("erro-borda");
      valido = false;
    } else if (!emailVal.includes("@")) {
      erroEmail.textContent = "⚠️ O e-mail deve conter '@'.";
      email.classList.add("erro-borda");
      valido = false;
    } else if (!/\.[a-z]{2,}$/i.test(emailVal)) {
      erroEmail.textContent = "⚠️ O e-mail deve terminar com '.com' ou outro domínio válido.";
      email.classList.add("erro-borda");
      valido = false;
    }

    // Validação Mensagem
    if (mensagem.value.trim() === "") {
      erroMensagem.textContent = "⚠️ Escreva uma mensagem antes de enviar.";
      mensagem.classList.add("erro-borda");
      valido = false;
    }

    if (!valido) return;

    // Parâmetros do EmailJS
    const params = {
      from_name: nome.value,
      to_email: email.value,
      message: mensagem.value
    };

    // Envia para visitante
    emailjs.send("service_8yjo8fj", "template_163vnhj", params)
      .then(() => {
        console.log("✅ Mensagem enviada para o visitante.");

        // Cópia para email próprio
        const copiaParams = {
          from_name: nome.value,
          to_email: "luis.bodezan@gmail.com",
          message: `📩 NOVO CONTATO RECEBIDO\n\nDe: ${nome.value}\nE-mail: ${email.value}\n\nMensagem:\n${mensagem.value}`
        };
        return emailjs.send("service_8yjo8fj", "template_163vnhj", copiaParams);
      })
      .then(() => {
        status.textContent = "✅ Mensagem enviada com sucesso! Você e o remetente receberão uma cópia.";
        status.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Erro ao enviar:", error);
        status.textContent = "❌ Erro ao enviar o e-mail. Veja o console.";
        status.style.color = "red";
      });
  });
};
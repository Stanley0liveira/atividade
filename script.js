const musica = document.getElementById("musica");
const icone = document.getElementById("iconePlay");
const barra = document.getElementById("barra");

/* =========================
   AUTOPLAY
========================= */

window.addEventListener("load", () => {

    musica.play()
    .then(() => {
        icone.className = "fa-solid fa-pause";
    })
    .catch(() => {
        console.log("Autoplay bloqueado pelo navegador");
    });

});

/* =========================
   PLAY / PAUSE
========================= */

function playMusic(){

    if(musica.paused){
        musica.play();
        icone.className = "fa-solid fa-pause";
    } else {
        musica.pause();
        icone.className = "fa-solid fa-play";
    }
}

/* =========================
   BARRA DE PROGRESSO
========================= */

musica.addEventListener("timeupdate", () => {

    if(!musica.duration) return;

    const progresso = (musica.currentTime / musica.duration) * 100;
    barra.style.width = progresso + "%";
});

/* =========================
   MENSAGEM
========================= */

function toggleMensagem(){

    const mensagem = document.getElementById("mensagem");
    mensagem.classList.toggle("aberto");
}

/* =========================
   CONTADOR
========================= */

const inicio = new Date("2026-01-07T00:00:00");

function atualizarContador(){

    const agora = new Date();
    const diff = agora - inicio;

    const segundos = Math.floor(diff / 1000) % 60;
    const minutos = Math.floor(diff / (1000 * 60)) % 60;
    const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;

    const diasTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    const anos = Math.floor(diasTotal / 365);
    const meses = Math.floor((diasTotal % 365) / 30);
    const dias = (diasTotal % 365) % 30;

    document.getElementById("anos").innerText = anos;
    document.getElementById("meses").innerText = meses;
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}

setInterval(atualizarContador, 1000);
atualizarContador();

/* =========================
   STORIES / DESTAQUES
========================= */

const destaques = [
    {
        nome: "Fotos Aleatórias",
        imagens: [
            "fotos/10.jpeg",
            "fotos/1.jpeg",
            "fotos/4.jpeg",
            "fotos/5.jpeg",
            "fotos/6.jpeg"
        ]
    },
    {
        nome: "Primeiro Encontro",
        imagens: [
            "fotos/2.jpeg",
            "fotos/7.jpeg"
        ]
    },
    {
        nome: "Stanley & Ana",
        imagens: [
            "fotos/12.jpeg",
            "fotos/11.jpeg",
            "fotos/14.jpeg",
            "video/2.mp4"
        ]
    }
];

let destaqueAtual = 0;
let storyAtual = 0;
let timer;

/* ABRIR DESTAQUE */

function abrirDestaque(indice){

    destaqueAtual = indice;
    storyAtual = 0;

    document.getElementById("modal").style.display = "flex";
    document.getElementById("titulo").innerText = destaques[indice].nome;

    criarBarras();
    mostrarStory();
}

/* BARRAS DE PROGRESSO */

function criarBarras(){

    const progresso = document.getElementById("progresso");
    progresso.innerHTML = "";

    destaques[destaqueAtual].imagens.forEach(() => {

        const barra = document.createElement("div");
        barra.classList.add("story-barra");

        const span = document.createElement("span");
        barra.appendChild(span);

        progresso.appendChild(barra);
    });
}

/* MOSTRAR STORY */

function mostrarStory(){

    clearTimeout(timer);

    const imagens = destaques[destaqueAtual].imagens;
    const arquivo = imagens[storyAtual];

    const img = document.getElementById("storyImage");
    const video = document.getElementById("storyVideo");

    const spans = document.querySelectorAll(".story-barra span");

    spans.forEach((span, index) => {

        span.style.transition = "none";

        if(index < storyAtual){
            span.style.width = "100%";
        } else {
            span.style.width = "0%";
        }
    });

    /* TROCA IMG / VIDEO */
    if(arquivo.endsWith(".mp4")){

        img.style.display = "none";
        video.style.display = "block";

        video.src = arquivo;
        video.currentTime = 0;

        video.play().catch(() => {});

    } else {

        video.pause();
        video.style.display = "none";

        img.style.display = "block";
        img.src = arquivo;
    }

    /* ANIMA BARRA ATUAL */
    setTimeout(() => {
        spans[storyAtual].style.transition = "width 5s linear";
        spans[storyAtual].style.width = "100%";
    }, 50);

    /* PRÓXIMO STORY */
    timer = setTimeout(() => {

        if(storyAtual < imagens.length - 1){
            storyAtual++;
            mostrarStory();
        } else {
            fecharStory();
        }

    }, 5000);
}

/* CONTROLES */

function proxima(){

    const imagens = destaques[destaqueAtual].imagens;

    if(storyAtual < imagens.length - 1){
        storyAtual++;
        mostrarStory();
    } else {
        fecharStory();
    }
}

function anterior(){

    if(storyAtual > 0){
        storyAtual--;
        mostrarStory();
    }
}

/* FECHAR */

function fecharStory(){

    clearTimeout(timer);

    const video = document.getElementById("storyVideo");
    video.pause();

    document.getElementById("modal").style.display = "none";
}
const content = document.getElementById("content");

const topics = {
  basic: [
    { title: "O que é o TEA?", desc: "Definição e características básicas do Transtorno do Espectro Autista." },
    { title: "Sinais Precoces", desc: "Como identificar os primeiros sinais em crianças pequenas." },
    { title: "Diagnóstico", desc: "Processo de diagnóstico e profissionais envolvidos." }
  ],
  intermediate: [
    { title: "Intervenções e Terapias", desc: "Terapias comportamentais, fonoaudiologia e terapia ocupacional." },
    { title: "Educação e Inclusão Escolar", desc: "Ambientes educacionais inclusivos favorecem o desenvolvimento." },
    { title: "Família e Rede de Apoio", desc: "A participação ativa da família é essencial para o progresso." },
    { title: "Desenvolvimento da Comunicação", desc: "Estratégias para aprimorar habilidades comunicativas." },
    { title: "Apoio Psicossocial", desc: "Suporte emocional e social contribuem para a autonomia." },
    { title: "Tecnologias Assistivas", desc: "Dispositivos tecnológicos auxiliam na comunicação e aprendizado." },
    { title: "Adaptações Ambientais", desc: "Ambientes adaptados facilitam o aprendizado e conforto." },
    { title: "Inclusão no Mercado de Trabalho", desc: "Programas de inclusão são importantes para a independência." },
    { title: "Capacitação de Profissionais", desc: "Formação adequada dos profissionais de educação e saúde." }
  ],
  advanced: [
    { title: "Comorbidades no TEA", desc: "Transtornos associados como TDAH, ansiedade e epilepsia." },
    { title: "Genética e Pesquisas Atuais", desc: "Avanços na compreensão das bases genéticas do TEA." },
    { title: "Neurodiversidade", desc: "Entendimento do autismo sob a perspectiva da diversidade humana." }
  ]
};

function showLevel(level) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  content.innerHTML = `
    <div class="level-header">
      Conhecimento ${capitalize(level)}<br/>
      ${level === "basic" ? "Entendendo os fundamentos" : level === "intermediate" ? "Aprofundando o entendimento" : "Explorando temas complexos"}
    </div>
    <div class="cards">
      ${topics[level].map(t => `
        <div class="card">
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
          <a href="#">Ler mais →</a>
        </div>
      `).join("")}
    </div>
  `;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

window.onload = () => showLevel("intermediate");

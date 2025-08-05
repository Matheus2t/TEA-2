from IPython.display import display, HTML

html_code = '''
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>TEA Informativo</title>
<style>
  body {
    margin: 0; padding: 20px; 
    font-family: Arial, sans-serif; 
    background: linear-gradient(to bottom, #121f45, #1f2e70);
    color: white;
    min-height: 100vh;
  }
  header h1 {
    margin: 0; font-size: 1.8rem;
  }
  header p {
    margin-top: 4px; color: #cbd5e1;
  }
  .nivel-buttons button {
    margin-right: 10px;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #2a2e59;
    color: white;
    font-weight: normal;
    transition: background 0.3s;
  }
  .nivel-buttons button.active {
    background: linear-gradient(to right, #3b82f6, #06b6d4);
    font-weight: bold;
  }
  .info-box {
    margin: 20px 0;
    padding: 12px 16px;
    background: linear-gradient(to right, #3b82f6, #06b6d4);
    border-radius: 12px;
  }
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
    gap: 20px;
  }
  .card {
    background: #2b3c89;
    border-radius: 20px;
    padding: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    overflow: hidden;
  }
  .card:hover {
    background: #3746a3;
  }
  .card h3 {
    margin: 0 0 6px 0;
  }
  .card small {
    color: #60a5fa;
  }
  .card p {
    margin-top: 8px;
    color: #bfdbfe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card .read-more {
    margin-top: 6px;
    color: #93c5fd;
    font-size: 0.9rem;
  }
  .button-quiz {
    margin-top: 30px;
    display: block;
    padding: 12px 28px;
    background-color: #22c55e;
    border: none;
    border-radius: 9999px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(34,197,94,0.6);
    transition: background-color 0.3s;
  }
  .button-quiz:hover {
    background-color: #16a34a;
  }
  /* Modal */
  .modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: #1d2750;
    padding: 24px;
    border-radius: 20px;
    max-width: 400px;
    width: 90%;
    color: white;
    position: relative;
  }
  .modal-content h3 {
    margin-top: 0;
  }
  .close-btn {
    position: absolute;
    right: 16px;
    top: 16px;
    background: #64748b;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
  }
  /* Quiz modal */
  .quiz-modal-content {
    background: #0f172a;
    padding: 24px;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    color: white;
    position: relative;
  }
  .quiz-modal-content h2 {
    color: #a78bfa;
    margin-top: 0;
  }
  .quiz-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
  }
  .quiz-options button {
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: #1e293b;
    color: white;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.3s;
  }
  .quiz-options button.selected.correct {
    border-color: #22c55e;
  }
  .quiz-options button.selected.incorrect {
    border-color: #ef4444;
  }
  .feedback {
    margin-top: 16px;
    font-weight: bold;
  }
  .feedback.correct {
    color: #22c55e;
  }
  .feedback.incorrect {
    color: #ef4444;
  }
  .quiz-close-btn {
    margin-top: 20px;
    float: right;
    background: linear-gradient(to right, #3b82f6, #06b6d4);
    border: none;
    padding: 12px 24px;
    border-radius: 9999px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
</style>
</head>
<body>

<header>
  <h1>TEA Informativo</h1>
  <p>Expandindo conhecimento sobre o Autismo</p>
</header>

<div class="nivel-buttons">
  <button id="btnBasico" class="active">Conhecimento Básico</button>
  <button id="btnIntermediario">Conhecimento Intermediário</button>
  <button id="btnAvancado">Conhecimento Avançado</button>
</div>

<div class="info-box" id="infoBox">
  Conhecimento Básico<br/>
  Primeiros passos para entender o TEA
</div>

<div class="cards-container" id="cardsContainer">
  <!-- Cards aqui -->
</div>

<button class="button-quiz" id="btnQuiz">Testar Conhecimento</button>

<!-- Modal Detalhes -->
<div class="modal-bg" id="modalDetails" style="display:none;">
  <div class="modal-content" id="modalContent">
    <button class="close-btn" id="closeModalDetails">Fechar</button>
    <h3 id="modalTitle"></h3>
    <small id="modalLevel" style="color:#60a5fa;"></small>
    <p id="modalText" style="margin-top: 12px; color:#bfdbfe;"></p>
  </div>
</div>

<!-- Modal Quiz -->
<div class="modal-bg" id="modalQuiz" style="display:none;">
  <div class="quiz-modal-content">
    <h2 id="quizTitle"></h2>
    <p><strong>O que significa a sigla TEA?</strong></p>
    <div class="quiz-options" id="quizOptions">
      <!-- opções aqui -->
    </div>
    <p id="quizFeedback" class="feedback"></p>
    <button class="quiz-close-btn" id="closeQuiz">Fechar Quiz</button>
  </div>
</div>

<script>
const allCards = {
  Basico: [
    { title: 'O que é o TEA?', level: 'Básico', text: 'O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta a comunicação, interação social e comportamento. Cada pessoa no espectro é única.' },
    { title: 'Características Principais', level: 'Básico', text: 'Dificuldades na comunicação social, padrões repetitivos de comportamento, interesses específicos e sensibilidades sensoriais são características comuns.' },
    { title: 'Mitos e Verdades', level: 'Básico', text: 'O TEA não é causado por vacinas, não é uma doença mental e pessoas autistas podem ter vidas plenas e independentes com o apoio adequado.' },
    { title: 'Diagnóstico Precoce', level: 'Básico', text: 'A identificação rápida dos sinais permite intervenções eficazes e melhor desenvolvimento.' },
    { title: 'Sinais Comuns', level: 'Básico', text: 'Dificuldade em manter contato visual, atraso na fala e comportamentos repetitivos são sinais frequentes.' },
    { title: 'TEA e Sensibilidade Sensorial', level: 'Básico', text: 'Muitas pessoas com TEA apresentam hipersensibilidade a sons, luzes e texturas.' },
    { title: 'Inclusão Social', level: 'Básico', text: 'Promover o respeito e a compreensão é essencial para a inclusão das pessoas autistas.' },
    { title: 'Comportamentos Repetitivos', level: 'Básico', text: 'Movimentos estereotipados e rotinas rígidas são comuns no espectro autista.' },
    { title: 'O Papel da Família', level: 'Básico', text: 'O apoio familiar é fundamental para o desenvolvimento e bem-estar.' }
  ],
  Intermediario: [
    { title: 'Intervenções e Terapias', level: 'Intermediário', text: 'Terapias comportamentais, fonoaudiologia e terapia ocupacional são comuns para o apoio ao desenvolvimento.' },
    { title: 'Educação e Inclusão Escolar', level: 'Intermediário', text: 'Ambientes educacionais inclusivos favorecem a aprendizagem de estudantes autistas com suporte adequado.' },
    { title: 'Família e Rede de Apoio', level: 'Intermediário', text: 'A participação ativa da família é essencial para o bem-estar e desenvolvimento da pessoa autista.' },
    { title: 'Desenvolvimento da Comunicação', level: 'Intermediário', text: 'Estratégias para aprimorar habilidades comunicativas são fundamentais.' },
    { title: 'Apoio Psicossocial', level: 'Intermediário', text: 'Suporte emocional e social contribuem para a qualidade de vida.' },
    { title: 'Tecnologias Assistivas', level: 'Intermediário', text: 'Dispositivos tecnológicos auxiliam na comunicação e aprendizado.' },
    { title: 'Adaptações Ambientais', level: 'Intermediário', text: 'Ambientes adaptados facilitam o aprendizado e o bem-estar.' },
    { title: 'Inclusão no Mercado de Trabalho', level: 'Intermediário', text: 'Programas de inclusão são importantes para a empregabilidade.' },
    { title: 'Capacitação de Profissionais', level: 'Intermediário', text: 'Formação adequada dos profissionais de educação e saúde é necessária.' }
  ],
  Avancado: [
    { title: 'Autismo na Vida Adulta', level: 'Avançado', text: 'Adultos autistas enfrentam desafios em empregabilidade, moradia independente e relacionamentos.' },
    { title: 'Neurodiversidade e Sociedade', level: 'Avançado', text: 'A neurodiversidade propõe enxergar o autismo como uma variação humana e não como doença.' },
    { title: 'Políticas Públicas', level: 'Avançado', text: 'Leis de inclusão e programas de assistência são fundamentais para garantir direitos das pessoas autistas.' },
    { title: 'Pesquisa Científica Atual', level: 'Avançado', text: 'Estudos avançados buscam compreender as bases genéticas e neurológicas.' },
    { title: 'Direitos e Legislação', level: 'Avançado', text: 'Conhecer a legislação garante a proteção dos direitos.' },
    { title: 'Desafios no Mercado de Trabalho', level: 'Avançado', text: 'A inclusão efetiva ainda enfrenta barreiras estruturais.' },
    { title: 'Suporte Psicológico Avançado', level: 'Avançado', text: 'Apoio especializado melhora a qualidade de vida dos adultos autistas.' },
    { title: 'Inovação em Tecnologias', level: 'Avançado', text: 'Novas ferramentas ajudam no diagnóstico e suporte.' },
    { title: 'Conscientização e Advocacy', level: 'Avançado', text: 'Movimentos sociais promovem direitos e visibilidade.' }
  ],
};

let nivelAtual = 'Basico';

const cardsContainer = document.getElementById('cardsContainer');
const infoBox = document.getElementById('infoBox');

const btnBasico = document.getElementById('btnBasico');
const btnIntermediario = document.getElementById('btnIntermediario');
const btnAvancado = document.getElementById('btnAvancado');

const modalDetails = document.getElementById('modalDetails');
const modalTitle = document.getElementById('modalTitle');
const modalLevel = document.getElementById('modalLevel');
const modalText = document.getElementById('modalText');
const closeModalDetails = document.getElementById('closeModalDetails');

const btnQuiz = document.getElementById('btnQuiz');
const modalQuiz = document.getElementById('modalQuiz');
const quizTitle = document.getElementById('quizTitle');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const closeQuiz = document.getElementById('closeQuiz');

const correctAnswer = 'Transtorno do Espectro Autista';

function renderCards() {
  cardsContainer.innerHTML = '';
  allCards[nivelAtual].forEach((card) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${card.title}</h3>
      <small>${card.level}</small>
      <p title="${card.text}">${card.text}</p>
      <small class="read-more">Ler mais →</small>
    `;
    div.onclick = () => openDetails(card);
    cardsContainer.appendChild(div);
  });
}

function updateNivelButtons() {
  [btnBasico, btnIntermediario, btnAvancado].forEach(btn => btn.classList.remove('active'));
  if (nivelAtual === 'Basico') btnBasico.classList.add('active');
  else if (nivelAtual === 'Intermediario') btnIntermediario.classList.add('active');
  else if (nivelAtual === 'Avancado') btnAvancado.classList.add('active');

  let subtitle = '';
  if (nivelAtual === 'Basico') subtitle = 'Primeiros passos para entender o TEA';
  else if (nivelAtual === 'Intermediario') subtitle = 'Aprofundando o entendimento';
  else subtitle = 'Desenvolvendo uma visão ampla sobre o TEA';

  infoBox.innerHTML = `Conhecimento ${nivelAtual}<br/>${subtitle}`;
}

function openDetails(card) {
  modalTitle.textContent = card.title;
  modalLevel.textContent = card.level;
  modalText.textContent = card.text;
  modalDetails.style.display = 'flex';
}

closeModalDetails.onclick = () => {
  modalDetails.style.display = 'none';
};

btnBasico.onclick = () => {
  nivelAtual = 'Basico';
  updateNivelButtons();
  renderCards();
};
btnIntermediario.onclick = () => {
  nivelAtual = 'Intermediario';
  updateNivelButtons();
  renderCards();
};
btnAvancado.onclick = () => {
  nivelAtual = 'Avancado';
  updateNivelButtons();
  renderCards();
};

btnQuiz.onclick = () => {
  modalQuiz.style.display = 'flex';
  quizTitle.textContent = 'Quiz Nível ' + nivelAtual;
  quizFeedback.textContent = '';
  selectedAnswer = null;
  renderQuizOptions();
};

closeQuiz.onclick = () => {
  modalQuiz.style.display = 'none';
  quizFeedback.textContent = '';
};

let selectedAnswer = null;

function renderQuizOptions() {
  const options = [
    'Transtorno de Estresse Ansioso',
    'Transtorno do Espectro Autista',
    'Técnica de Ensino Avançada',
    'Transtorno de Emoção Associada',
  ];

  quizOptions.innerHTML = '';
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      selectedAnswer = option;
      if (option === correctAnswer) {
        quizFeedback.textContent = '✅ Correto!';
        quizFeedback.className = 'feedback correct';
      } else {
        quizFeedback.textContent = '❌ Incorreto. Tente novamente.';
        quizFeedback.className = 'feedback incorrect';
      }
      renderQuizOptions();
    };
    if (selectedAnswer === option) {
      if (option === correctAnswer) btn.classList.add('selected', 'correct');
      else btn.classList.add('selected', 'incorrect');
    }
    quizOptions.appendChild(btn);
  });
}

// Inicializa
updateNivelButtons();
renderCards();

</script>
</body>
</html>
'''

display(HTML(html_code))

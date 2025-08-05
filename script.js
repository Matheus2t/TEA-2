const conteudos = {
  basico: {
    cards: [
      "O que é o TEA?",
      "Características principais",
      "Importância do diagnóstico precoce",
      "Comunicação no TEA",
      "Interações sociais",
      "Comportamentos repetitivos",
      "Dificuldades sensoriais",
      "TEA em crianças",
      "TEA em adultos"
    ],
    quiz: [
      { pergunta: "O que significa a sigla TEA?", opcoes: ["Transtorno Emocional Atípico", "Transtorno do Espectro Autista", "Terapia Educacional Adaptada"], correta: 1 },
      { pergunta: "Qual é uma característica comum no TEA?", opcoes: ["Alta sociabilidade", "Interesse restrito", "Fala excessiva"], correta: 1 },
      { pergunta: "O diagnóstico precoce é importante por quê?", opcoes: ["Não faz diferença", "Ajuda na intervenção precoce", "Evita o uso de medicamentos"], correta: 1 },
      { pergunta: "Pessoas com TEA geralmente têm dificuldades em:", opcoes: ["Resolver equações matemáticas", "Interações sociais", "Atividades físicas"], correta: 1 }
    ]
  },
  intermediario: {
    cards: [
      "Abordagens terapêuticas",
      "TEA e educação inclusiva",
      "Direitos da pessoa com TEA",
      "TEA e saúde mental",
      "Uso de tecnologias assistivas",
      "Intervenções comportamentais",
      "Aspectos legais e sociais",
      "Capacitação de profissionais",
      "Apoio às famílias"
    ],
    quiz: [
      { pergunta: "Qual terapia é frequentemente usada no TEA?", opcoes: ["Terapia ABA", "Terapia de choque", "Terapia musical"], correta: 0 },
      { pergunta: "Educação inclusiva visa:", opcoes: ["Separar alunos com deficiência", "Incluir todos na mesma escola", "Privar alunos típicos de atenção"], correta: 1 },
      { pergunta: "Tecnologias assistivas são úteis para:", opcoes: ["Entretenimento", "Apoiar a comunicação", "Exercícios físicos"], correta: 1 },
      { pergunta: "Profissionais devem ser:", opcoes: ["Ignorantes sobre o TEA", "Capacitados sobre o TEA", "Contrários à inclusão"], correta: 1 }
    ]
  },
  avancado: {
    cards: [
      "Genética e TEA",
      "Pesquisas atuais",
      "Neurociência do TEA",
      "Modelos cognitivos",
      "TEA e comorbidades",
      "Inclusão no mercado de trabalho",
      "Avanços em políticas públicas",
      "Intervenções inovadoras",
      "Estudos longitudinais"
    ],
    quiz: [
      { pergunta: "Comorbidades comuns no TEA incluem:", opcoes: ["Asma", "TDAH", "Diabetes"], correta: 1 },
      { pergunta: "Pesquisas em TEA envolvem:", opcoes: ["Astrologia", "Neurociência", "Filosofia"], correta: 1 },
      { pergunta: "Estudos longitudinais acompanham:", opcoes: ["Múltiplas gerações", "Curto prazo", "Ao longo do tempo"], correta: 2 },
      { pergunta: "Inclusão no trabalho requer:", opcoes: ["Preconceito", "Apoio e adaptação", "Exclusão"], correta: 1 }
    ]
  }
};

function mostrarNivel(nivel) {
  const conteudo = conteudos[nivel];
  const container = document.getElementById("conteudo");
  const quizContainer = document.getElementById("quiz");

  container.innerHTML = "<div class='card-grid'>" +
    conteudo.cards.map(texto => "<div class='card'>" + texto + "</div>").join("") +
    "</div>";

  quizContainer.innerHTML = conteudo.quiz.map((q, i) => `
    <div class="pergunta">
      <h3>${q.pergunta}</h3>
      ${q.opcoes.map((op, j) => `<label><input type="radio" name="q${i}" value="${j}"> ${op}</label>`).join("")}
    </div>
  `).join("") + '<button id="testar" onclick="testarRespostas('' + nivel + '')">Testar Conhecimento</button>';
}

function testarRespostas(nivel) {
  const quiz = conteudos[nivel].quiz;
  let acertos = 0;
  quiz.forEach((q, i) => {
    const resposta = document.querySelector(`input[name="q${i}"]:checked`);
    if (resposta && parseInt(resposta.value) === q.correta) acertos++;
  });

  const botao = document.getElementById("testar");
  if (acertos >= 4) {
    botao.innerText = "Avançar de Nível";
  } else {
    alert(`Você acertou ${acertos} de ${quiz.length}.`);
  }
}

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
var currentLocation = window.location.pathname;
let availableQuestions = [];

let questions_content_1 = [
  {
    question: "O problema fundamental com o qual a Economia se preocupa é:",
    choice1: "A pobreza.",
    choice2: "O controle dos bens produzidos.",
    choice3: "A escassez.",
    choice4: "A taxação daqueles que recebem toda e qualquer espécie de renda.",
    choice5: "A estrutura de mercado de uma economia.",
    answer: 3
  },
  {
    question: "Os três problemas econômicos relativos a “o quê”, “como”, e “para quem” produzir existem:",
    choice1: "Apenas nas sociedades de planejamento centralizado.",
    choice2: "Apenas nas sociedades de “livre empresa” ou capitalistas, nas quais o problema da escolha é mais agudo.",
    choice3: "Em todas as sociedades, não importando seu grau de desenvolvimento ou sua forma de organização política.",
    choice4: "Apenas nas sociedades “subdesenvolvidas”, uma vez que desenvolvimento é, em grande parte, enfrentar esses três problemas.",
    choice5: "Todas as respostas anteriores estão corretas.",
    answer: 3
  },
  {
    question: "Em um sistema de livre iniciativa privada, o sistema de preços restabelece a posição de equilíbrio",
    choice1: "Por meio da concorrência entre compradores, quando houver excesso de demanda.",
    choice2: "Por meio da concorrência entre vendedores, quando houver excesso de demanda.",
    choice3: "Por pressões para baixo e para cima nos preços, tais que acabem, respectivamente, com o excesso de demanda e com o excesso de oferta.",
    choice4: "Todas as alternativas anteriores são falsas.",
    choice5: "Por meio de pressões sobre os preços que aumentam a quantidade demandada e diminuem a quantidade ofertada e diminuem a demanda, quando há excesso de demanda.",
    answer: 5
  },
  {
    question: "A “Curva de Possibilidades de Produção” (escassez x realizar escolhas), quando construída para dois bens, mostra:",
    choice1: "Os desejos dos indivíduos perante a produção total desses dois bens.",
    choice2: "A quantidade total produzida desses dois bens em função do emprego total da mão-de-obra.",
    choice3: "A quantidade disponível desses dois bens em função das necessidades dos indivíduos dessa sociedade.",
    choice4: "Quanto se pode produzir dos bens com as quantidades de trabalho, capital e terra existentes e com determinada tecnologia.",
    choice5: "A impossibilidade de atender às necessidades dessa sociedade, visto que os recursos são escassos.",
    answer: 4
  },
  {
    question: "Na Microeconomia, diferentemente das ciências exatas, não é possível:",
    choice1: "Realizar experimentos controlados.",
    choice2: "Formular deduções teóricas sobre algumas variáveis.",
    choice3: "Utilizar modelos para auxiliar na compreensão do relacionamento entre as variáveis econômicas.",
    choice4: "Obter estimativas que se aproximem da realidade.",
    choice5: "Analisar o comportamento do consumidor.",
    answer: 1
  },
  {
    question: "Numa economia mista de mercado, as imperfeições de concorrência podem ser soluciondas pela intervenção de qual agente econômico?",
    choice1: "Estado.",
    choice2: "Empresas.",
    choice3: "Consumidores",
    choice4: "Sindicatos.",
    choice5: "Órgãos internacionais.",
    answer: 1
  },
  {
    question: "Ao conjunto de bens heterogêneos capaz de reproduzir bens e serviços, denominamos:",
    choice1: "Meios de Produção.",
    choice2: "Investimento.",
    choice3: "Alocação eficiente.",
    choice4: "Capital.",
    choice5: "Fronteira de possibilidade de produção.",
    answer: 4
  },
  {
    question: "As curvas de possibilidades de produção mostram:",
    choice1: "A quantidade total de bens existentes na economia.",
    choice2: "Quanto se pode produzir de bens utilizando as quantidades de trabalho",
    choice3: "Quanto se pode produzir de bens utilizando todos os recursos da economia dada uma tecnologia.",
    choice4: "Se há desemprego de recursos.",
    choice5: "Nenhuma das alternativas anteriores.",
    answer: 3
  },
  {
    question: "Qual dos seguintes elementos abaixo não pertence à economia capitalista?",
    choice1: "Moeda.",
    choice2: "Agente planejador.",
    choice3: "Divisão do trabalho.",
    choice4: "Capital.",
    choice5: "Propriedade Privada.",
    answer: 3
  },
  {
    question: "Quanto à produção, uma economia centralizada difere de uma economia capitalista pois:",
    choice1: "A quantidade de bens produzidos é determinada pelo governo e não pelo sistema de preços.",
    choice2: "Os meios de produção são privados.",
    choice3: "Existe livre mobilidade da mão-de-obra.",
    choice4: "Os empresários buscam maximizar o lucro.",
    choice5: "O governo irá incentivar a produção de bens essenciais e supérfluos.",
    answer: 1
  },
  {
    question: "Assinale os fatores mais importantes, que afetam as quantidades procuradas:",
    choice1: "Preço e durabilidade do bem.",
    choice2: "Preço do bem, renda do consumidor, custos de produção.",
    choice3: "Preço do bem, preços dos bens substitutos e complementares, renda e preferência do consumidor.",
    choice4: "Renda do consumidor, custos de produção.",
    choice5: "Preço do bem, preços dos bens substitutos e complementares, custos de produção, preferência dos consumidores.",
    answer: 4
  },
  {
    question: "O leite torna-se mais barato e seu consumo aumenta. Paralelamente, o consumidor diminui sua demanda de chá. Leite e chá são bens:",
    choice1: "Complementares.",
    choice2: "Substitutos.",
    choice3: "Independentes.",
    choice4: "Inferiores.",
    choice5: "De Giffen.",
    answer: 2
  },
  {
    question: "Num dado mercado, a oferta e a procura de um produto são dadas, respectivamente, pelas seguintes equações: Qs = 48 + 10P e Qd =300–8P, onde Qs, Qd e P representam, na ordem, a quantidade ofertada, a quantidade procurada e o preço do produto. A quantidade transacionada nesse mercado, quando ele estiver em equilíbrio, será:",
    choice1: "2 unidades.",
    choice2: "188 unidades.",
    choice3: "252 unidades",
    choice4: "14 unidades.",
    choice5: "100 unidades.",
    answer: 2
  },
  {
    question: "Considerando-se os pontos A(p1,q1) = (12,8) e B(p2,q2) = (14,6), a elasticidade-preço da demanda no ponto médio é igual a:",
    choice1: "–7/13",
    choice2: "+7/13",
    choice3: "–13/7",
    choice4: "+13/7",
    choice5: "N.r.a.",
    answer: 3
  },
  {
    question: "Uma curva de procura exprime-se por p = 10 – 0,2q onde p representa o preço e q a quantidade. O mercado encontra-se em equilíbrio ao preço p = 2. O preço varia para p = 2,04, e, tudo o mais mantido constante, a quantidade equilibra-se em q = 39,8. A elasticidade-preço da demanda ao preço inicial de mercado é:",
    choice1: "0,02",
    choice2: "0,05",
    choice3: "– 0,48",
    choice4: "– 0,25",
    choice5: "0,25",
    answer: 1
  }
];

let questions_content_2 = [
  {
      question: "Questão de Economia 2.0",
      choice1: "1",
      choice2: "2",
      choice3: "3",
      choice4: "4",
      choice5: "5",
      answer: 1
  },
  {
      question: "Questão de Economia 2.1",
      choice1: "1",
      choice2: "2",
      choice3: "3",
      choice4: "4",
      choice5: "5",
      answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
let MAX_QUESTIONS = 0;

//function to determinate the max questions
if(currentLocation == "/study_with_me/project/subjects/economia/content/economia_1.html")
  MAX_QUESTIONS = 15;
else  
  MAX_QUESTIONS = 2;

startGame = () => {
  questionCounter = 0;
  score = 0;
  if(currentLocation == "/study_with_me/project/subjects/economia/content/economia_1.html")
    availableQuestions = [...questions_content_1];
  else
    availableQuestions = [...questions_content_2];
  getNewQuestion();
};

getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/study_with_me/project/end.html");
  }
  questionCounter++;
  progressText.innerText = `Questão ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
const quizForm = document.querySelector('#quizForm');
const btnQuiz = document.querySelector('#btn_quiz');
const btnBackIni = document.querySelector('#btn_back_ini');
const msgModal = document.querySelector('#msg_modal');
const imgModal = document.querySelector('#img_modal');
const exampleModalEl = document.querySelector('#exampleModal');
const bootstrapModal = new bootstrap.Modal(exampleModalEl);

const resultadoDados = (pontuacao) => {
    if (pontuacao <= 8) {
        return {
            texto: 'Seu uso de telas está em um nível mais leve. Continue equilibrando bem o tempo de telas com outras atividades.',
            imagem: './../assets/img/status-baixo.png',
            alt: 'Uso baixo de telas'
        };
    }

    if (pontuacao <= 14) {
        return {
            texto: 'Você usa telas com alguma frequência. Tente reduzir um pouco o tempo de tela e descansar mais os olhos.',
            imagem: './../assets/img/status-medio.png',
            alt: 'Uso médio de telas'
        };
    }

    return {
        texto: 'Seu uso de telas é alto. Procure estabelecer pausas regulares e hábitos mais saudáveis para o descanso.',
        imagem: './../assets/img/status-alto.png',
        alt: 'Uso alto de telas'
    };
};

btnQuiz.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(quizForm);
    let total = 0;
    let temRespostaNaoSelecionada = false;

    formData.forEach((value) => {
        const nota = Number(value);
        if (nota === 0) {
            temRespostaNaoSelecionada = true;
        }
        total += nota;
    });

    if (temRespostaNaoSelecionada) {
        imgModal.style.display = 'none';
        msgModal.className = 'text-warning';
        msgModal.textContent = 'Por favor, responda todas as questões antes de ver o resultado.';
        bootstrapModal.show();
        return;
    }

    const resultado = resultadoDados(total);
    imgModal.src = resultado.imagem;
    imgModal.alt = resultado.alt;
    imgModal.style.display = 'block';

    msgModal.className = 'text-danger';
    msgModal.textContent = `Você atingiu ${total} pontos ao todo. ${resultado.texto}`;
    bootstrapModal.show();

    console.log('Resultado do quiz exibido:', total);
});

btnBackIni.addEventListener('click', () => {
    return window.location.href = './../index.html';
});
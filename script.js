// Captura de elementos do DOM
const nomeFalecidoJapones = document.getElementById('nomeFalecidoJapones');
const periodo = document.getElementById('periodo');
const periodonumeral = document.getElementById('periodonumeral');
const relacao = document.getElementById('relacao');
const nomeFalecido = document.getElementById('nomeFalecido');
const nomeFamilia = document.getElementById('nomeFamilia');
const nomeFamiliaJapones = document.getElementById('nomeFamiliaJapones');

const periodoPreview = document.getElementById('periodoPreview');
const periodoPreviewNumeral = document.getElementById('periodoPreviewNumeral');
const nomeFalecidoPreview = document.getElementById('nomeFalecidoPreview');
const nomeFalecidoJaponesPreview = document.getElementById('nomeFalecidoJaponesPreview');
const nomeFamiliaPreview = document.getElementById('nomeFamiliaPreview');
const nomeFamiliaJaponesPreview = document.getElementById('nomeFamiliaJaponesPreview');
const relacaoPreview = document.getElementById('relacaoPreview');
const previewTexto = document.getElementById('previewTexto');
const ocultarTraducaoBtn = document.getElementById('ocultar-traducao');
const textoFixo = document.getElementById('texto-fixo');
const downloadBtn = document.getElementById('tirar-print');
const downloadDataBtn = document.createElement('button');
downloadDataBtn.textContent = 'Download Dados';
downloadDataBtn.id = 'download-dados';
document.querySelector('.button-group').appendChild(downloadDataBtn);

const downloadWithSignatureBtn = document.createElement('button');
downloadWithSignatureBtn.textContent = 'Download com Assinatura';
downloadWithSignatureBtn.id = 'download-com-assinatura';
document.querySelector('.button-group').appendChild(downloadWithSignatureBtn);

// Torna o texto selecionável
textoFixo.style.userSelect = 'text';

// Atualiza a pré-visualização dinamicamente
function updatePreview() {
  // Sanitização de entradas para evitar injeção de scripts
  const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  periodoPreviewNumeral.textContent = sanitize(periodonumeral.value);
  periodoPreview.textContent = sanitize(periodo.value);
  nomeFalecidoPreview.textContent = sanitize(nomeFalecido.value);
  nomeFalecidoJaponesPreview.textContent = sanitize(nomeFalecidoJapones.value);
  nomeFamiliaPreview.textContent = sanitize(nomeFamilia.value);
  nomeFamiliaJaponesPreview.textContent = sanitize(nomeFamiliaJapones.value);
  relacaoPreview.textContent = sanitize(relacao.value);

  // Habilita o botão de download se todos os campos essenciais estiverem preenchidos
  checkFormCompletion();
}

// Adiciona ouvintes de evento para campos
[nomeFalecido, nomeFalecidoJapones, periodonumeral, periodo, relacao, nomeFamilia, nomeFamiliaJapones].forEach((field) => {
  field.addEventListener('input', updatePreview);
  field.addEventListener('change', updatePreview);
});

// Alterna a visibilidade do texto fixo
ocultarTraducaoBtn.addEventListener('click', function () {
  textoFixo.style.display = textoFixo.style.display === 'none' ? 'block' : 'none';

  // Adiciona feedback visual
  ocultarTraducaoBtn.textContent = textoFixo.style.display === 'none' ? 'Mostrar Texto' : 'Ocultar Texto';
});

// Função para verificar se o formulário está completo
function checkFormCompletion() {
  const isComplete = nomeFalecido.value && periodonumeral.value && nomeFamilia.value;
  downloadBtn.disabled = !isComplete;
  downloadWithSignatureBtn.disabled = !isComplete;
  downloadBtn.title = isComplete ? '' : 'Preencha todos os campos obrigatórios para habilitar o download';
  downloadWithSignatureBtn.title = isComplete ? '' : 'Preencha todos os campos obrigatórios para habilitar o download';
}

// Inicializa o estado do botão de download
checkFormCompletion();

// Função para tirar print e fazer download
downloadBtn.addEventListener('click', function () {
  const previewElement = document.getElementById('preview');

  domtoimage
    .toBlob(previewElement, {
      style: {
        'background-color': '#ffffff', // Fundo branco para a imagem
      },
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.download = 'preview.png';
      link.href = URL.createObjectURL(blob);
      link.click();

      // Feedback visual ao usuário
      alert('Download concluído com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao capturar o print:', error);
      alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
    });
});

// Função para gerar e baixar os dados preenchidos
downloadDataBtn.addEventListener('click', function () {
  const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const data = `
    Nome do Falecido: ${sanitize(nomeFalecido.value)}
    Nome do Falecido (Japonês): ${sanitize(nomeFalecidoJapones.value)}
    Período (Numeral): ${sanitize(periodonumeral.value)}
    Período (Japonês): ${sanitize(periodo.value)}
    Relação: ${sanitize(relacao.value)}
    Nome da Família: ${sanitize(nomeFamilia.value)}
    Nome da Família (Japonês): ${sanitize(nomeFamiliaJapones.value)}
  `;

  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.download = 'dados_formulario.txt';
  link.href = URL.createObjectURL(blob);
  link.click();

  alert('Arquivo de dados baixado com sucesso!');
});

// Função para tirar print com "Assinatura"
downloadWithSignatureBtn.addEventListener('click', function () {
  const previewElement = document.getElementById('preview');

  // Temporariamente altera o texto fixo para incluir a assinatura
  const originalText = textoFixo.innerHTML;
  textoFixo.innerHTML = '<div style="margin-top: 50px;">Assinatura: _______________</div>';

  domtoimage
    .toBlob(previewElement, {
      style: {
        'background-color': '#ffffff', // Fundo branco para a imagem
      },
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.download = 'preview_com_assinatura.png';
      link.href = URL.createObjectURL(blob);
      link.click();

      // Restaura o texto original
      textoFixo.innerHTML = originalText;

      // Feedback visual ao usuário
      alert('Download com assinatura concluído com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao capturar o print:', error);
      alert('Ocorreu um erro ao gerar a imagem com assinatura. Tente novamente.');

      // Restaura o texto original em caso de erro
      textoFixo.innerHTML = originalText;
    });
});
// Captura de elementos do DOM
const nomeFalecidoJapones = document.getElementById('nomeFalecidoJapones');
const periodo = document.getElementById('periodo');
const periodonumeral = document.getElementById('periodonumeral');
const relacao = document.getElementById('relacao');
const nomeFalecido = document.getElementById('nomeFalecido');
const nomeFamilia = document.getElementById('nomeFamilia');
const nomeFamiliaJapones = document.getElementById('nomeFamiliaJapones');

const periodoPreview = document.getElementById('periodoPreview');
const periodoPreviewNumeral = document.getElementById('periodoPreviewNumeral');
const nomeFalecidoPreview = document.getElementById('nomeFalecidoPreview');
const nomeFalecidoJaponesPreview = document.getElementById('nomeFalecidoJaponesPreview');
const nomeFamiliaPreview = document.getElementById('nomeFamiliaPreview');
const nomeFamiliaJaponesPreview = document.getElementById('nomeFamiliaJaponesPreview');
const relacaoPreview = document.getElementById('relacaoPreview');
const previewTexto = document.getElementById('previewTexto');
const ocultarTraducaoBtn = document.getElementById('ocultar-traducao');
const textoFixo = document.getElementById('texto-fixo');
const downloadBtn = document.getElementById('tirar-print');
const downloadDataBtn = document.createElement('button');
downloadDataBtn.textContent = 'Download Dados';
downloadDataBtn.id = 'download-dados';
document.querySelector('.button-group').appendChild(downloadDataBtn);

const downloadWithSignatureBtn = document.createElement('button');
downloadWithSignatureBtn.textContent = 'Download com Assinatura';
downloadWithSignatureBtn.id = 'download-com-assinatura';
document.querySelector('.button-group').appendChild(downloadWithSignatureBtn);

// Torna o texto selecionável
textoFixo.style.userSelect = 'text';

// Atualiza a pré-visualização dinamicamente
function updatePreview() {
  // Sanitização de entradas para evitar injeção de scripts
  const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  periodoPreviewNumeral.textContent = sanitize(periodonumeral.value);
  periodoPreview.textContent = sanitize(periodo.value);
  nomeFalecidoPreview.textContent = sanitize(nomeFalecido.value);
  nomeFalecidoJaponesPreview.textContent = sanitize(nomeFalecidoJapones.value);
  nomeFamiliaPreview.textContent = sanitize(nomeFamilia.value);
  nomeFamiliaJaponesPreview.textContent = sanitize(nomeFamiliaJapones.value);
  relacaoPreview.textContent = sanitize(relacao.value);

  // Atualiza o texto fixo com os valores preenchidos
  textoFixo.innerHTML = `
    Missa de ${sanitize(periodonumeral.value)} (${sanitize(periodo.value)})
    em memória de ${sanitize(nomeFalecido.value)} (${sanitize(nomeFalecidoJapones.value)}).
    Família: ${sanitize(nomeFamilia.value)} (${sanitize(nomeFamiliaJapones.value)}).
    Relação: ${sanitize(relacao.value)}.
  `;

  // Habilita o botão de download se todos os campos essenciais estiverem preenchidos
  checkFormCompletion();
}

// Adiciona ouvintes de evento para campos
[nomeFalecido, nomeFalecidoJapones, periodonumeral, periodo, relacao, nomeFamilia, nomeFamiliaJapones].forEach((field) => {
  field.addEventListener('input', updatePreview);
  field.addEventListener('change', updatePreview);
});

// Alterna a visibilidade do texto fixo
ocultarTraducaoBtn.addEventListener('click', function () {
  textoFixo.style.display = textoFixo.style.display === 'none' ? 'block' : 'none';

  // Adiciona feedback visual
  ocultarTraducaoBtn.textContent = textoFixo.style.display === 'none' ? 'Mostrar Texto' : 'Ocultar Texto';
});

// Função para verificar se o formulário está completo
function checkFormCompletion() {
  const isComplete = nomeFalecido.value && periodonumeral.value && nomeFamilia.value;
  downloadBtn.disabled = !isComplete;
  downloadWithSignatureBtn.disabled = !isComplete;
  downloadBtn.title = isComplete ? '' : 'Preencha todos os campos obrigatórios para habilitar o download';
  downloadWithSignatureBtn.title = isComplete ? '' : 'Preencha todos os campos obrigatórios para habilitar o download';
}

// Inicializa o estado do botão de download
checkFormCompletion();

// Função para tirar print e fazer download
downloadBtn.addEventListener('click', function () {
  const previewElement = document.getElementById('preview');

  domtoimage
    .toBlob(previewElement, {
      style: {
        'background-color': '#ffffff', // Fundo branco para a imagem
      },
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.download = 'preview.png';
      link.href = URL.createObjectURL(blob);
      link.click();

      // Feedback visual ao usuário
      alert('Download concluído com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao capturar o print:', error);
      alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
    });
});

// Função para gerar e baixar os dados preenchidos
downloadDataBtn.addEventListener('click', function () {
  const sanitize = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const data = `
    Nome do Falecido: ${sanitize(nomeFalecido.value)}
    Nome do Falecido (Japonês): ${sanitize(nomeFalecidoJapones.value)}
    Período (Numeral): ${sanitize(periodonumeral.value)}
    Período (Japonês): ${sanitize(periodo.value)}
    Relação: ${sanitize(relacao.value)}
    Nome da Família: ${sanitize(nomeFamilia.value)}
    Nome da Família (Japonês): ${sanitize(nomeFamiliaJapones.value)}
  `;

  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.download = 'dados_formulario.txt';
  link.href = URL.createObjectURL(blob);
  link.click();

  alert('Arquivo de dados baixado com sucesso!');
});

// Função para tirar print com "Assinatura"
downloadWithSignatureBtn.addEventListener('click', function () {
  const previewElement = document.getElementById('preview');

  // Temporariamente altera o texto fixo para incluir a assinatura
  const originalText = textoFixo.innerHTML;
  textoFixo.innerHTML = '<div style="margin-top: 50px;">Assinatura: _______________</div>';

  domtoimage
    .toBlob(previewElement, {
      style: {
        'background-color': '#ffffff', // Fundo branco para a imagem
      },
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.download = 'preview_com_assinatura.png';
      link.href = URL.createObjectURL(blob);
      link.click();

      // Restaura o texto original
      textoFixo.innerHTML = originalText;

      // Feedback visual ao usuário
      alert('Download com assinatura concluído com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao capturar o print:', error);
      alert('Ocorreu um erro ao gerar a imagem com assinatura. Tente novamente.');

      // Restaura o texto original em caso de erro
      textoFixo.innerHTML = originalText;
    });
});

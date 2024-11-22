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

// Adiciona um ouvinte de evento para o botão "Ocultar Tradução"
ocultarTraducaoBtn.addEventListener('click', function () {
  // Alterna a visibilidade do texto
  if (textoFixo.style.display === 'none') {
    textoFixo.style.display = 'block'; // ou o estilo de exibição original
  } else {
    textoFixo.style.display = 'none';
  }
});

function updatePreview() {
  // Atualizar cada bloco separadamente
  periodoPreviewNumeral.textContent = periodonumeral.value;
  periodoPreview.textContent = periodo.value;
  nomeFalecidoPreview.textContent = nomeFalecido.value;
  nomeFalecidoJaponesPreview.textContent = nomeFalecidoJapones.value;
  nomeFamiliaPreview.textContent = nomeFamilia.value;
  nomeFamiliaJaponesPreview.textContent = nomeFamiliaJapones.value;
  relacaoPreview.textContent = relacao.value;
}

// Adiciona ouvintes de evento para cada campo
nomeFalecido.addEventListener('input', updatePreview);
nomeFalecidoJapones.addEventListener('input', updatePreview);
periodonumeral.addEventListener('change', updatePreview);
relacao.addEventListener('change', updatePreview);
nomeFamilia.addEventListener('input', updatePreview);
nomeFamiliaJapones.addEventListener('input', updatePreview);
periodo.addEventListener('change', updatePreview);

// Função para tirar print
document.getElementById('tirar-print').addEventListener('click', function () {
  const previewElement = document.getElementById('preview');

  
  domtoimage
    .toBlob(previewElement, {
      style: {
        'background-color': '#ffffff', // Garante um fundo branco na imagem gerada
      },
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.download = 'preview.png';
      link.href = URL.createObjectURL(blob);
      link.click();
    })
    .catch((error) => {
      console.error('Erro ao capturar o print:', error);
    });
});


document.fonts.ready.then(() => {
    console.log("Todas as fontes foram carregadas com sucesso.");
}).catch((error) => {
    console.error("Erro ao carregar fontes:", error);
});


// Função para baixar o PDF
document.getElementById('download-pdf').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const img = new Image();
  img.src = 'https://i.ibb.co/7XXLP89/Noshigami-Okaeshi-LOGO-NOVO-36-5cm-x-16cm.jpg';

  img.onload = function () {
    const imgWidthMM = 365; // Largura da imagem em milímetros
    const imgHeightMM = 160; // Altura da imagem em milímetros

    const doc = new jsPDF('l', 'mm', [imgWidthMM, imgHeightMM]);
    doc.addImage(img, 'PNG', 0, 0, imgWidthMM, imgHeightMM);

    // Captura o texto fixo
    const textoFixo = document.getElementById('texto-fixo').textContent.trim();
    const periodoPreview = document.getElementById('periodoPreview').textContent.trim();
    const periodoPreviewNumeral = document.getElementById('periodoPreviewNumeral').textContent.trim();
    const nomeFalecidoPreview = document.getElementById('nomeFalecidoPreview').textContent.trim();
    const nomeFamiliaPreview = document.getElementById('nomeFamiliaPreview').textContent.trim();

    // Verificar no console se os textos estão sendo capturados
    console.log('Texto Fixo:', textoFixo);
    console.log('Periodo Preview:', periodoPreview);
    console.log('Periodo Numeral Preview:', periodoPreviewNumeral);
    console.log('Nome Falecido Preview:', nomeFalecidoPreview);
    console.log('Nome Familia Preview:', nomeFamiliaPreview);

    // Posições fixas para teste
    const pdfX = 20; // X em milímetros
    let pdfY = 30; // Y em milímetros, começando abaixo da imagem

    // Configura o tamanho da fonte
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Cor preta

    // Adiciona o texto ao PDF
    doc.text(textoFixo, pdfX, pdfY);
    pdfY += 10; // Ajustar a posição Y para o próximo texto
    doc.text(`${periodoPreview} ${periodoPreviewNumeral}`, pdfX, pdfY);
    pdfY += 10; // Ajustar a posição Y
    doc.text(`${nomeFalecidoPreview}`, pdfX, pdfY);
    pdfY += 10; // Ajustar a posição Y
    doc.text(`${nomeFamiliaPreview}`, pdfX, pdfY);

    // Salva o PDF com o nome desejado
    doc.save('Noshigami.pdf');
  };
});

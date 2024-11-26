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
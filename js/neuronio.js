// Seleciona todas as imagens com a classe 'imagem'
const imagens = document.querySelectorAll('.imagem');

// Seleciona todas as legendas com a classe 'legenda'
const legendas = document.querySelectorAll('.legenda');

// Variável para controlar se uma animação está ativa
let animacaoAtiva = false;

// Variável para controlar qual imagem está com o zoom ativo
let imagemComZoomAtivo = null;

// Itera sobre todas as imagens selecionadas
imagens.forEach((imagem, index) => {
    // Adiciona um ouvinte de evento de clique a cada imagem
    imagem.addEventListener('click', () => {
        // Retorna imediatamente se a animação estiver ativa ou outra imagem estiver com zoom
        if (animacaoAtiva || (imagemComZoomAtivo && imagemComZoomAtivo !== imagem)) {
            return;
        }

        // Define a ordem z-index das imagens para controlar a sobreposição
        imagens.forEach((img, i) => {
            img.style.zIndex = i === index ? 1 : 0;
        });

        // Verifica se a imagem está ampliada (escala 4.2)
        if (imagem.style.transform === 'scale(4.2)') {
            // Reduz a escala da imagem, torna o plano de fundo transparente e oculta a legenda
            imagem.style.transform = 'scale(1)';
            imagem.style.backgroundColor = 'transparent';
            legendas[index].style.display = 'none';

            // Define a imagem com zoom ativo como nula
            imagemComZoomAtivo = null;
        } else {
            // Define a animação como ativa
            animacaoAtiva = true;

            // Amplia a imagem, torna o plano de fundo branco, exibe a legenda e ajusta a ordem z-index
            imagem.style.transform = 'scale(4.2)';
            imagem.style.backgroundColor = 'white';
            legendas[index].style.display = 'block';
            legendas[index].style.zIndex = 2;

            // Define a imagem atual como a imagem com zoom ativo
            imagemComZoomAtivo = imagem;

            // Adiciona o efeito de digitação à legenda
            typeWriter(legendas[index], () => {
                // Define a animação como inativa após a conclusão da digitação
                animacaoAtiva = false;
            });
        }
    });
});

// Função que simula um efeito de digitação em uma legenda
function typeWriter(legendaElement, callback) {
    // Armazena o texto original da legenda
    const legendaTexto = legendaElement.innerHTML;

    // Limpa o conteúdo da legenda
    legendaElement.innerHTML = '';

    // Variável para rastrear a posição atual no texto da legenda
    let i = 0;

    // Define a velocidade de digitação em milissegundos (quanto menor, mais rápido)
    const velocidadeDigitacao = 7; 

    // Função interna para simular a digitação
    function digitar() {
        // Verifica se ainda há caracteres para digitar
        if (i < legendaTexto.length) {
            // Adiciona o próximo caractere ao conteúdo da legenda
            legendaElement.innerHTML += legendaTexto.charAt(i);
            i++;
            // Aguarda um tempo antes de digitar o próximo caractere
            setTimeout(digitar, velocidadeDigitacao);
        } else {
            // Se a digitação estiver concluída, chama a função de retorno de chamada (callback)
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    // Inicia a simulação de digitação
    digitar();
}

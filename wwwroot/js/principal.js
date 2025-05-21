// Arquivo principal.js - Funções comuns para todas as páginas

// Verificar se o navegador suporta localStorage
function suportaLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

// Formatar data para exibição
function formatarData(data) {
    if (!data) return '';
    
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR');
}

// Formatar tempo em segundos para minutos e segundos
function formatarTempo(segundos) {
    if (!segundos) return '0s';
    
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    
    if (minutos === 0) {
        return `${segundosRestantes}s`;
    }
    
    return `${minutos}m ${segundosRestantes}s`;
}

// Verificar se o dispositivo é móvel
function ehDispositivoMovel() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Alternar modo de tela cheia
function alternarTelaCheia() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Erro ao tentar entrar em modo de tela cheia: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Adicionar botão de tela cheia em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    if (ehDispositivoMovel()) {
        const container = document.querySelector('.container');
        
        if (container) {
            const btnTelaCheia = document.createElement('button');
            btnTelaCheia.className = 'btn-tela-cheia';
            btnTelaCheia.innerHTML = '⛶';
            btnTelaCheia.title = 'Alternar tela cheia';
            btnTelaCheia.addEventListener('click', alternarTelaCheia);
            
            container.appendChild(btnTelaCheia);
            
            // Adicionar estilos para o botão
            const estilo = document.createElement('style');
            estilo.textContent = `
                .btn-tela-cheia {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                    font-size: 20px;
                    border: none;
                    cursor: pointer;
                    z-index: 9999;
                }
            `;
            document.head.appendChild(estilo);
        }
    }
});
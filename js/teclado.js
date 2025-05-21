// Teclado virtual com suporte a maiúsculas/minúsculas e números
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do teclado
    const tecladoVirtual = document.getElementById('tecladoVirtual');
    if (!tecladoVirtual) return; // Verificar se o teclado existe na página atual
    
    // Variável para armazenar o campo de entrada ativo
    let campoAtivo = null;
    
    // Variáveis para controlar os modos do teclado
    let modoMaiusculo = true;
    let modoNumeros = false;
    
    // Adicionar botão de maiúsculas/minúsculas
    const linhaTeclado = document.querySelector('.linha-teclado:nth-child(3)');
    if (linhaTeclado && !document.querySelector('.tecla-maiuscula')) {
        const teclaMaiuscula = document.createElement('div');
        teclaMaiuscula.className = 'tecla tecla-maiuscula';
        teclaMaiuscula.textContent = 'Aa';
        teclaMaiuscula.title = 'Alternar maiúsculas/minúsculas';
        
        // Inserir antes do primeiro elemento da terceira linha
        linhaTeclado.insertBefore(teclaMaiuscula, linhaTeclado.firstChild);
    }
    
    // Adicionar botão de números/símbolos
    const ultimaLinha = document.querySelector('.linha-teclado:last-child');
    if (ultimaLinha && !document.querySelector('.tecla-numeros')) {
        const teclaNumeros = document.createElement('div');
        teclaNumeros.className = 'tecla tecla-numeros';
        teclaNumeros.textContent = '123';
        teclaNumeros.title = 'Alternar números/letras';
        
        // Inserir antes do último elemento da última linha
        ultimaLinha.insertBefore(teclaNumeros, ultimaLinha.lastChild);
    }
    
    // Função para alternar entre maiúsculas e minúsculas
    function alternarMaiusculas() {
        if (modoNumeros) return; // Não alternar se estiver no modo números
        
        modoMaiusculo = !modoMaiusculo;
        
        // Obter todas as teclas de letras
        const teclasLetras = Array.from(document.querySelectorAll('.tecla')).filter(tecla => {
            const texto = tecla.textContent;
            return texto.length === 1 && /[a-zA-Z]/.test(texto);
        });
        
        // Alternar entre maiúsculas e minúsculas
        teclasLetras.forEach(tecla => {
            if (modoMaiusculo) {
                tecla.textContent = tecla.textContent.toUpperCase();
            } else {
                tecla.textContent = tecla.textContent.toLowerCase();
            }
        });
    }
    
    // Função para alternar entre letras e números/símbolos
    function alternarNumeros() {
        modoNumeros = !modoNumeros;
        const teclaNumeros = document.querySelector('.tecla-numeros');
        
        if (modoNumeros) {
            // Mudar para modo numérico
            if (teclaNumeros) teclaNumeros.textContent = 'ABC';
            
            // Primeira linha: números
            const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            document.querySelectorAll('.linha-teclado:first-child .tecla').forEach((tecla, index) => {
                if (index < numeros.length) {
                    tecla.textContent = numeros[index];
                    tecla.dataset.original = tecla.textContent; // Guardar valor original
                }
            });
            
            // Segunda linha: símbolos
            const simbolos = ['/', '-', '.', ',', ':', ';', '(', ')', '?', '!'];
            document.querySelectorAll('.linha-teclado:nth-child(2) .tecla').forEach((tecla, index) => {
                if (index < simbolos.length) {
                    tecla.dataset.original = tecla.textContent; // Guardar valor original
                    tecla.textContent = simbolos[index];
                }
            });
            
            // Terceira linha: mais símbolos
            const maisSímbolos = ['@', '#', '$', '%', '&', '*', '+', '=', '"', "'"];
            document.querySelectorAll('.linha-teclado:nth-child(3) .tecla').forEach((tecla, index) => {
                // Pular o botão de maiúsculas
                if (tecla.classList.contains('tecla-maiuscula')) return;
                
                if (index < maisSímbolos.length + 1) {
                    const simboloIndex = index > 0 ? index - 1 : index;
                    if (simboloIndex < maisSímbolos.length) {
                        tecla.dataset.original = tecla.textContent; // Guardar valor original
                        tecla.textContent = maisSímbolos[simboloIndex];
                    }
                }
            });
        } else {
            // Voltar para modo alfabético
            if (teclaNumeros) teclaNumeros.textContent = '123';
            
            // Restaurar primeira linha: números
            const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            document.querySelectorAll('.linha-teclado:first-child .tecla').forEach((tecla, index) => {
                if (index < numeros.length) {
                    tecla.textContent = numeros[index];
                }
            });
            
            // Restaurar segunda linha: letras Q-P
            const letrasLinha2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
            document.querySelectorAll('.linha-teclado:nth-child(2) .tecla').forEach((tecla, index) => {
                if (index < letrasLinha2.length) {
                    tecla.textContent = modoMaiusculo ? letrasLinha2[index] : letrasLinha2[index].toLowerCase();
                }
            });
            
            // Restaurar terceira linha: letras A-Ç
            const letrasLinha3 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'];
            document.querySelectorAll('.linha-teclado:nth-child(3) .tecla').forEach((tecla, index) => {
                // Pular o botão de maiúsculas
                if (tecla.classList.contains('tecla-maiuscula')) return;
                
                if (index < letrasLinha3.length + 1) {
                    const letraIndex = index > 0 ? index - 1 : index;
                    if (letraIndex < letrasLinha3.length) {
                        tecla.textContent = modoMaiusculo ? letrasLinha3[letraIndex] : letrasLinha3[letraIndex].toLowerCase();
                    }
                }
            });
            
            // Restaurar quarta linha: letras Z-M
            const letrasLinha4 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
            document.querySelectorAll('.linha-teclado:nth-child(4) .tecla').forEach((tecla, index) => {
                // Pular botões especiais
                if (tecla.classList.contains('tecla-numeros') || 
                    tecla.classList.contains('tecla-espaco') || 
                    tecla.classList.contains('tecla-apagar')) return;
                
                if (index < letrasLinha4.length) {
                    tecla.textContent = modoMaiusculo ? letrasLinha4[index] : letrasLinha4[index].toLowerCase();
                }
            });
        }
    }
    
    // Função para digitar no campo ativo
    function digitarNoCampo(texto) {
        if (!campoAtivo) return;
        
        if (texto === '⌫') {
            // Backspace - remover último caractere
            campoAtivo.value = campoAtivo.value.slice(0, -1);
        } else if (texto === 'Espaço') {
            // Espaço
            campoAtivo.value += ' ';
        } else if (texto === 'Aa') {
            // Alternar maiúsculas/minúsculas
            alternarMaiusculas();
            return;
        } else if (texto === '123' || texto === 'ABC') {
            // Alternar números/letras
            alternarNumeros();
            return;
        } else {
            // Caractere normal
            campoAtivo.value += texto;
        }
        
        // Disparar evento de input para atualizar validações
        const evento = new Event('input', { bubbles: true });
        campoAtivo.dispatchEvent(evento);
        
        // Focar no input após digitar
        campoAtivo.focus();
    }
    
    // Adicionar evento de clique às teclas
    function configurarEventosTeclas() {
        document.querySelectorAll('.tecla').forEach(tecla => {
            // Remover eventos existentes para evitar duplicação
            tecla.removeEventListener('click', teclaClickHandler);
            // Adicionar novo evento
            tecla.addEventListener('click', teclaClickHandler);
        });
    }
    
    // Função de manipulação de clique nas teclas
    function teclaClickHandler() {
        digitarNoCampo(this.textContent);
    }
    
    // Configurar eventos iniciais
    configurarEventosTeclas();
    
    // Adicionar eventos específicos para teclas de controle
    const teclaMaiuscula = document.querySelector('.tecla-maiuscula');
    if (teclaMaiuscula) {
        teclaMaiuscula.removeEventListener('click', teclaClickHandler);
        teclaMaiuscula.addEventListener('click', function() {
            alternarMaiusculas();
        });
    }
    
    const teclaNumeros = document.querySelector('.tecla-numeros');
    if (teclaNumeros) {
        teclaNumeros.removeEventListener('click', teclaClickHandler);
        teclaNumeros.addEventListener('click', function() {
            alternarNumeros();
        });
    }
    
    // Adicionar evento de foco a todos os campos de entrada
    document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(campo => {
        campo.addEventListener('focus', function() {
            campoAtivo = this;
            console.log('Campo ativo:', this.id || 'sem id');
        });
        
        campo.addEventListener('click', function() {
            campoAtivo = this;
            console.log('Campo ativo (clique):', this.id || 'sem id');
        });
    });
    
    // Mostrar/ocultar teclado virtual
    document.querySelectorAll('.alternar-teclado').forEach(botao => {
        botao.addEventListener('click', function() {
            const teclado = document.getElementById('tecladoVirtual');
            if (teclado) {
                teclado.style.display = teclado.style.display === 'none' || teclado.style.display === '' ? 'block' : 'none';
                
                // Se o teclado for exibido, focar no campo associado
                if (teclado.style.display === 'block') {
                    const campoAssociado = this.parentElement.querySelector('input, textarea');
                    if (campoAssociado) {
                        campoAssociado.focus();
                        campoAtivo = campoAssociado;
                        console.log('Campo ativado pelo botão:', campoAtivo.id || 'sem id');
                    }
                }
            }
        });
    });
    
    // Inicializar com letras maiúsculas (padrão)
    modoMaiusculo = true;
});
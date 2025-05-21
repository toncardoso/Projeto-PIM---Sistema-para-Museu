// URL base da API
const API_BASE_URL = 'https://localhost:7191/api';

// Obter estatísticas do painel
async function obterEstatisticasPainel() {
    const resposta = await fetch(`${API_BASE_URL}/Estatisticas`); // PascalCase
    if (!resposta.ok) throw new Error('Erro ao obter estatísticas');
    return resposta.json();
}

// Obter lista de visitantes
async function obterVisitantes() {
    const resposta = await fetch(`${API_BASE_URL}/Visitantes`); // PascalCase
    if (!resposta.ok) throw new Error('Erro ao obter visitantes');
    return resposta.json();
}

// Obter lista de exposições
async function obterExposicoes() {
    const resposta = await fetch(`${API_BASE_URL}/Exposicoes`); // PascalCase
    if (!resposta.ok) throw new Error('Erro ao obter exposições');
    return resposta.json();
}

// Registrar um novo visitante
async function registrarVisitante(dadosVisitante) {
    const resposta = await fetch(`${API_BASE_URL}/Visitantes`, { // PascalCase
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosVisitante)
    });
    if (!resposta.ok) throw new Error('Erro ao registrar visitante');
    return resposta.json();
}

// Registrar visita a uma exposição
async function registrarVisitaExposicao(idVisitante, idExposicao, duracaoSegundos) {
    const resposta = await fetch(`${API_BASE_URL}/VisitasExposicao`, { // PascalCase
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idVisitante,
            idExposicao,
            duracaoSegundos
        })
    });
    if (!resposta.ok) throw new Error('Erro ao registrar visita');
    return resposta.json();
}

// Registrar pesquisa de satisfação
async function registrarPesquisa(dadosPesquisa) {
    const resposta = await fetch(`${API_BASE_URL}/Pesquisas`, { // PascalCase
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPesquisa)
    });
    if (!resposta.ok) throw new Error('Erro ao registrar pesquisa');
    return resposta.json();
}

// Gerar relatório
async function gerarRelatorio() {
    const resposta = await fetch(`${API_BASE_URL}/Relatorios/Completo`); 
    if (!resposta.ok) throw new Error('Erro ao gerar relatório');
    return resposta.json();
}
/**
 * Função para fazer requisições à API.
 * @param {String} endpoint - O endpoint da API para o qual fazer a requisição.
 * @param {RequestInit} [init] - Opções adicionais para a requisição (como método, cabeçalhos, corpo).
 * @returns {Promise<Response>} - Retorna a resposta da requisição.
 */
export function api(endpoint, init = {}) {
    const url = `http://localhost:3333${endpoint}`;
    
    return fetch(url, init)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }
            return response;
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            throw error;
        });
}
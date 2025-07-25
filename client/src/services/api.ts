const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
    throw new Error('A variável de ambiente REACT_APP_API_URL não está definida. Verifique seus arquivos .env');
}

export default API_URL;
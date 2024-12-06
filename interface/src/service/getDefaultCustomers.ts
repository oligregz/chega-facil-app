import axios from 'axios';

export async function getDefaultCustomers() {
  try {
    const response = await axios.get('http://localhost:8080/customers');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}


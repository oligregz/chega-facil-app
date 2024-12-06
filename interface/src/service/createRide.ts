import axios from 'axios';

export async function createRide(body: unknown) {
  try {
    const response = await axios.patch('http://localhost:8080/ride/confirm', body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}


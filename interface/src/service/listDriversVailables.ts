import axios from 'axios';

export async function listDriversDefault(body: unknown) {
  try {
    console.log(body)
    const response = await axios.post('http://localhost:8080/ride/estimate', body);
    console.log(response)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição:', error.response?.data || error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}


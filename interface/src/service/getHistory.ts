import axios from 'axios';

export async function getHistory(customerId: string | undefined, driverId: string | undefined = '') {
  try {
    const response = await axios.get(`http://localhost:8080/ride/${customerId}?driver_id=${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Erro desconhecido:', error);
    if (axios.isAxiosError(error)) {
      return error.response?.data
    } else {
      console.error('Erro desconhecido:', error);
      return error
    }
  }
}

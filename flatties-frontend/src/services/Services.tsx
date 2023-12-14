import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
}

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Throw error if API call takes longer than 10 seconds
});

export default {
  getUsers() {
    return apiClient
        .get('/users')
        .then(({ data }) => {
          console.log('data ', data);
          return data;
        });
  },
  getUser(id) {
    return apiClient.get('/users/' + id);
  },
  postUser(user) {
    return apiClient.post('/users', user);
  }
};

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.37:3000'
});


api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "REQUEST:",
    config.method?.toUpperCase(),
    config.url
  );

  return config;
});


api.interceptors.response.use(

  (response) => {

    console.log(
      "RESPONSE OK:",
      response.status,
      response.config.url,
      response.data
    );

    return response;
  },


  (error) => {

    console.error(
      "RESPONSE ERROR:",
      error.response?.status,
      error.response?.data,
      error.config?.url
    );

    return Promise.reject(error);
  }

);
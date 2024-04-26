import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-local.cosmo-sns.com',
  withCredentials: true,
});

export default instance;

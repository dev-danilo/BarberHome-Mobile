import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333', /** Android Studio */
  // baseURL: 'http://192.168.0.108:3333' /** USB */,
  /* baseURL: 'http://localhost:3333', /** MAC */
});

export default api;

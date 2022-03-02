import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333' /** Android Studio */,
  //baseURL: 'http://192.168.0.115:3333',
  /** USB  OBS: caso for Wi-fi,
   * deve colocar IP da maquina que esta desenvolvendo */
  //baseURL: 'http://localhost:3333', /** MAC */
});

export default api;

import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
  // ? Android Studio */
  // * baseURL: 'http://192.168.0.115:3333',
  // ? USB  OBS: caso for Wi-fi, e deve colocar IP da maquina que esta desenvolvendo
  // * baseURL: 'http://localhost:3333', /** MAC */
});

export default api;

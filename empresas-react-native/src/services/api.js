import axios from 'axios';

export const baseURL = 'https://empresas.ioasys.com.br'

const api = axios.create({
  baseURL,
});

export function addInterceptor(res) {
  api.defaults.headers['access-token'] = res['access-token'];
  api.defaults.headers['client'] = res['client'];
  api.defaults.headers['uid'] = res['uid'];
}

export function removeInterceptor() {
  api.defaults.headers.common['access-token'] = undefined;
  api.defaults.headers.common['client'] = undefined;
  api.defaults.headers.common['uid'] = undefined;
}

export default api;
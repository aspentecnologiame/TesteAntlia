import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  urlApi: 'http://localhost:5289/api/',
  apiVersion: 'v1/'
};

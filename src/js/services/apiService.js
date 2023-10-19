//класс с набором методов для взаимодействия с сервером

//импортируем модули
import axios from 'axios'; //плагин для работы с APi
import config from '../config/apiConfig';

/**
 * Эндпоинты на сервисе:
 * /countries - массив поддерживаемых стран (array of)
 * /cities - array of cities
 * /prices/cheap - array of flights
 */
class Api {
  constructor(config) {
    this.url = config.url;
  }

  //Методы
  async countries() {
    try{
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch(err){
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try{
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch(err){
      console.log(err);
      return Promise.reject(err);
    }
  }
  async airlines() {
    try{
      const response = await axios.get(`${this.url}/airlines`);
      return response.data;
    } catch(err){
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    try{
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch(err){
      console.log(err);
      return Promise.reject(err);
    }
  }
}

//Создаем объект класса
const api = new Api(config);

//Экспортируем API
export default api;
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class UserService {
  getPublicContent() {
    /*--------Fake----------*/
    return new Promise(r => r({ data: "Página de Inicio"}));
    /*----------------------*/

    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    /*--------Fake----------*/
    return new Promise(r => r({data: "I am a user"}));
    /*----------------------*/
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    /*--------Fake----------*/
    return new Promise(r => r({data: "I am a moderator"}));
    /*----------------------*/
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    /*--------Fake----------*/
    return new Promise(r => r({data: "I am an admin"}));
    /*----------------------*/
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }


  register(data) {
    // /*------Fake---------*/
    // return new Promise(r => r({
    //   data: {
    //     message: "SUCCESS"
    //   }
    // }));
    // /*-------------------*/
    return axios.post(API_URL + "users", data);
  }
}

export default new UserService();

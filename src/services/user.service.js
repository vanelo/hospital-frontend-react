import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/profile/';//'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    /*--------Fake----------*/
    return new Promise(r => r({ data: "Public content"}));
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
}

export default new UserService();

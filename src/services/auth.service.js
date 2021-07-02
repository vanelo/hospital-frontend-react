import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  login(username, password) {
    /*------Fake---------*/
    // const user = {
    //   userId: 1,
    //   username: "vanelo",
    //   roles: ["DOCTOR", "PATIENT"],
    //   accessToken: "54sadf4564sda8sfd"
    // }
    // localStorage.setItem("user", JSON.stringify(user));
    // return new Promise(r => r(user));
    /*-------------------*/
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    // /*------Fake---------*/
    // return {
    //   roles: ["DOCTOR", "PATIENT"],
    //   username: "vanelo",
    //   accessToken: "54sadf4564sda8sfd"
    // }
    // /*-------------------*/
    return JSON.parse(localStorage.getItem("user"));
  }

  getProfile(){
      return axios.get(API_URL + "profile", { headers: authHeader() });
  }
}

export default new AuthService();

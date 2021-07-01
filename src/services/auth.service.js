import axios from "axios";

const API_URL = "http://localhost:3000/auth/login";//"http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    /*------Fake---------*/
    const user = {
      username: "vanelo",
      roles: ["ROLE_MODERATOR"],
      accessToken: "54sadf4564sda8sfd"
    }
    localStorage.setItem("user", JSON.stringify(user));
    return new Promise(r => r(user));
    /*-------------------*/
    return axios
      .post(API_URL + "signin", {
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

  register(username, email, password) {
    /*------Fake---------*/
    return new Promise(r => r({
      data: {
        message: "SUCCESS"
      }
    }));
    /*-------------------*/
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    /*------Fake---------*/
    return {
      roles: ["ROLE_MODERATOR"],
      username: "vanelo",
      accessToken: "54sadf4564sda8sfd"
    }
    /*-------------------*/
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./hospital_logo.png";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardPatient from "./components/board-patient.component";
import BoardDoctor from "./components/board-doctor.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      showPatientBoard: false,
      showDoctorBoard: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user && user.roles) {
      this.setState({
        currentUser: user,
        showPatientBoard: user.roles.includes("PATIENT"),
        showDoctorBoard: user.roles.includes("DOCTOR"),
      });
    }
  }

  logout() {
    AuthService.logout();
    this.setState({ currentUser: null });
  }

  render() {
    const { currentUser, showPatientBoard, showDoctorBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            <img style={{width: "30pt", marginRight: "4pt"}} src={logo} alt="logo"/>
            Hospital app
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Inicio
              </Link>
            </li> */}

            {showPatientBoard && (
              <li className="nav-item">
                <Link to={"/patient"} className="nav-link">
                  Página paciente
                </Link>
              </li>
            )}

            {showDoctorBoard && (
              <li className="nav-item">
                <Link to={"/doctor"} className="nav-link">
                  Página doctor
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Mi perfil
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logout}>
                  Cerrar Sesion
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registrarme
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/patient" component={BoardPatient} />
            <Route path="/doctor" component={BoardDoctor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

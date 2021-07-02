import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import * as utilities from "../utilities";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });

    // Get profile info
    AuthService.getProfile().then(
      response=>{
        this.setState({currentUser: response.data, userReady: true});
      }, err=>{
        console.log(err)
        this.setState({currentUser: {}, userReady: true});
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    return (
      <div className="container">
        {(this.state.userReady) &&
        <div>
        <header className="jumbotron">
          <h3>
            Perfil de <strong>{currentUser.username}</strong>
          </h3>
        </header>
        <div className="container col-md-8">
          <p className="row">
            <div className="col"><strong>{utilities.translate("firstName")}:</strong></div>
            <div className="col">{currentUser.firstName || ""}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("lastName")}:</strong></div>
            <div className="col">{currentUser.lastName || ""}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("dni")}:</strong></div>
            <div className="col">{currentUser.dni || ""}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("email")}:</strong></div>
            <div className="col">{currentUser.email || ""}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("phone")}:</strong></div>
            <div className="col">{currentUser.phone || ""}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("sex")}:</strong></div>
            <div className="col">{utilities.getSexName(currentUser.sex)}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("birthdate")}:</strong></div>
            <div className="col">{utilities.getFormattedDate(currentUser.birthdate)}</div>
          </p>
          <p className="row">
            <div className="col"><strong>{utilities.translate("address")}:</strong></div>
            <div className="col">{currentUser.address || ""}</div>
          </p>
          {currentUser.profesionalRegisterNumber && 
            (<p className="row">
              <div className="col"><strong>{utilities.translate("profesionalRegisterNumber")}:</strong></div>
              <div className="col">{currentUser.profesionalRegisterNumber || ""}</div>
            </p>)
          }

          <p className="row">
            <div className="col"><strong>{utilities.translate("roles")}:</strong></div>
            <div className="col"><ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul></div>
          </p>
        </div>
      </div>
      }
    </div>
    );
  }
}

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import UserService from "../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo requerido!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        No es un email valido.
      </div>
    );
  }
};

const vinfo = value => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        De tener entre 5 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 8 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Debe tener entre 8 y 40 caracteres.
      </div>
    );
  }
};

const vdate = value => {
  try {
    new Date(value);
  }catch(e){
    return (
      <div className="alert alert-danger" role="alert">
        Debe ser una fecha valida.
      </div>
    );
  }
};

const vsex = value => {
  if (!(value*1 >= 0 || value*1 <= 2)) {
    return (
      <div className="alert alert-danger" role="alert">
        Debes elegir un sexo.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeDni = this.onChangeDni.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeProfesionalRegisterNumber = this.onChangeProfesionalRegisterNumber.bind(this);

    this.state = {
      username: "",
      password: "",
      email: "",
      sex: 1,
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeDni(e) {
    this.setState({
      dni: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeBirthdate(e) {
    this.setState({
      birthdate: e.target.value
    });
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    });
  }

  onChangeProfesionalRegisterNumber(e) {
    this.setState({
      profesionalRegisterNumber: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      const data = {};
      if(this.state.username) data.username = this.state.username;
      if(this.state.password) data.password = this.state.password;
      if(this.state.email) data.email = this.state.email;
      if(this.state.firstName) data.firstName = this.state.firstName;
      if(this.state.lastName) data.lastName = this.state.lastName;
      if(this.state.dni) data.dni = this.state.dni;
      if(this.state.phone) data.phone = this.state.phone;
      if(this.state.address) data.address = this.state.address;
      if(this.state.birthdate) data.birthdate = this.state.birthdate;
      if(this.state.sex) data.sex = this.state.sex*1;
      if(this.state.profesionalRegisterNumber) data.profesionalRegisterNumber = this.state.profesionalRegisterNumber;

      UserService.register(data).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Apellido</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dni">Cédula</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="dni"
                    value={this.state.dni}
                    onChange={this.onChangeDni}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Dirección</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required, vinfo]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthdate">Fecha de nacimiento</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="birthdate"
                    min="1800-01-01"
                    max="2022-01-01"
                    value={this.state.birthdate}
                    onChange={this.onChangeBirthdate}
                    validations={[required, vdate]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sex">Sexo</label>
                  <Select
                    className="form-control"
                    name="sex"
                    value={this.state.sex}
                    onChange={this.onChangeSex}
                    validations={[required, vsex]}>
                      <option value="2">Femenino</option>
                      <option value="1">Masculino</option>
                      <option value="0">Otro</option>
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="profesionalRegisterNumber">Nº registro Profesional</label>
                  <label style={{fontSize: "8pt", marginTop:"0"}}>Requerido para validarte en caso de que seas doctor</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="profesionalRegisterNumber"
                    value={this.state.profesionalRegisterNumber}
                    onChange={this.onChangeProfesionalRegisterNumber}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Registrar</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

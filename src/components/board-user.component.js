import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
// Services
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Página de usuarios",
      users: {
        limit: 10,
        data: [],
        ready: false
      },
    };
  }

  componentDidMount() {
    UserService.getAll(this.state.id).then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <h3>Todas tus consultas</h3>
        <div style={{width: "100%", height: "330pt"}}>
          <DataGrid
            onRowSelected={console.log}
            rows={this.state.users.data}
            columns={[
              {field: "id", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "username", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "firstName", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "lastName", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "dni", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "email", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "phone", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "sex", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "birthdate", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "address", headerAlign: "center", headerClassName: "grid-header", width: 150},
              {field: "profesionalRegisterNumber", headerAlign: "center", headerClassName: "grid-header", width: 150},
            ]}
            pageSize={this.state.users.limit} />
        </div>
      </div>
    );
  }
}

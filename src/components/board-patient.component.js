import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";

// Services
import ConsultationService from "../services/consultation.service";
import ExamService from "../services/exam.service";
import AuthService from "../services/auth.service";

export default class BoardPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Página paciente",
      consultations: {
        limit: 10,
        data: [],
        ready: false
      },
      exams: {
        limit: 10,
        data: []
      }
    };
  }

  componentDidMount() {
    // Get current user
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.userId) this.setState({ redirect: "/home" });

    // Get consultations
    ConsultationService.getAll(currentUser.userId).then(
      response => {
        this.setState({
          consultations: response.data
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
    // Get exams
    ExamService.getAll(currentUser.userId).then(
      response => {
        this.setState({
          exams: response.data
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
      });
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
            rows={this.state.consultations.data}
            columns={[
              {field: "id", headerAlign: "center", headerClassName: "grid-header"},
              {field: "name", headerAlign: "center", headerClassName: "grid-header"},
              {field: "startDate", headerAlign: "center", headerClassName: "grid-header"},
              {field: "endDate", headerAlign: "center", headerClassName: "grid-header"},
              {field: "diagnosis", headerAlign: "center", headerClassName: "grid-header"},
              {field: "recomendations", headerAlign: "center", headerClassName: "grid-header"}]}
            pageSize={this.state.consultations.limit} />
        </div>
        <br/>
        <h3>Todos tus examenes</h3>
        <div style={{width: "100%", height: "330pt"}}>
          <DataGrid
            rows={this.state.exams.data}
            columns={[{field: "id"}, {field: "name"}, {field: "type"}, {field: "startDate"}, {field: "endDate"}, {field: "results"}]}
            pageSize={this.state.exams.limit} />
        </div>
      </div>
    );
  }
}

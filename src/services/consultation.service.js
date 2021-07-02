import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:3000/consultations";

class ConsultationService {
  getAll(patientId, doctorId) {
    let url = API_URL;
    if(patientId || doctorId){
        url += "?";
        if(patientId) url += `patientId=${patientId}&`;
        if(doctorId) url += `doctorId=${doctorId}`;
    }
    return axios.get(url, { headers: authHeader() });
  }

  getOne(id) {
    return axios.get( API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new ConsultationService();
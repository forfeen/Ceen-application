import baseURL from '../../api/http-common';
import covidURl from '../../api/covid-http';
import vaccinationUrl from '../../api/vaccination-http';
import Vaccine from '../../types/vaccine.type';
import VaccinationData from '../../types/vaccination.type';
import Covid from '../../types/covid.type';
import axios, {AxiosResponse} from 'axios';

class VaccineDataService {

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

    getVaccine(id) {
        return axios.get<Vaccine>(baseURL + '/vaccines/' + id);
    }

    getReview(id) {
        return axios.get<Vaccine>(baseURL + '/reviews/'+ id);
    }

    getQuestion(id) {
        return axios.get<Vaccine>(baseURL + '/questions/'+ id);
    }

    getPost(id) {
        return axios.get<Vaccine>(baseURL + '/timelines/'+ id);
    }

    getCovidCase() {
        return axios.get<Covid>(covidURl);
    }

    getVaccinationFullData() {
        return axios.get<VaccinationData>(vaccinationUrl);
    }

    createQuestion(id, data) {
        return axios.post<Vaccine>(baseURL + '/questions/'+ id, data);
    }

    createPost(id, data) {
        return axios.post<Vaccine>(baseURL + '/timelines/'+ id, data);
    }

    createReview(id, data) {
        return axios.post<Vaccine>(baseURL + '/reviews/'+ id, data);
    }

}

export default new VaccineDataService;
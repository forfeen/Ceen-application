import baseURL from '../../api/http-common';
import Vaccine from '../../types/vaccine.type';
import axios, {AxiosResponse} from 'axios';

class VaccineDataService {

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

    getVaccine(id) {
        return axios.get<Vaccine>(baseURL + '/vaccines/' + id);
    }

    getReview(id) {
        return axios.get<Vaccine>(baseURL + '/reviews/'+id);
    }

    getQuestion(id) {
        return axios.get<Vaccine>(baseURL + '/questions/'+id);
    }

    getPost(id) {
        return axios.get<Vaccine>(baseURL + '/timelines/'+id);
    }

}

export default new VaccineDataService;
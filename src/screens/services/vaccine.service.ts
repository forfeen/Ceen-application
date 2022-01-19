import baseURL from '../../api/http-common';
import Vaccine from '../../types/vaccine.type';
import axios, {AxiosResponse} from 'axios';

class VaccineDataService {

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

    getVaccine() {

    }

}

export default new VaccineDataService;
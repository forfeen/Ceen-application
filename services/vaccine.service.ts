import baseURL from '../api/http-common';
import Vaccine from '../types/vaccine.type';
import axios, {AxiosResponse} from 'axios';

class VaccineDataService {
    // const baseURL: "https://script.google.com/macros/s/AKfycbz0hrrWRf9Iov2bHOnzXN6DPsGNVaDVNvQUhEND_NNWs4GwuGAkjWEv4P8Vj9tXUXg/exec?path";

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

}

export default new VaccineDataService;
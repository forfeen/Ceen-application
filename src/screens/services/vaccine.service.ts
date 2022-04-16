import baseURL from '../../api/http-common';
import covidURl from '../../api/covid-http';
import Vaccine from '../../types/vaccine.type';
import VaccinationData from '../../types/vaccination.type';
import vacLocationsURL from '../../api/vac-locations';
import Covid from '../../types/covid.type';
import axios from 'axios';
import Question from '../../types/questions.type';
import Post from '../../types/posts.type';
import Review from '../../types/reviews.type';
import Answer from '../../types/answer.type';
import Locations from '../../types/locations.type';

class VaccineDataService {

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

    getVaccine(id) {
        return axios.get<Vaccine>(baseURL + '/vaccines/' + id);
    }

    getReview(id) {
        return axios.get<Review>(baseURL + '/reviews/'+ id);
    }

    getQuestion(id) {
        return axios.get<Question>(baseURL + '/questions/'+ id);
    }

    getPost(id) {
        return axios.get<Post>(baseURL + '/timelines/'+ id);
    }

    getAnswer(id) {
        return axios.get<Vaccine>(baseURL + '/answers/'+id);
    }

    getCovidCase() {
        return axios.get<Covid>(covidURl);
    }

    getVaccinationData() {
        return axios.get<VaccinationData>(baseURL + '/vaccination');
    }

    getLocations() {
        return axios.get<Locations>(vacLocationsURL
            , {
            headers: { 
                "Content-Type": "application/json",
                "X-CLIENT-ID": process.env.X_CLIENT_ID,
                "X-CLIENT-SECRET": process.env.X_CLIENT_SECRET
            }
        });
    }

    // getVaccinationFullData() {
    //     return axios.get<VaccinationData>(vaccinationUrl);
    // }
    createQuestion(id, data) {
        return axios.post<Question>(baseURL + '/questions/'+ id, data);
    }

    createPost(id, data) {
        return axios.post<Post>(baseURL + '/timelines/'+ id, data);
    }

    createReview(id, data) {
        return axios.post<Review>(baseURL + '/reviews/'+ id, data);
    }

    createAnswer(id, data) {
        return axios.post<Answer>(baseURL + '/answers/'+ id, data);
    }

    likeReview(id, data) {
        return axios.post<Review>(baseURL + '/reviews/'+ id + '&method=PUT' , data);
    }

    likePost(id, data) {
        return axios.post<Post>(baseURL + '/timelines/'+ id + '&method=PUT' , data);
    }

    likeQuestion(id, data) {
        return axios.post<Question>(baseURL + '/questions/'+ id + '&method=PUT' , data);
    }

    likeAnswer(id, data) {
        return axios.post<Answer>(baseURL + '/answers/'+ id + '&method=PUT' , data);
    }

    getEachQuestion(vaccineId, questionId) {
        return axios.get<Question>(baseURL + '/questions/'+ vaccineId + '/' + questionId);
    }

}

export default new VaccineDataService;
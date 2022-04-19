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
import Comment from '../../types/comment.type';

class VaccineDataService {

    getAllVaccine() {    
        return axios.get<Vaccine[]>(baseURL + '/vaccines');
    }

    getVaccine(vaccineId) {
        return axios.get<Vaccine>(baseURL + '/vaccines/' + vaccineId);
    }

    getReview(vaccineId) {
        return axios.get<Review>(baseURL + '/reviews/'+ vaccineId);
    }

    getQuestion(vaccineId) {
        return axios.get<Question>(baseURL + '/questions/'+ vaccineId);
    }

    getPost(vaccineId) {
        return axios.get<Post>(baseURL + '/timelines/'+ vaccineId);
    }

    getAnswer(vaccineId) {
        return axios.get<Vaccine>(baseURL + '/answers/'+ vaccineId);
    }

    getEachQuestion(vaccineId, questionId) {
        return axios.get<Question>(baseURL + '/questions/'+ vaccineId + '/' + questionId);
    }

    getEachPost(vaccineId, postId) {
        return axios.get<Post>(baseURL + '/timelines/'+ vaccineId + '/' + postId);
    }

    getComment(vaccineId) {
        return axios.get<Comment>(baseURL + '/comments/'+ vaccineId);
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
    createQuestion(vaccineId, data) {
        return axios.post<Question>(baseURL + '/questions/'+ vaccineId, data);
    }

    createPost(vaccineId, data) {
        return axios.post<Post>(baseURL + '/timelines/'+ vaccineId, data);
    }

    createReview(vaccineId, data) {
        return axios.post<Review>(baseURL + '/reviews/'+ vaccineId, data);
    }

    createAnswer(vaccineId, data) {
        return axios.post<Answer>(baseURL + '/answers/'+ vaccineId, data);
    }

    likeReview(vaccineId, data) {
        return axios.post<Review>(baseURL + '/reviews/'+ vaccineId + '&method=PUT' , data);
    }

    likePost(vaccineId, data) {
        return axios.post<Post>(baseURL + '/timelines/'+ vaccineId + '&method=PUT' , data);
    }

    likeQuestion(vaccineId, data) {
        return axios.post<Question>(baseURL + '/questions/'+ vaccineId + '&method=PUT' , data);
    }

    likeAnswer(vaccineId, data) {
        return axios.post<Answer>(baseURL + '/answers/'+ vaccineId + '&method=PUT' , data);
    }

    likeComment(vaccineId, data) {
        return axios.post<Comment>(baseURL + '/comments/'+ vaccineId + '&method=PUT' , data);
    }

    deleteReviews(id, reviewId) {
        return axios.post<Review>(baseURL + '/reviews/'+ id + '/' + reviewId + '&method=DELETE');
    }

    deleteQuestion(id, questionId) {
        return axios.post<Question>(baseURL + '/questions/'+ id + '/' + questionId + '&method=DELETE');
    }

    deleteAnswer(id, answerId) {
        return axios.post<Answer>(baseURL + '/answers/'+ id + '/' + answerId + '&method=DELETE');
    }

    deletePost(id, postId) {
        return axios.post<Post>(baseURL + '/timelines/'+ id + '/' + postId + '&method=DELETE');
    }

    deleteComment(id, commentId) {
        return axios.post<Comment>(baseURL + '/comments/'+ id + '/' + commentId + '&method=DELETE');
    }

}

export default new VaccineDataService;
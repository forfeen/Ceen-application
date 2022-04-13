import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbx0A-iJkhpbLp77-Qela_20lKAcATv5evGvPEme1lMOjl_FuYzg0S6N0qRhwdt6L_y3/exec?path='
});

export default baseURL.defaults.url;

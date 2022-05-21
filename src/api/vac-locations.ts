import axios from "axios";
import baseURL from '../api/http-common';

const vacLocationsURL = axios.create({
	// status: available = 0
	// url: 'https://jitasa.care/api/v2/places?type=6&status=0'
	url: baseURL+'/medical-centers&limit=3896&offset=0'
});

export default vacLocationsURL.defaults.url;
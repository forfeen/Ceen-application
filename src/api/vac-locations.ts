import axios from "axios";

const vacLocationsURL = axios.create({
	// status: available = 0
	url: 'https://jitasa.care/api/v2/places?type=6&status=0'
});

export default vacLocationsURL.defaults.url;
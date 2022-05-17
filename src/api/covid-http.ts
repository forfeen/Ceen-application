import axios from "axios";

const covidURL = axios.create({
	url: 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all',
});

export default covidURL.defaults.url;
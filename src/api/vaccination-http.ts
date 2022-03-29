import axios from "axios";

const vaccinationUrl = axios.create({
	url: 'https://disease.sh/v3/covid-19/vaccine/coverage/countries/TH?lastdays=11&fullData=true',
});

export default vaccinationUrl.defaults.url;



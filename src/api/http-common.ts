import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbwMu1Y_iUwcko2M2MfDwFKozhNJ0qPeaK9CfI1oLqHmipL7PkcXU5h4B0mdKlfetyj0/exec?path='
});

export default baseURL.defaults.url;



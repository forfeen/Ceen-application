import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbykWBeF49yEeuUFExw1IC6cLzUNbop5s1TTp_YGL3AwXpb5Q-tXI-nKszJ_w5dgufzu/exec?path='
});

export default baseURL.defaults.url;



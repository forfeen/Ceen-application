import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbxIZBd1N4Ln-ChiXiq7ASK_Ilk5BP13vJu56NyboDPuGl0XI8FffRMWOlM3SJZzQ8e3/exec?path='
});

export default baseURL.defaults.url;



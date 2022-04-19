import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbxbeeK5D_Iwq0SzbN49v0nY9hDnVj7ekBk5BJHRgEjugOiNLTcRLF6YfuKNC7BjXhNI/exec?path='
});

export default baseURL.defaults.url;

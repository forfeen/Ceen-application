import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbz0hrrWRf9Iov2bHOnzXN6DPsGNVaDVNvQUhEND_NNWs4GwuGAkjWEv4P8Vj9tXUXg/exec?path='
});

export default baseURL.defaults.url;



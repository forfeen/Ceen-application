import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbwMTbzXFTgwl1AqS4PT-ndqp4rH_wpPoCXk3KgfYKuYUmaOUEh44pclRNdYMfWj24ns/exec?path='
});

export default baseURL.defaults.url;

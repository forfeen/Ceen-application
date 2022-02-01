import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbyanfSOouivmaWxJQg1d1r1D49qW5-TPEdDZyTivC4TiBqahdxrep0HRExJ9FFo0IX2/exec?path='
});

export default baseURL.defaults.url;



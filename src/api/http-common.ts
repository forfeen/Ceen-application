import axios from "axios";

const baseURL = axios.create({
	url: 'https://script.google.com/macros/s/AKfycbxOSGQRaO7rJEn-noX0Jf0hLZGcfYvMzH5ozbzp_EaZklOZrMZzb5jtADOa3uV5Oi-Y/exec?path='
});

export default baseURL.defaults.url;

import axios from "axios";
const base_api_url = "http://127.0.0.1:8000/api/v1";

export default {
    setUrlShort: (url) => axios.post(`${base_api_url}/links`, { url }),
    getUrlShorteds: () => axios.get(`${base_api_url}/links`),
};

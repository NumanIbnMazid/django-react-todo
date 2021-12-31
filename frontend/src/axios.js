import axios from "axios";

let baseURL = window.location.origin + "/api/"

if (window.location.origin === "http://localhost:3000") {
    baseURL = "http://127.0.0.1:8000/api/";
}

export default axios.create({
    baseURL,
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    // },
});
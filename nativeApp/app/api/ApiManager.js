import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://10.0.2.2:5000/api",
  responseType: "json",
});

export default ApiManager;

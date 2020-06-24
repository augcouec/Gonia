import axios from "axios";

const Api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8080/api"
      : "https://gonia.herokuapp.com/api",
});

export default Api;

import axios from "axios";
import config from "./config.js";

const pokeApiClient = axios.create({
  baseURL: config.externalApis.pokeApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

pokeApiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error(
      "Error occurred:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error);
  }
);

export { pokeApiClient };

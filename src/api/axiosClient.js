import axios from "axios";

const instance = axios.create({
  // baseURL: "https://lhuexamonline.herokuapp.com",
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  // handle token
  const token = localStorage.getItem("awt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default instance;

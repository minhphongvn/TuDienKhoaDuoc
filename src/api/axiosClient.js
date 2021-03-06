import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
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

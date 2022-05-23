import axiosClient from './axiosClient';
import store from '../store';
import router from '../router';

const auth = {
  login: ({ username, password }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const url = '/api/v1/login/access-token';
    return axiosClient.post(url, formData)
  },
  register: ({ student_id, full_name, email, password }) => {
    const url = '/api/v1/users/';
    return axiosClient.post(url, {
      student_id,
      full_name,
      email,
      password
    })
  },
  logout: () => {
    localStorage.removeItem('awt');
    store.commit("setToken", null)
    router.push({ name: "Login" })
  },
  getUser: () => {
    const url = '/api/v1/users/me';
    return axiosClient.get(url)
  },
  passwordRecovery: (email) => {
    const url = `/api/v1/password-recovery/${email}`;
    return axiosClient.post(url)
  },
  renewPassword: ({ token, new_password }) => {
    const url = '/api/v1/reset-password/';
    return axiosClient.post(url, { token, new_password })
  }
}

export default auth;
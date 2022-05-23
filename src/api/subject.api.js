import axiosClient from "./axiosClient";

const subjectApi = {
  getList: () => {
    const url = `/api/v1/subject`;
    return axiosClient.get(url);
  },
  addSubject: (payload) => {
    const url = `/api/v1/subject`;
    return axiosClient.post(url, payload);
  },
  updateSubject: (payload) => {
    const url = `/api/v1/subject?id=${payload.id}`;
    return axiosClient.put(url, payload);
  },
  deleteSubject: (payload) => {
    const url = `/api/v1/subject/delete?id=${payload}`;
    return axiosClient.delete(url);
  }
};

export default subjectApi;

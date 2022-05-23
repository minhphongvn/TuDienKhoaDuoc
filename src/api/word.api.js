import axiosClient from "./axiosClient";

const wordApi = {
  getList: () => {
    const url = `/api/v1/words`;
    return axiosClient.get(url);
  },
  addWord: (payload) => {
    const url = `/api/v1/words`;
    return axiosClient.post(url, payload);
  },
  updateWord: (payload) => {
    const url = `/api/v1/words?id=${payload.id}`;
    return axiosClient.put(url, payload);
  },
  deleteWord: (payload) => {
    const url = `/api/v1/subject/delete?id=${payload}`;
    return axiosClient.delete(url);
  }
};

export default wordApi;

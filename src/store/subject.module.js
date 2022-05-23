import subjectApi from '../api/subject.api'

export default {
  namespaced: true,
  state: () => ({
    subjects: [],
  }),
  mutations: {
    setSubjects(state, payload) {
      state.subjects = payload
    }
  },
  actions: {
    async getListSubject({ commit }) {
      try {
        const data = await subjectApi.getList()
        commit("setSubjects", data);
      } catch (error) {
        console.log(error);
      }
    },
    async addSubject(_, payload) {
      try {
        const data = await subjectApi.addSubject(payload)
        console.log(data);
        this.dispatch("subject/getListSubject");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSubject(_, payload) {
      try {
        await subjectApi.deleteSubject(payload)
        this.dispatch("subject/getListSubject");
      } catch (error) {
        console.log(error);
      }
    },
    async updateSubject(_, payload) {
      try {
        await subjectApi.updateSubject(payload)
        this.dispatch("subject/getListSubject");
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {

  }
}


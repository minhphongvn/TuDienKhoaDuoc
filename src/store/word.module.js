import wordApi from "../api/word.api";

export default {
  namespaced: true,
  state: () => ({
    words: [],
  }),
  mutations: {
    setWords(state, payload) {
      state.words = payload
    }
  },
  actions: {
    async getListWord({ commit }) {
      try {
        const data = await wordApi.getList()
        commit("setWords", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getWordBySubjectId(_, payload) {
      try {
        const data = await wordApi.getWordById(payload)
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async addWord(_, payload) {
      try {
        const data = await wordApi.addWord(payload)
        console.log(data);
        this.dispatch("word/getListWord");
      } catch (error) {
        console.log(error);
      }
    },
    async updateWord(_, payload) {
      try {
        await wordApi.updateWord(payload)
        this.dispatch("word/getListWord");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWord(_, payload) {
      try {
        await wordApi.deleteWord(payload)
        this.dispatch("word/getListWord");
      } catch (error) {
        console.log(error);
      }
    }
  },
}
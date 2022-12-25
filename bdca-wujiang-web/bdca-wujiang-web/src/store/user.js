import Cookie from 'js-cookie'
export default {
  state: {
    grade: '',
  },
  getters: {
    getGrade(state) {
      return state.grade
    }
  },
  mutations: {
    setGrade(state, grade) {
      state.grade = grade
    }
  },
}

import router from '../router'
export default {
  state: {
    menu: '',
  },
  getters: {
    getMenu(state) {
      return JSON.parse(state.menu)
    }
  },
  mutations: {
    setMenu(state, menu) {
      state.menu = JSON.stringify(menu)
      menu.forEach(item => {
        router.addRoute('Main', item)
      });
    }
  },
}

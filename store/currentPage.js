export const state = () => ({
    page: '',
})
  export const getters = {
    getPage(state){
      return state.page
    }
  }
  export const mutations = {
    setState(state,obj){
           state.page = obj
    }
  }
  export const actions = {
      setState(e,string){
        e.commit('setState',string)
      }
}

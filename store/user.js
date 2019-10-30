export const state = () => ({
    user: {},
})
  export const getters = {
    getUser(state){
      return state.user
    }
  }
  export const mutations = {
    setState(state,obj){
           state.user = obj
           this.$cookies.set("userTemp", state.user); 
    }
  }
  export const actions = {
      setState(e,string){
        e.commit('setState',string)
      }
}

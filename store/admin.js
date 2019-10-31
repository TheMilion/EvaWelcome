export const state = () => ({
    admin: {},
})
  export const getters = {
    getAdmin(state){
      return state.admin
    }
  }
  export const mutations = {
    setState(state,obj){
           state.admin = obj
           this.$cookies.set("adminTemp", state.admin); 
    }
  }
  export const actions = {
      setState(e,string){
        e.commit('setState',string)
      }
}

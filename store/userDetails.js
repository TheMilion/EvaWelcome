export const state = () => ({
    userDetails: {},
})
  export const getters = {
    getUserDetails(state){
      return state.userDetails
    }
  }
  export const mutations = {
    setState(state,obj){
           state.userDetails = obj
           this.$cookies.set("userTempDetails", state.userDetails); 
    }
  }
  export const actions = {
      setState(e,string){
        e.commit('setState',string)
      }
}

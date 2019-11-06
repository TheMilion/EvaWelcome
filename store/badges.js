import axios from 'axios'
import moment from 'moment'

export const state = () => ({
    "badges":[]
})
export const getters = {
    getBadges(state){
        return state.badges
    }
}
export const mutations={
    setBadges(state, payload){
        state.badges = payload
    },
    deleteBadge(state, payload){
        state.badges.splice(payload, 1)
    }
}
export const actions={
    delBadge(e, payload){
        for(let i in e.state.badges){
            if(e.state.badges[i].idBadge == payload){
                let idBadge = e.state.badges[i].idBadge
                let idUser = e.state.badges[i].idUser
                axios.put('http://192.168.2.28:3000/users/exit/'+idUser, {signout: ' '})
                .then(res =>{
                    axios.delete('http://192.168.2.28:3000/badges/delete/'+idBadge)
                    .then(res=>{
                        e.commit('deleteBadge', i)
                    })
                    .catch(e=>{
                        console.error(e)
                    })
                })
                .catch(e=>{
                    console.error(e)
                })
            }
        }
    }
}
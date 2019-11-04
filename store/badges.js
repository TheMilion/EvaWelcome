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
        state.badges[payload].idUser = null
    }
}
export const actions={
    async delBadge(e, payload){
        for(let i in e.state.badges){
            if(e.state.badges[i].id == payload){
                let id = e.state.badges[i].id
                let idUser = e.state.badges[i].idUser
                await axios.get('http://localhost:8080/users?id='+idUser)
                .then(({data})=>{
                    data[0].uscita = {
                        'data': moment().format("DD-MM-YYYY"),
                        'ora': moment().format("HH:mm:ss")
                    }
                    axios.put('http://localhost:8080/users/'+idUser+'/', {
                        ...data[0]
                    })
                    .catch(e=>{
                        console.error(e)
                    })
                })
                .catch(err=>{
                    alert(err)
                })
                
                e.commit('deleteBadge', i)
                await axios.delete('http://localhost:8080/badges/'+id+'/')
                .catch(e=>{
                    console.error(e)
                })
            }
        }
    }
}
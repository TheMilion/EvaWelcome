import axios from 'axios'

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
                await axios.get('http://localhost:80/users?id='+idUser)
                .then(({data})=>{
                    let today = new Date();
                    data[0].uscita = {
                        'data': today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
                        'ora': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                    }
                    axios.put('http://localhost:80/users/'+idUser+'/', {
                        ...data[0]
                    })
                    .catch(errore=>{
                        console.error(errore)
                    })
                })
                .catch(err=>{
                    alert(err)
                })
                
                e.commit('deleteBadge', i)
                await axios.delete('http://localhost:80/badges/'+id+'/')
                .then(res=>{
                    console.log('badges ',res)
                })
                .catch(errr=>{
                    console.error(errr)
                })
                console.log(e.state.badges)
            }
        }
    }
}
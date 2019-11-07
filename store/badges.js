export const state = () => ({
    "badges":[
        {
            id: 1,
            idBadge:1,
            idUser:1
        },
        {
            id: 2,
            idBadge:2,
            idUser:2
        },
        {
            id: 3,
            idBadge:3,
            idUser:3
        },
        {
            id: 4,
            idBadge:4,
            idUser:4
        },
        {
            id: 5,
            idBadge:5,
            idUser:5
        }
    ]
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
                this.$axios.put('users/exit/'+idUser, {signout: ' '})
                .then(res =>{
                    this.$axios.delete('badges/delete/'+idBadge)
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
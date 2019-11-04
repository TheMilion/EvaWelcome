export default async function(context){
    let {app} = context;

    await app.$axios.get('http://localhost:8080/badges')
    .then(({data})=>{
        app.store.commit('badges/setBadges', data)
    })
    .catch(e=>{
        alert(e)
    })
}

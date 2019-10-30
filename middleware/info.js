export default function(context){
    let {app} = context;
    var user = app.store.getters['user/getUser']
    var userDetails = app.store.getters['userDetails/getUserDetails']

    if(user){
        let cookieUser = app.$cookies.get('userTemp') 
            if(cookieUser  == undefined || cookieUser == ''){
                app.store.commit('user/setState', {})
                        }
            else{
                app.store.commit('user/setState', cookieUser);
            }
        } 

    if(userDetails){
        let cookieUserDetails = app.$cookies.get('userTempDetails') 
        if(cookieUserDetails  == undefined || cookieUserDetails == ''){
            app.store.commit('userDetails/setState', {})
                    }
        else{
            app.store.commit('userDetails/setState', cookieUserDetails);
        }
    }
        /*
        console.log(app.router.history.current.name)
        switch(app.router.history.current.name){
            case 'index' : app.store.commit('currentPage/setState', 'Home')
            break;
            case 'ingresso' : app.store.commit('currentPage/setState', 'Inserisci i tuoi dati personali')
            break;
            case 'ingresso-stepRole' : app.store.commit('currentPage/setState', 'Inserisci il Ruolo/Motivo della tua visita')
            break;
            case 'uscita' : app.store.commit('currentPage/setState', 'Conferma la tua uscita')
            break;
            case 'index' : app.store.commit('currentPage/setState', 'Home')
            break;
        }
*/
    //console.log(app.router.history.current.name)
    //app.store.commit('currentPage/setState', {})
}
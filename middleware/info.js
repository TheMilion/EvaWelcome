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
}
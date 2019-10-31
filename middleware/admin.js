export default function(context){
    let {app} = context;
    var admin = app.store.getters['admin/getAdmin']
    
    if(admin){
        let cookieAdmin = app.$cookies.get('adminTemp') 
            if(cookieAdmin  == undefined || cookieAdmin == ''){
                app.store.commit('admin/setState', {})
            }
            else{
                app.store.commit('admin/setState', cookieAdmin);
            }
        } 
}
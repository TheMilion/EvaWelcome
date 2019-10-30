<template>
<div>
    <div class="topPage" style="padding:30px" align="center">
            <h2>Grazie per la tua pazienza<br>Ecco il tuo numero</h2>
    </div>
    <div class="bodyPage">
        <div align="center">
        <p style="font-size:250px">{{this.$route.query.num}}</p>
        </div> 
    </div>
    <div class="footerPage">
        <vs-row>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
               
            </vs-col>
            <vs-col vs-w="6"></vs-col>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                color="success"
                size="large" 
                style="width: 100%;"
                icon="done"
                to="/"
                type="filled">
                Ritorna ad Home
                </vs-button>
            </vs-col>
        </vs-row>
    </div>   
    </div>
</template>
<script>
export default {
    middleware: 'info',
    data(){
        return{
            num: ''
        }
    },
        mounted() {
            if(Object.keys(this.$store.getters['user/getUser']).length == 0){
                this.$router.push("/")
            }
            else{
                if(this.$route.query.num == undefined){
                this.$router.push("/")
            }
                this.$cookies.remove("userTemp")
                this.$store.commit('user/setState', {})
            }
    },
    methods: {
    }
}
</script>
<style scoped>
.card{
    height:100px;
    width:240px;
   }
.step{
    padding-bottom:20px;
}
</style>
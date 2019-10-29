<template>
    <div class="container">
        <h1>Uscita</h1>
        <h4>Seleziona il badge assegnato per uscire</h4>
        <vs-row>
            <vs-col class="aculonn" vs-w="4" v-for="(badge, i) in badges" :key="i">
                <div class="circle" @click="confirmBadge(badge.num)">
                    {{ badge.num }}
                </div>
            </vs-col>
        </vs-row>
        <vs-popup :active.sync="popupActive1" title="Conferma badge" button-close-hidden>
            <p>Confermi che il tuo badge è {{ selectedBadge }}</p>
            <vs-button color="danger" @click="popupActive1=false" size="large">no</vs-button>
            <vs-button color="success" @click="deleteBadge" size="large">si</vs-button>
            <vs-popup :active.sync="popupActive2" title="Grazie e arrivederci" button-close-hidden>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
            </vs-popup>
        </vs-popup>
    </div>
</template>

<script>
export default {
    name:'uscita',
    async mounted(){
        await this.$axios.get('http://localhost:5/badges')
        .then(({data})=>{
            this.badges=data
        })
        .catch(e=>{
            console.log(e)
        })
    },
    data(){
        return{
            badges:"",
            selectedBadge:'',
            popupActive1:false,
            popupActive2:false
        }
    },
    computed:{
        row(){
            return Math.floor(this.badges.length / 3)
        }
    },
    methods:{
        confirmBadge(num){
            this.popupActive1 = true
            this.selectedBadge = num
        },
        deleteBadge(){
            this.popupActive2 = true

            //chiamata axios per eliminare budge

            setTimeout(this.closeReturnHome, 5000);
        },
        closeReturnHome(){
            this.popupActive1 = false
            this.popupActive2 = false
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container {
        margin: 0 auto;
        min-height: 100vh;
        display: block;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .aculonn{
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .circle{
        background-color: rgb(166, 157, 255);
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
    }
</style>
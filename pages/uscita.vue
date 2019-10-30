<template>
    <div class="container">
        <vs-row v-if="badgesList">
            <vs-row>
                <vs-col vs-w="12" style=" height: 160px;" vs-type="flex" vs-justify="center" vs-align="center">
                    <h2>Ricerca oppure seleziona il badge</h2>
                </vs-col>
                <vs-col vs-w="12"  vs-type="flex" vs-justify="center" vs-align="center">
                    <div style="padding-left: 20px;padding-right: 20px; padding-bottom: 30px">
                        <vs-input size="xlarge" style="width:100%" v-model="researchBadge" icon="search" icon-after="true"/>
                    </div>
                </vs-col>
            </vs-row>
            <vs-col class="col" vs-w="2" v-for="(badge, i) in filtredBadges" :key="i">
                <vs-button class="circle" @click="confirmBadge(badge.id)">
                    <h1 style="font-size: 54px">{{ badge.id }}</h1>
                </vs-button>
            </vs-col>
        </vs-row>
        <div v-if="popupActive1">
           <vs-col vs-w="12" style=" height: 160px;" vs-type="flex" vs-justify="center" vs-align="center">
            <h2>Confermi che il tuo badge è  </h2>
           </vs-col>
            <vs-col vs-w="12" style="padding:10px;" vs-type="flex" vs-justify="center" vs-align="center">
              <div class="col">
                      <h1 style="font-size: 150px">{{ selectedBadge }}</h1>
              </div>
            </vs-col>
            <vs-col vs-w="12" style=" padding:50px;" vs-type="flex" vs-justify="center" vs-align="center">
            <div>
                <vs-button color="danger" @click="cancelConfirm" size="large" style="font-size:40px; height:150px;width: 350px">NO</vs-button>
                <vs-button color="success" @click="deleteBadge" size="large" style="font-size:40px; height:150px;width: 350px">SI</vs-button>
            </div>
         </vs-col>
        </div>
        
        <div v-if="popupActive2">
            <h1>///////Saluto Generale\\\\\\\</h1> 
        </div>
    </div>
</template>

<script>
export default {
    name:'uscita',
    middleware: 'badges',
    computed:{
        badges(){
            return this.$store.getters['badges/getBadges']
        },
        row(){
            return Math.floor(this.badges.length / 3)
        },
        filtredBadges(){
            let filtredBadges = [];
            for(let i in this.badges){
                if(this.researchBadge){
                    if(this.badges[i].id.toString().startsWith(this.researchBadge)){
                        filtredBadges.push(this.badges[i])
                    }
                } else {
                    filtredBadges.push(this.badges[i])
                }
            }
            return filtredBadges
        }
    },
    data(){
        return{
            selectedBadge:'',
            researchBadge: '',
            badgesList: true,
            popupActive1:false,
            popupActive2:false
        }
    },
    methods:{
        confirmBadge(num){
            this.badgesList = false
            this.popupActive1 = true
            this.popupActive2 = false
            this.selectedBadge = num
        },
        cancelConfirm(){
            this.badgesList = true
            this.popupActive1 = false
            this.popupActive2 = false
            this.selectedBadge = ''
        },
        deleteBadge(){
            this.badgesList = false
            this.popupActive1 = false
            this.popupActive2 = true

            //chiamata store per eliminare badge
            this.$store.dispatch('badges/delBadge', this.selectedBadge)

            setTimeout(this.closeReturnHome, 1000);
        },
        closeReturnHome(){
            this.popupActive1 = false
            this.popupActive2 = false
            this.badgesList = false
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container {
        min-height: calc(100vh - 170px);
        display: block;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .col{
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .circle{
        background-color: rgb(166, 157, 255);
        width: 250px;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
    }
</style>
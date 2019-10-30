<template>
    <div class="container">
        <vs-row v-if="badgesList" style="margin-top: 20px;">
            <vs-row>
                <vs-col vs-w="12">
                    <h2>Ricerca oppure seleziona il badge</h2>
                    <div class="col" style="padding-left: 40%;padding-right: 40%;">
                        <vs-input size="large" style="width:90%" v-model="researchBadge" icon="search" icon-after="true"/>
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
            <p>Confermi che il tuo badge è</p>
            <div class="col">
                <vs-button class="circle">
                    <h1 style="font-size: 54px">{{ selectedBadge }}</h1>
                </vs-button>
            </div>
            <div>
                <vs-button color="danger" @click="cancelConfirm" size="large" style="width: 120px">NO</vs-button>
                <vs-button color="success" @click="deleteBadge" size="large" style="width: 120px">SI</vs-button>
            </div>
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
            let filtredBadges = []
            for(let i in this.badges){
                if(this.researchBadge){
                    if(this.badges[i].id.startsWith(this.researchBadge)){
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
        padding: 10px;
        margin: 0 auto;
        min-height: 100vh;
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
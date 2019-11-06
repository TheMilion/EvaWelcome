<template>
<div>
    <div class="headerText" align="center">
            <h2>{{MyUser.nome}} {{MyUser.cognome}}</h2><br>
            <h3>Seleziona il tuo ruolo e indica il motivo della tua visita</h3>
        </div>

    <div class="bodyText">
        <vs-row>
            <!--Ruolo-->
            <vs-col style="padding:25px" vs-w="6">
                <vs-select
                style="width: 100%;"
                label="Ruolo"
                v-model="userDetails.ruoloSelect">
                <vs-select-item  v-for="(item,index) in this.ruoloArr" :key="index" :value="item.value" :text="item.text"  />
                </vs-select>
            </vs-col>
            <!--Motivo-->
            <vs-col style="padding:25px" vs-w="6">
                <vs-select
                label="Motivo"
                style="width: 100%"
                v-model="userDetails.motivoSelect">
                <vs-select-item  v-for="(item,index) in this.motivoArr" :key="index" :value="item.value" :text="item.text"  />
                </vs-select>
            </vs-col>
            <!--TextArea-->
            <vs-col style="padding:25px" vs-w="12">
                <p style="font-size:20px ;padding-bottom:10px; color: rgba(0,0,0,.6);">Aggiungi una descrizione: </p>
                <vs-textarea style="height:150px; max-height:200px" v-model="userDetails.textarea" />
            </vs-col>
        </vs-row>
    </div>
    <div class="footerText" style="margin-top:47px;">
        <vs-row>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                    <u @click="goBack()" style="color:#BC1254; cursor:pointer;  margin-top:1px; font-size:20px">Indietro</u>
            </vs-col>
            <vs-col vs-w="6"></vs-col>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                    color="#BC1254" 
                    size="large" 
                    style="width: 100%;"
                    icon="arrow_forward"
                    icon-after
                    @click="confirmBadge()" 
                    type="filled">Avanti
                    </vs-button>
            </vs-col>
        </vs-row>
    </div>

        


            
    </div>
</template>
<script>
import moment from 'moment'
export default {
    middleware: 'info',
    data(){
        return{
            maxIdBadge: this.$welcome.maxIdBadge,
            userDetails: {
                ruoloSelect: "visitatore",
                motivoSelect: "non_definito",
                textarea : '',
            },
            ruoloArr: [
                {text: 'Visitatore', value: 'visitatore'},
                {text: 'Cliente', value: 'cliente'},
                {text: 'Agente', value: 'agente'},
                {text: 'Candidato Colloquio', value: 'candidato_colloquio'},
                {text: 'Collaboratore Esterno', value: 'collaboratore_esterno'}
            ],
            motivoArr: [
                {text: 'Non Definito', value: 'non_definito'},
                {text: 'Colloquio', value: 'colloquio'},
                {text: 'Meetings', value: 'meetings'},
                {text: 'Informazioni', value: 'info'},
                {text: 'Pagamento/Saldo', value: 'pagamento_saldo'}
            ],
            date: '',
            time: '',
        }
    },
     computed: {
        MyUser() {
            return this.$store.getters['user/getUser']}
              },
        mounted() {
            if(Object.keys(this.$store.getters['user/getUser']).length == 0){
                this.$router.push("/ingresso")
            }
            else{
                if(Object.keys(this.$store.getters['userDetails/getUserDetails']).length != 0) {
                this.userDetails = {...this.$store.getters['userDetails/getUserDetails']}
            }
            }
    },
    methods: {
        goBack(){
            this.$store.commit("userDetails/setState", this.userDetails)
            this.$router.push("/ingresso")
        },
        getCurrentDate(){
            this.date = moment().format("DD-MM-YYYY");
            this.time = moment().format("HH:mm:ss");
        },
        confirmBadge(){
            this.getCurrentDate()
            this.$axios.$get('badges')
            .then(data=>{
                let allBadge = data
                allBadge.sort(function(a, b) {return a.idBadge - b.idBadge});
                let idB = ''
                if(data.length == 0){
                    idB = 1
                }else{
                    let count = 0
                    for(let i in data){
                        if(data[i].idBadge>count){
                            count = data[i].idBadge
                        }
                    }
                    idB = count + 1
                    if(idB > this.maxIdBadge){
                        for(var i = 1; i<this.maxIdBadge; i++){
                            if(allBadge[i-1].idBadge != i){
                                idB = i
                                break;
                            }
                        }
                        if(idB > this.maxIdBadge) 
                        {
                            alert("non ci sono badge disponibili, ci scusiamo per il disagio")
                            return this.$router.push("/")
                        }
                    }
                }
                this.$axios.$post('users/create', {
                        nome: this.MyUser.nome,
                        cognome: this.MyUser.cognome,
                        email: this.MyUser.email,
                        numtel: this.MyUser.numtel,
                        ruolo: this.userDetails.ruoloSelect,
                        motivo: this.userDetails.motivoSelect,
                        descrizione: this.userDetails.textarea,
                        badge: idB,
                    })
                    .then(res=>{
                        this.$axios.$post('badges/create', {
                            idBadge: idB,
                            idUser: res.id
                        })
                        .then(res=>{
                            console.log('creato il badge', res)
                            this.$router.push({path: "/ingresso/stepConfirm" , query:{num: idB}})
                        })
                        .catch(e=>{
                            console.log(e)
                        })
                    })
                    .catch(e=>{
                        console.log(e)
                    })
                })
            .catch(e=>{
                console.log(e)
            })
        },

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
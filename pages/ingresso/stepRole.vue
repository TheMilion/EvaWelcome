<template>
<div>
    <div class="topPage" style="padding:30px" align="center">
            <h2>{{MyUser.nome}} {{MyUser.cognome}}</h2><br>
            <h3>Seleziona il tuo ruolo e indica il motivo della tua visita</h3>
    </div>
    <div class="bodyPage">
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
    <div class="footerPage">
        <vs-row>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                color="danger" 
                style="width: 100%;"
                size="large" 
                icon="clear"
                @click="goBack()"
                type="filled">Indietro
                </vs-button>
            </vs-col>
            <vs-col vs-w="3"></vs-col>
            <vs-col vs-w="3">
                <vs-button 
                    color="grey"
                    size="large" 
                    style="width: 95%; "
                    icon="fast_forward"
                    @click="confirmBadge()" 
                    type="filled">
                    Skip
                    </vs-button>
            </vs-col>
            <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-button 
                color="success"
                size="large" 
                style="width: 100%;"
                icon="done"
                @click="confirmBadge()" 
                type="filled">
                Ottieni ora il tuo badge
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
            var today = new Date();
            this.date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        },
        confirmBadge(){
            this.getCurrentDate()
            this.$axios.$get('http://localhost:80/badges')
            .then(data=>{
                let allBadge = data
                allBadge.sort(function(a, b) {return a.id - b.id});
                let idB = ''
                if(data.length == 0){
                    idB = 1
                }else{
                    let count = 0
                    for(let i in data){
                        if(data[i].id>count){
                            count = data[i].id
                        }
                    }
                    idB = count + 1
                    if(idB > 10){
                        for(var i = 1; i<10; i++){
                            if(allBadge[i-1].id != i){
                                idB = i
                                //console.log(idB)
                                break;
                            }
                        }
                        if(idB > 10) 
                        {
                            alert("non ci sono badge disponibili, ci scusiamo per il disagio")
                            return this.$router.push("/")
                        }
                    }
                }
                this.$axios.$get('http://localhost:80/users')
                .then(data=>{
                     let idU = ''
                    if(data.length == 0){
                        idU = 1
                    }else{
                        idU= data[data.length-1].id + 1
                    }
                    this.$axios.$post('http://localhost:80/users', {
                        id: idU,
                        nome: this.MyUser.nome,
                        cognome: this.MyUser.cognome,
                        email: this.MyUser.email,
                        numtel: this.MyUser.numtel,
                        ruolo: this.userDetails.ruoloSelect,
                        motivo: this.userDetails.motivoSelect,
                        descrizione: this.userDetails.textarea,
                        entrata: {
                            data: this.date,
                            ora: this.time,
                        },
                        uscita: {
                            data: null,
                            ora: null
                        }
                    })
                    .then(res=>{
                        this.$axios.$post('http://localhost:80/badges', {
                            id: idB,
                            idUser: idU
                        })
                        .then(res=>{
                            this.$router.push({path: "/ingresso/stepConfirm" , query:{num: res.id}})
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
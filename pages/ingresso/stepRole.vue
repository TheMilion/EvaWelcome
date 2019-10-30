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
                v-model="ruoloSelect">
                <vs-select-item  v-for="(item,index) in this.ruoloArr" :key="index" :value="item.value" :text="item.text"  />
                </vs-select>
            </vs-col>
            <!--Motivo-->
            <vs-col style="padding:25px" vs-w="6">
                <vs-select
                label="Motivo"
                style="width: 100%"
                v-model="motivoSelect">
                <vs-select-item  v-for="(item,index) in this.motivoArr" :key="index" :value="item.value" :text="item.text"  />
                </vs-select>
            </vs-col>
            <!--TextArea-->
            <vs-col style="padding:25px" vs-w="12">
                <p style="font-size:20px ;padding-bottom:10px; color: rgba(0,0,0,.6);">Aggiungi una descrizione: </p>
                <vs-textarea style="height:150px; max-height:200px" v-model="textarea" />
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
                to="/ingresso"
                type="filled">Annulla
                </vs-button>
            </vs-col>
            <vs-col vs-w="3"></vs-col>
            <vs-col vs-w="3">
                <vs-button 
                    color="grey"
                    size="large" 
                    style="width: 100%;"
                    icon="done"
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
            textarea: '',
            ruoloSelect: "visitatore",
            motivoSelect: "non_definito",
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
    },
    methods: {
        getCurrentDate(){
            var today = new Date();
            this.date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        },
        confirmBadge(){
            /*
             if (users.length == 0) {
                    id = 1
            } else {
                id = (users[users.length - 1].id) + 1;
                }
    */
            console.log("User" , { ...this.MyUser})
            console.log("Ruolo: " ,this.ruoloSelect)
            console.log("Motivo: " ,this.motivoSelect)
            console.log("Descrizione" , this.textarea)
            this.getCurrentDate()
            console.log("Data e Ora" , this.date, this.time)
            this.$router.push({path: "/ingresso/stepConfirm" , query:{num: "5"}})
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
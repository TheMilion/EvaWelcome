<template>
    <div>
        <h1 align="center" >Richiesta Badge</h1>

        <vs-row class="container">
            <vs-col class="final-step" v-if="!confirmedAnagrafica" vs-w="12">
                <h4>Anagrafica</h4>
                <div align="center"  class="centerDiv">
                    <p class="inputText"><vs-input 
                    label-placeholder="Nome" 
                    size="large"
                    @blur="blurcheckAnagrafica(formAnagrafica.nome, 'nome')"
                    :danger="errorformAnagrafica.nome" 
                    danger-text="Il Campo non può essere vuoto"
                    v-model="formAnagrafica.nome"/></p>
                    <p class="inputText" ><vs-input 
                    label-placeholder="Cognome" 
                    size="large"
                    @blur="blurcheckAnagrafica(formAnagrafica.cognome, 'cognome')"
                    :danger="errorformAnagrafica.cognome" 
                    danger-text="Il Campo non può essere vuoto" 
                    v-model="formAnagrafica.cognome"/></p>
                    <p class="inputText" ><vs-input label-placeholder="Email"
                    :disabled="confirmedAnagrafica"
                     size="large"
                     v-model="formAnagrafica.email"/></p>
                    <p class="inputText" ><vs-input 
                    label-placeholder="Numero Telefono" 
                   
                    size="large"
                    v-model="formAnagrafica.numtel"/></p>
                </div>
                <vs-checkbox class="checkPrivacy" size="large" :disabled="confirmedAnagrafica" v-model="privacyCheck">Conferma Privacy</vs-checkbox>
                <p style="color: red; padding-bottom:10px;">{{errorprivacyCheck}}</p>
                <vs-button color="success" size="large" v-if="!confirmedAnagrafica" @click="checkAnagrafica" type="filled">Conferma</vs-button>
              </vs-col>
            <vs-col class="step" v-if="confirmedAnagrafica" vs-w="6">
                <h4>Ruolo</h4>
                <div class="leftRadio">
                    <vs-radio v-model="ruoloRadio"   vs-value="visitatore">Visitatore</vs-radio>
                    <vs-radio v-model="ruoloRadio"  vs-value="cliente">Cliente</vs-radio>
                    <vs-radio v-model="ruoloRadio"  vs-value="agente">Agente</vs-radio>
                    <vs-radio v-model="ruoloRadio"  vs-value="candidato_colloquio">Candidato Colloquio</vs-radio>
                    <vs-radio v-model="ruoloRadio"  vs-value="collaboratore_esterno">Collaboratore Esterno</vs-radio>
                </div>
            </vs-col>
            <vs-col class="final-step" v-if="confirmedAnagrafica" vs-w="6">
                <h4>Motivo</h4>
                <div class="leftRadio">
                    <vs-radio v-model="motivoRadio"   vs-value="nondefinito">Non Definito</vs-radio>
                    <vs-radio v-model="motivoRadio"   vs-value="colloquio">Colloquio</vs-radio>
                    <vs-radio v-model="motivoRadio"   vs-value="meetings">Meetings</vs-radio>
                    <vs-radio v-model="motivoRadio"   vs-value="info">Informazioni</vs-radio>
                    <vs-radio v-model="motivoRadio"  vs-value="pagamento_saldo">Pagamento/Saldo</vs-radio> 
                </div>
            </vs-col>
        </vs-row>
        <vs-row style="padding:20px;" align="center">
            <vs-col class="" vs-w="12">
                <vs-button 
                    color="success"
                    size="large" 
                    style="width: 50%;"
                    v-show="confirmedAnagrafica"  
                    @click="confirmBadge()" 
                    type="filled">
                    Ottieni ora il tuo badge
                    </vs-button>
            </vs-col>
            <vs-col class="" vs-w="12">
            <vs-button 
                color="danger" 
                size="large" 
                style="margin-top:20px;"
                v-show="confirmedAnagrafica"  
                @click="confirmedAnagrafica = !confirmedAnagrafica" 
                type="filled">
                Annulla
                </vs-button>
                </vs-col>
        </vs-row>
             <vs-popup title="Grazie per la sua registrazione" :active.sync="popupActive">
           <vs-row style="" align="center">
           
           </vs-row>
           <vs-row style="padding:20px;" align="center">
                <vs-col class="" vs-w="6">
                <div class="textBadge">
                <h5>Riepilogo utente:</h5>
                Nome: {{formAnagrafica.nome}}<br>
                Cognome: {{formAnagrafica.cognome}}<br>
                Entrata: {{date}} {{time}}<br>
                </div>
                </vs-col>
                <vs-col vs-w="6">
                    <h5>Il suo numero di Badge</h5>
                   <p style="font-size:70px">48</p>
                </vs-col>
           </vs-row>
    </vs-popup>
    </div>
</template>
<script>
export default {
    data(){
        return{
            date: '',
            time: '',
            popupActive: false,
            privacyCheck: false,
            errorprivacyCheck: "",
            countererrorformAnagrafica : 0,
            formAnagrafica:{
                nome: "",
                cognome: "",
                email: "",
                numtel: ""
            },
            errorformAnagrafica: {
                nome: false,
                cognome: false,
            },
            ruoloRadio: "",
            motivoRadio: "",
            confirmedAnagrafica: false,
        }
    },
    methods: {
        blurcheckAnagrafica(type,error){
            if(type == '') this.errorformAnagrafica[error] = true;
            else  this.errorformAnagrafica[error] =  false;
        },
        getCurrentDate(){
            var today = new Date();
            this.date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        },
        confirmBadge(){
            this.popupActive = true
            this.getCurrentDate()
        },
        checkAnagrafica(){
            this.countererrorformAnagrafica = 0
            for(let i in this.formAnagrafica){
                if(i == "email" || i == "numtel") continue
                if(this.formAnagrafica[i] == ''){
                    this.errorformAnagrafica[i] = true;
                    this.countererrorformAnagrafica ++
                }
                else{this.errorformAnagrafica[i] = false;}
            }
            if(this.countererrorformAnagrafica == 0){
                if(this.privacyCheck == false) this.errorprivacyCheck = "Devi confermare il trattamento sulla privacy"
                else {
                    this.confirmedAnagrafica = true
                    this.errorprivacyCheck = ''
                    this.ruoloRadio = "visitatore"
                    this.motivoRadio = 'nondefinito'}
                    }
            },

    }
}
</script>
<style scoped>
.step{
    min-height: 60vh;
    min-width: 33vw;
    border-right:1px solid black;
    padding:50px;
}
.final-step{
    min-height: 60vh;
    min-width: 33vw;
    padding:50px;
}
.centerDiv{
    padding:10px;
}
.checkPrivacy{
margin-top:10px;
margin-bottom:20px;
}
.footer{
    margin-top: 100px;
}
.inputText{
    padding:10px;
}
.leftRadio{
  display: block;
  text-align: left;
}
.textBadge{
    text-align: left;
}
.container {
  margin: 0 auto;
  min-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
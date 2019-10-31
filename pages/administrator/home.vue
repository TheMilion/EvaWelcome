<template>
  <div class="container">
    <vs-row style="min-width: 90vw;">
      <vs-col vs-w="4" style="padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-input 
        label="Seleziona data"
        style="width:80%;"
        size="large" 
        type="date" 
        v-model="data"></vs-input>
      </vs-col>
      <vs-col vs-w="4" style="padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        
        <vs-button style="margin-top:25px;margin-right:5px" @click="data=getCurrentDate()">Mostra Oggi</vs-button>
        <vs-button style="margin-top:25px;" @click="data=''">Mostra tutti gli utenti</vs-button>
      </vs-col>
      <vs-col vs-w="4" style="margin-top:25px; padding: 30px;" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-button to="/administrator/createBadge">Aggiungi utente</vs-button>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12" style="padding:30px;" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-table stripe search pagination max-items="7" :data="users" style="min-width: 80vw;">
          <template slot="header">
            <h3>Utenti</h3>
          </template>
          <template slot="thead">
            <vs-th sort-key="nome">Nome</vs-th>
            <vs-th sort-key="cognome">Cognome</vs-th>
            <vs-th sort-key="email">Email</vs-th>
            <vs-th sort-key="numtel">Cell</vs-th>
            <vs-th sort-key="ruolo">Ruolo</vs-th>
            <vs-th sort-key="motivo">Motivo</vs-th>
            <vs-th sort-key="badge">Badge</vs-th>
            <vs-th sort-key="ts_entrata">Entrata</vs-th>
            <vs-th sort-key="ts_uscita">Uscita</vs-th>
            <vs-th>Azioni</vs-th>
            
          </template>
          <template v-if="users" slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td style="padding:20px !important">
                {{data[indextr].nome}}
              </vs-td>
              <vs-td>
                {{data[indextr].cognome}}
              </vs-td>
              <vs-td>
                {{data[indextr].email}}
              </vs-td>
              <vs-td>
                {{data[indextr].numtel}}
              </vs-td>
              <vs-td>
                {{data[indextr].ruolo}}
              </vs-td>
              <vs-td>
                {{data[indextr].motivo}}
              </vs-td>
              <vs-td>
                {{data[indextr].badge}}
              </vs-td>
              <vs-td>
                {{data[indextr].entrata.data}} {{data[indextr].entrata.ora}}
              </vs-td>
              <vs-td>
                {{data[indextr].uscita.data}} {{data[indextr].uscita.ora}}
              </vs-td>
              <vs-td>
                <vs-button v-if="!data[indextr].uscita.data" @click="unlockBadge(data[indextr].badge)">Sblocca</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table> 
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  middleware: 'badges',
  data(){
    return{
      data: "",
      users: [],
      badges: []
    }
  },
  computed:{
    choosedData(){
      let i = this.data.split('-')
      let date = i[2] + '-' + i[1] + '-' + i[0]
      return date
    }
  },
  watch:{
    data(){
      this.getUsers()
    }
  },
  mounted() {
    if(Object.keys(this.$store.getters['admin/getAdmin']).length != 0) console.log("ok")
    else this.$router.push("/administrator")
    this.getUsers()
    let today = new Date();
    this.data = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
  },
  methods:{
    async unlockBadge(badge){
      console.log('unlockBadge', badge)
      await this.$store.dispatch('badges/delBadge', badge)
      this.getUsers()
    },

    getCurrentDate(){
    let today = new Date();
    return  (today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate())
    },


    async getUsers(){
      let queryString = ''
      if(this.data!="") queryString = '?entrata.data='+this.choosedData 
      await this.$axios.$get('http://localhost:80/users'+queryString)
      .then(res=>{
       this.users = res.map(el => {
         return {
           ...el,
           ts_entrata:  moment(el.entrata.data + ' ' + el.entrata.ora, 'DD-MM-YYYY HH:mm:ss').unix(),
           ts_uscita:  (!el.uscita) ? 0 : moment(el.uscita.data + ' ' + el.uscita.ora, 'DD-MM-YYYY HH:mm:ss').unix()
         }
       })
     })
      .catch(e=>{
        console.log(e)
      })
    }


  }
}
</script>

<style scoped>
.button{
  margin: 20px;
}
.container {
  margin: 0 auto;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

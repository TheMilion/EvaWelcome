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
      <vs-col vs-w="12" >
        <vs-table stripe search pagination max-items="7" :data="users" style="min-width: 80vw;" ref="tableUser" >
          <template slot="header">
            <h3>Utenti</h3>
          </template>
          <template slot="thead">
            <vs-th sort-key="nome">Nome</vs-th>
            <vs-th sort-key="cognome">Cognome</vs-th>
            <vs-th sort-key="ruolo">Ruolo</vs-th>
            <vs-th sort-key="motivo">Motivo</vs-th>
            <vs-th sort-key="badge">Badge</vs-th>
            <vs-th sort-key="ts_entrata">Entrata</vs-th>
            <vs-th sort-key="ts_uscita">Uscita</vs-th>
            <vs-th>Azioni</vs-th>
          </template>
          <template v-if="users" slot-scope="{data}">
            <vs-tr ref="usersList" :key="indextr" v-for="(tr, indextr) in data" align="left">
              <vs-td >
                {{data[indextr].nome}}
              </vs-td>
              <vs-td>
                {{data[indextr].cognome}}
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
                {{data[indextr].entrata}} 
              </vs-td>
              <vs-td>
                {{data[indextr].uscita}}
              </vs-td>
              <vs-td>
                <vs-button color="warning" v-if="!data[indextr].uscita" @click.prevent.stop="unlockBadge(data[indextr].badge)">Sblocca</vs-button>
                <vs-button color="danger" v-else @click.prevent.stop="$refs.usersList[indextr].collapseExpandedData(); deleteUser(data[indextr].id)">Elimina</vs-button>
              </vs-td>
              <template class="expand-user" slot="expand">
                  <vs-list >
                    <vs-list-item icon="mail" title="Email" :subtitle="data[indextr].email"></vs-list-item>
                    <vs-list-item icon="call" title="Telefono" :subtitle="data[indextr].numtel"></vs-list-item>
                    <vs-list-item icon="ballot" title="Descrizione" :subtitle="data[indextr].descrizione"></vs-list-item>
                  </vs-list>
              </template>
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
  watch:{
    data(){
      this.getUsers()
    }
  },
  mounted() {
    if(Object.keys(this.$store.getters['admin/getAdmin']).length != 0) this.data = moment().format("YYYY-MM-DD")
    else this.$router.push("/administrator")
  },
  methods:{
    openPopup(title,image){
      this.titlePopup = title
      this.signature = image
      this.popupSignature = true
    },
    deleteUser(id){
      this.$axios.delete('users/delete/'+id)
      .then(res =>{
      this.getUsers()
        this.$vs.notify({title:'Utente Cancellato',text:'Utente Cancellato manualmente',color:'danger'})
      })
      .catch(e =>{
        // this.$router.push({path:'/error', query: {error: 'Error: network database'}})
      })
    },
    unlockBadge(badge){
      this.$store.dispatch('badges/delBadge', badge)
      this.$vs.notify({title:'Badge Sbloccato',text:'Badge sbloccato manualmente',color:'warning'})
      setTimeout(()=>{this.getUsers()}, 1000)                        
    },
    getCurrentDate(){
      return  moment().format("YYYY-MM-DD")
    },
    getUsers(){
      var method = ''
      var axiosCall = ''
      var dataDB = ''
      if(this.data == "") {
        axiosCall = "users/"
        dataDB = ''
        method = '$get'
      } else {
        axiosCall = "users/search"
        dataDB = {entrata: moment(this.data).format("YYYY-MM-DD")}
        method = '$post'
      }
      this.$axios[method](axiosCall, dataDB)
      .then(res=>{
        this.users = res.map(el => {
          el.entrata = moment(el.entrata).format("DD-MM-YYYY HH:mm")
          el.uscita = (!el.uscita) ? '' : moment(el.uscita).format("DD-MM-YYYY HH:mm")
          return {
            ...el,
            ts_entrata:  moment(el.entrata, 'DD-MM-YYYY HH:mm').unix(),
            ts_uscita:  (!el.uscita) ? '' : moment(el.uscita, 'DD-MM-YYYY HH:mm').unix()
          }
        })
      })
      .catch(e=>{
        // this.$router.push({path:'/error', query: {error: 'Error: network database'}})
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
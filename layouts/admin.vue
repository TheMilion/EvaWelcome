<template>
  <div class="allPage">
    <vs-row style="height: 50px">
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
        EvaEnergyService
      </vs-col>
      <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
        <div v-if="(Object.keys(this.$store.getters['admin/getAdmin']).length != 0)">
        <span style="padding-right:10px">
            <nuxt-link to="/administrator/home">
                Home
            </nuxt-link>
        </span>|
        <span style="padding-right:10px; padding-left:10px"> 
            <nuxt-link to="/administrator/unlockBadge">Sblocca Badge</nuxt-link>
        </span>|
        <span style="padding-right:10px; padding-left:10px"> 
            <nuxt-link to="/administrator/createBadge">
                Crea Badge
            </nuxt-link>
            </span>|
        <span style="padding-right:10px; padding-left:10px">
            <nuxt-link to="/administrator/showUser">
                Mostra Utenti
            </nuxt-link>
        </span>
    </div>
      </vs-col>
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
        <p v-if="(Object.keys(this.$store.getters['admin/getAdmin']).length == 0)">Admin</p>
        <p v-else @click="logout()">Logout</p>
      </vs-col>
    </vs-row>
    <div class="nuxtchild">
    <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  head(){
    return {
      title: 'EvaAdmin',
      meta:[
        {name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}
      ],
       link: [
      {
        rel: "stylesheet",
        href: "../styleAdmin.css"
      }
    ]
    }
  },
  data(){
      return{

      }
  },
  methods: {
      logout(){
          this.$cookies.remove("adminTemp")
          this.$router.push("/administrator")
      }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.nuxtchild{
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    
}
.allPage{
padding:20px;
}
</style>

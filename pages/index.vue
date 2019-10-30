<template>
  <div class="container">

<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="5">
    <vs-card>
      <div slot="header">
        <h3>
          Ingresso
        </h3>
      </div>
      <div>
        <span><nuxt-link to="/ingresso"><img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" style="width:70%; padding: 20px"></nuxt-link></span>
      </div>
    </vs-card>
  </vs-col>
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="1"/>
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="5">
    <vs-card>
      <div slot="header">
        <h3>
          Uscita
        </h3>
      </div>
      <div>
     <span><nuxt-link to="/uscita"><img style="width: 70%;  padding: 20px" src="https://image.flaticon.com/icons/png/512/24/24069.png"></nuxt-link></span>
      </div>
    </vs-card>
  </vs-col>

<!--
    <vs-button 
      size="large" 
      class="button" 
      to="/ingresso"  
      icon="account_circle" 
      color="success"
    >
    Ingresso</vs-button>
    <vs-button 
      size="large" 
      class="button" 
      to="/uscita" 
      icon="exit_to_app"
    >
    Uscita</vs-button>
 --> 
  </div>
</template>

<script>
export default {
middleware: 'info',
mounted(){
  this.$cookies.remove("userTemp")
  this.$cookies.remove("userTempDetails")
}

}
</script>

<style scoped>
.button{
  margin: 20px;
}
.container {
  width: 85%;
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

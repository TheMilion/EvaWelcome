<template>
  <div class="container">
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
  </div>
</template>

<script>
export default {
middleware: 'info',
mounted(){
  this.$cookies.remove("userTemp")
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

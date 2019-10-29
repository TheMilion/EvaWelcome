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
  
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}


.button{
  margin: 20px;
}
</style>

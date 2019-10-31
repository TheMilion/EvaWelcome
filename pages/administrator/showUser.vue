<template>
  <div class="container">
<vs-row>
    <vs-col vs-w="12" style=" height: 140px;" vs-type="flex" vs-justify="center" vs-align="center">
     ciao
    </vs-col>
</vs-row>
  </div>
</template>

<script>
export default {
data(){
  return{
  }
  },
mounted() {
    if(Object.keys(this.$store.getters['admin/getAdmin']).length != 0) {
        console.log("ok")
    }
    else{
        this.$router.push("/administrator")
    }},
methods: {
  
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

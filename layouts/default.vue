<template>
  <div>
    <vs-row style="height: 50px" vs-type="flex">
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
        EvaEnergyService
      </vs-col>
      <vs-col vs-w="6"></vs-col>
      <vs-col vs-w="3" vs-type="flex" vs-justify="center" vs-align="center">
        <vs-button to="/" type="flat" icon="home" size="large">Home</vs-button>
      </vs-col>
    </vs-row>
    <div class="">
    <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: 'EvaWelcome',
      meta:[
        {name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}
      ]
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

</style>

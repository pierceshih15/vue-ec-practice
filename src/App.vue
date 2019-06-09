<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    this.$http.get(api).then(response => {
      console.log(response.data);
    });
  }
};
</script>

<style lang='scss'>
// 引入 Bootstrap 使用
@import "./assets/all";
</style>

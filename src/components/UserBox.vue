<template>
   <div class="container-box">
     <div class="box">
        <slot></slot>
     </div>
   </div>
</template>


<script setup>
</script>


<style scoped>
 .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 150px);
  }

  .box {
    width: 650px;
    height: 440px;
    background-color: rgba(0, 51, 101, 1);
    display: flex;
    flex-direction: column; 
    align-items: center; 
    padding-top: 40px; 
  }
</style>
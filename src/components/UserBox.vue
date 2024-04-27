<template>
   <div class="container-box">
     <div :class="[
      'box',
      {
          blue_color: background_color == 'blue_color',
          gray_color: background_color == 'gray_color'
      }
     ]">
        <slot></slot>
     </div>
   </div>
</template>


<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    background_color: {
      type: String as PropType<"blue_color" | "gray_color">,
      default: "blue_color"
    }

  }
    
}
</script>


<style scoped>
 .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 150px);
  }

.blue_color {
  background-color: rgba(0, 51, 101, 1);
}

.gray_color {
  background-color: rgba(221, 222, 221, 1);
}


  .box {
    width: 650px;
    height: 440px;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    padding-top: 40px; 
  }
</style>
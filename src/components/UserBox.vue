<template>
   <div class="container-box">
     <div :class="[
      'box',
      {
          blue_color: background_color == 'blue_color',
          gray_color: background_color == 'gray_color',
          white_color: background_color == 'white_color'
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
      type: String as PropType<"blue_color" | "gray_color" | "white_color">,
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
    min-height: calc(100vh - 500px);
    width: 80%;
    max-width: 700x;
  }

.blue_color {
  background-color: #003654;
}

.gray_color {
  background-color: rgba(221, 222, 221, 1);
}

.white_color {
  background-color: rgba(245, 245, 245);
}


  .box {
    width: 800px;
    height: 440px;
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center; 
    padding-top: 40px;
  }
</style>
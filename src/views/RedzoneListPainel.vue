<template>
  <div class="title-areas">
      <p>Redzone</p>
  </div>
  <div class="outer-container">
      <div class="table-container">
          <RedzoneList></RedzoneList>
      </div>
  </div>
</template>

<script setup lang="ts">
import RedzoneList from '@/components/RedzoneList.vue';
</script>


<style>
.outer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 15px;
  background-color: #f3f3f3;
  border-radius: 15px;
  align-items: center;
  width: 75%;
  margin-bottom: 150px;
}


.table-container {
  background-color: #f3f3f3;
  border-radius: 15px;
  align-items: center;
  width: 90%;
}

.title-areas {
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-areas p {
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.button-add {
  width: 200px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  background-color: #003365;
  font-weight: bold;
  color: #fafafa;
}

.button-add:hover {
  background-color: #2b547e;
}

.export-dropdown {
  display: flex;
  align-self: flex-end;
  margin-right: 35px;
  margin-bottom: 20px;
}
</style>
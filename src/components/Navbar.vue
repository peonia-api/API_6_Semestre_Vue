<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="./icons/Altave.png" alt="Logo" class="navbar-logo">
    </div>
    <ul class="nav-list">
      <li class="nav-item"><router-link to="/">RELATÓRIOS</router-link></li>
    </ul>
  </nav>
</template>

<script setup>

</script>

<style scoped>
.navbar {
  background-color: #003654;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px; 
}

.navbar-brand {
  margin-right: 20px; 
}

.navbar-logo {
  height: 20px;
  width: 125px;
  margin-right: 80px; 
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.nav-item {
  margin-right: 50px; 
}

.nav-item a {
  text-decoration: none;
  color: #FFFF;
  font-size: small;
  font-weight: bold;
  padding: 10px;
}

.nav-item a:hover {
  background-color: #03517b;
  border-radius: 10px;
}</style>
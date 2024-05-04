<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="./icons/Altave.png" alt="Logo" class="navbar-logo">
    </div>
    <ul class="nav-list">
      <li class="nav-item"><router-link to="/">PAINEL</router-link></li>
      <li class="nav-item"><router-link to="/report">RELATÓRIOS</router-link></li>
      <li class="nav-item"><router-link to="/userList">USUÁRIO</router-link></li>
      <li class="nav-item"><router-link to="/perfil">PERFIL</router-link></li>
    </ul>
    <ul class="nav-list-button">
      <li class="nav-item">
        <Button class="button-logout" @click="logout">
          <p>SAIR</p>
        </Button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { avisoLogout} from '../plugins/sweetalert';

const router = useRouter();

const logout = async () => {
  const result = await avisoLogout();
  if (result.isConfirmed) {
  localStorage.removeItem('token');
  router.push('/login');
  }
}
</script>

<style>
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
  align-items: end;
}
.nav-list-button {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: auto;
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
}

.button-logout {
    width: 60px; 
    height: 25px;
    background-color: #02314b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px; 
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: #fafafa;
}

.button-logout p {
  text-decoration: none;
  color: #fafafa;
  font-size: small;
  font-weight: 700;
  padding: 10px;
}
.button-logout:hover {
  background-color: #034163;
}
</style>

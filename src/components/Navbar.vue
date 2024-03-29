<template>
  <nav class="navbar">
    <img src="./icons/Altave.png" alt="Logo" class="navbar-logo">
    <ul class="nav-list">
      <li class="nav-item"><RouterLink to="/teste">PAINEL</RouterLink></li>
      <li class="nav-item"><RouterLink to="/relatorio">RELATÓRIOS</RouterLink></li>
      <li class="nav-item"><RouterLink to="/">USUÁRIOS</RouterLink></li>
    </ul>
  </nav>
</template>
  
  <style>
  .navbar {
    background-color: #003654;
    display: flex;
    align-items: center;
    height: 50px;
  }
  .navbar-logo{
    height: 20px;
    width: 125px;
    margin-left: 30px;
  }
  .nav-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    margin-left: 100px;
    align-items: center;
  }
  
  .nav-item {
    margin-right: 100px;
  }
  
  .nav-item:last-child {
    margin-right: 0;
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
  </style>
  
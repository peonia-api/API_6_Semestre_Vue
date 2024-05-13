<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="./icons/Altave.png" alt="Logo" class="logo-image">
      </div>
      <ul class="footer-nav-list">
        <li class="footer-nav-item"><a href="https://altave.com.br/nossa-historia/" target="_blank">SOBRE</a></li>
        <li class="footer-nav-item"><a href="https://altave.com.br/contato/" target="_blank">CONTATO</a></li>

      </ul>
    </div>
  </footer>
</template>

<style>
/* Estilize o footer */
.footer {
  width: 100%;
  height: 100px; /* Defina a altura desejada */
  background-color: #808080;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  position: relative; /* Fixe o footer na parte inferior da tela */
  bottom: 0; /* Alinhe o footer na parte inferior da tela */
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto; /* Centralize o conteúdo horizontalmente */
}

.footer-logo {
  margin-left: 30px; 
}

.logo-image {
  height: 20px;
  width: auto;
}

.footer-nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-grow: 1; 
  justify-content: center; 
}

.footer-nav-item {
  margin-right: 20px; 
}

.footer-nav-item a {
  text-decoration: none;
  color: white;
  font-size: 14px;
  margin: 15px;
}

.footer-nav-item a:hover {
  background-color: #969696;
  border-radius: 3px;
}
</style>

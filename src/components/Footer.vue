<template>
  <footer class="footer">
    <div class="footer-content">
      <img src="./icons/Altave.png" alt="Logo" class="footer-logo">
      <ul class="footer-nav-list">
        <li class="footer-nav-item"><RouterLink to="/sobre">SOBRE</RouterLink></li>
        <li class="footer-nav-item"><RouterLink to="/contato">CONTATO</RouterLink></li>
        <li class="footer-nav-item"><RouterLink to="/termos">TERMOS DE SERVIÇO</RouterLink></li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #808080;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.footer-content {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%; /* Largura máxima do conteúdo do footer */
}

.footer-logo {
  height: 20px;
  width: 125px;
  margin-right: 20px;
}

.footer-nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.footer-nav-item {
  margin-right: 10px; 
}

.footer-nav-item a {
  text-decoration: none;
  color: white;
  font-size: 14px;
}

.footer-nav-item a:hover {
  background-color: #969696;
  border-radius: 3px;
}

@media (min-width: 769px) {
  .footer-nav-item {
    margin-right: 20px; 
  }
}</style>
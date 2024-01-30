<script setup>

</script>

<template>
  <div class="container_footer">
    <div class="footer_box">
      <p class="footer_copyright_p">© 2024 Asobi. All rights reserved.</p>
      <p class="footer_made_p">Made by Hady, pointjumpit@gmail.com</p>
      <!--      <p @click="$router.push({ name: 'Beta' })" style="position: absolute; bottom: 0; color: #FFBA53">beta</p>-->
    </div>
  </div>
</template>

<style scoped>
.container_footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background: #FFBA53;
    margin-top: 30px;
}
.footer_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
}
.footer_copyright_p {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 0.8rem;
    color: #494949;
}
.footer_made_p {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 0.7rem;
    color: #494949;
    margin-top: 8px;
}

@media (max-width: 768px) {
    .container_footer {
        width: 100%;
        height: 70px;
    }
}
</style>

<script setup>

</script>

<template>
  <div class="container_header">
    <div class="header_box">
      <ul class="header_ul">
        <li>
          <img class="logo" src="/public/imgs/asobi_logo.png" alt="logo">
        </li>
        <li @click="$router.push({ name: 'DreamInterpretation' })">AI꿈해몽</li>
        <li @click="$router.push({ name: 'Lotto' })">AI로또번호</li>
        <li @click="$router.push({ name: 'Chat' })">AI심리상담</li>
<!--        <li>메뉴</li>-->
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container_header {
    display: flex;
    justify-content: center;
    width: 100%;
}
.header_box {
    display: flex;
    width: 350px;
    height: 50px;
}
.header_ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.header_ul li {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    color: #494949;
}
.header_ul li:hover {
    color: #212121;
}
.logo {
    width: 50px;
    height: 50px;
}

@media (max-width: 768px) {
    .header_box {
        width: 100%;
    }
    .header_ul {
        justify-content: space-evenly;
    }
    .logo {
        width: 40px;
        height: 40px;
    }
}
</style>
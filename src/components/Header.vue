<script setup>

</script>

<template>
  <div class="container_header">
    <div class="header_box">
      <ul class="header_ul">
        <li @click="$router.push({ name: 'Main' })">
          <img class="logo" src="/public/imgs/asobi_logo.png" alt="logo">
        </li>
        <li @click="$router.push({ name: 'DreamInterpretation' })">AI 꿈해몽</li>
        <li @click="$router.push({ name: 'Lotto' })">AI 로또번호</li>
        <li @click="$router.push({ name: 'Chat' })">AI 심리상담</li>
        <li @click="$router.push({ name: 'Mbti' })">AI MBTI 테스트</li>
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
    width: 450px;
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
        width: 30px;
        height: 30px;
    }
    .header_ul li {
        font-size: 0.7rem;
    }
}
</style>
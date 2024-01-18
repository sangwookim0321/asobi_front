<script setup>

</script>

<template>
  <div class="container_header">
    <div class="header_box">
      <ul class="header_ul">
        <li>AI 꿈해몽</li>
        <li>AI 로또번호</li>
        <li>AI 심리상담</li>
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
}

@media (max-width: 768px) {
    .header_box {
        width: 350px;
    }
}
</style>
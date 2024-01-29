<script setup>

</script>

<template>
  <div class="container">
    <div class="box" @click="$router.push({ name: 'DreamInterpretation' })">
      <img class="box_img" src="/public/imgs/MoneyverseStanding.png" alt="img"/>
      <div class="box_span">
        <span>AI 꿈 해몽 서비스</span>
      </div>
    </div>
    <div class="box" @click="$router.push({ name: 'Lotto' })">
      <img class="box_img" src="/public/imgs/moneyverse.png" alt="img"/>
      <div class="box_span">
        <span>AI 로또번호 추천 서비스</span>
      </div>
    </div>
    <div class="box" @click="$router.push({ name: 'Chat' })">
      <img class="box_img" src="/public/imgs/MoneyverseStanding2.png" alt="img"/>
      <div class="box_span">
        <span>AI 심리 - 고민 상담 서비스</span>
      </div>
    </div>
    <div class="box" @click="$router.push({ name: 'Mbti' })">
      <img class="box_img" src="/public/imgs/MoneyverseStanding3.png" alt="img"/>
      <div class="box_span">
        <span>AI MBTI 테스트 서비스</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* 박스를 컨테이너의 시작 부분에서 정렬 */
    gap: 20px; /* 박스 사이의 간격 */
    padding: 100px; /* 컨테이너의 안쪽 여백 */
}

.box {
    width: calc(50% - 10px); /* 간격을 고려하여 박스의 너비를 계산 */
    height: 300px; /* 높이를 200px로 설정하여 정사각형 모양을 유지, 300px까지 조절 가능 */
    background-color: #eee; /* 박스의 배경색 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #ccc; /* 박스의 테두리 */
    cursor: pointer;
    border-radius: 20px;
}

.box:hover {
    opacity: 0.8;
}

.box_img {
    width: 150px;
    height: 150px;
}

.box_span {
    margin-top: 30px;
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 1.1rem;
    color: #494949;
}

@media (max-width: 768px) {
    .container {
        padding: 20px; /* 컨테이너의 안쪽 여백 */
    }
    .box {
        width: calc(100% - 10px); /* 간격을 고려하여 박스의 너비를 계산 */
        height: 200px; /* 높이를 200px로 설정하여 정사각형 모양을 유지, 300px까지 조절 가능 */
    }
    .box:last-child {
        margin-bottom: 70px;
    }
    .box_img {
        width: 100px;
        height: 100px;
    }
    .box_span {
        margin-top: 10px;
        font-family: Consolas, sans-serif;
        font-weight: bold;
        font-size: 0.8rem;
        color: #494949;
    }
}
</style>

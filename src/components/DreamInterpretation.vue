<script setup>

</script>

<template>
  <div class="container_absolute"></div>
  <div class="container_dream">
    <div class="dream_box_title">
      <label>당신의 꿈을 해몽해드릴게요!</label>
    </div>
    <textarea class="dream_box" placeholder="꿈 내용을 입력해 주세요."></textarea>
    <button class="dream_button">해몽 시작</button>
  </div>
</template>

<style scoped>
.container_absolute {
    position: absolute;
    top: 20%;
    left: 0%;
    width: 500px;
    height: 500px;
    background-image: url("/public/imgs/astro.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.container_dream {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}
.dream_box_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    color: #494949;

}
.dream_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background: #e1e1e1;
    border-radius: 12px;
}
textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: 1rem;
    color: #494949;
    background: #c9c9c9;
    border-radius: 12px;
    padding: 1rem 1rem 3rem 1rem;
    font-family: Consolas, sans-serif;
}
.dream_button {
    margin-top: 8px;
    width: 120px;
    height: 35px;
    border: none;
    outline: none;
    background: #494949;
    color: #fff;
    font-family: Consolas, sans-serif;
    font-size: 1rem;
    border-radius: 12px;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.5s ease-in-out;
}
.dream_button:hover {
    opacity: 1;
    transition: 0.5s ease-in-out;
}
/* 스크롤바 전체 스타일 */
textarea::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
    height: 6px; /* 스크롤바의 높이 (가로 스크롤일 경우) */
}

/* 스크롤바 트랙 (바탕) 스타일 */
textarea::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 트랙의 배경색 */
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* 스크롤바 핸들 (움직이는 부분) 스타일 */
textarea::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 핸들의 색상 */
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

/* 스크롤바 핸들을 호버할 때 스타일 */
textarea::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 핸들의 색상 */
}

@media (max-width: 768px) {
    .container_absolute {
        top: 8%;
        left: 20%;
        width: 200px;
        height: 200px;
    }
    .container_dream {
        padding-top: 200px;
    }
    textarea {
        font-size: 0.9rem;
    }
    .dream_box_title {
        font-size: 1rem;
    }
    .dream_box {
        width: 200px;
        height: 200px;
    }
    .dream_button {
        bottom: 18%;
        width: 80px;
        height: 25px;
        font-size: 0.8rem;
    }
}
</style>
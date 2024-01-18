<script setup>
import { ref, getCurrentInstance } from 'vue'

const msg = ref('')
const msgShow = ref(false)
const btnShow = ref(false)
const loader = ref('')
const prompt = ref('')
const threadId = ref('')

const { proxy } = getCurrentInstance()

const start = () => {
    if (prompt.value === '') {
        msg.value = '내용을 입력해주세요.'
        msgShow.value = true
        return
    } else {
        msgShow.value = false
        btnShow.value = true
    }

    showLoading()

    const data = {
        prompt: prompt.value,
        type: 'dream',
    }

    proxy.$post(proxy.$GPT_DREAM_HELPER, 'Dream', data, false, (res) => {
        console.log(res)
        btnShow.value = false
        loader.value.hide()
    }, (err) => {
        console.log(err)
        btnShow.value = false
        loader.value.hide()
        if (err.response.status === 500) {
            msgShow.value = true
            msg.value = '서버 오류입니다. 잠시 후 다시 시도해주세요.'
        }
    })
}

const threadDelete = () => {
    const data = {
        threadId: threadId.value,
    }
    proxy.$delete(proxy.$GPT_THREAD_DELETE, 'Dream', {}, false, (res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })
}

const showLoading = () => {
    loader.value = proxy.$loading.show({
        container: proxy.$refs.textareaRef,
        zIndex: 9999,
        width: 100,
        height: 100,
        loader: "bars",
        canCancel: false,
    })
}
</script>

<template>
  <div class="container_absolute"></div>
  <div class="container_dream">
    <div class="dream_box_title">
      <label>1 ~ 현재까지의 회차 번호를 학습한 AI가 로또번호를 추천 해줍니다!</label>
    </div>
    <textarea class="dream_box" placeholder="꿈 내용을 입력해 주세요." v-model="prompt"></textarea>
    <button class="dream_button" v-show="!btnShow" @click="start">추첨 시작</button>
    <div v-show="btnShow" ref="textareaRef"></div>
    <p class="dream_p" v-show="msgShow">{{ msg }}</p>
  </div>
</template>

<style scoped>
.container_absolute {
    position: absolute;
    top: 30%;
    left: 5%;
    width: 400px;
    height: 400px;
    background-image: url("/public/imgs/moneyverse.png");
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

.dream_p {
    margin-top: 8px;
    font-family: Consolas, sans-serif;
    font-size: 0.8rem;
    color: #ff1f1f;
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
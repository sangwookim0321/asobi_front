<script setup>
import {getCurrentInstance, ref, nextTick, onMounted,onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import useApi from "@/commonJs/useApi.js"
const { proxy } = getCurrentInstance()
const router = useRouter()

const { httpPost, httpDelete, endPoints } = useApi()

const msg = ref('')
const msgShow = ref(false)
const btnShow = ref(false)
const success = ref(false)
const loader = ref('')

const chat_model = ref('')
const newMessage = ref('')
let messageId = 0
const messages = ref([
])

const threadId = ref('')

watch(() => btnShow.value, (val) => {
    if (val) {
        showLoading()
        setTimeout(() => {
            messages.value.push({ id: messageId++, content: '당신의 이름을 알려주십쇼.', type: 'gpt' })
            loader.value.hide()
        }, 1500)
    }
})

onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
})

const handleBeforeUnload = (event) => {
    threadDelete()
}

const start = () => {
    btnShow.value = true
}

const reset = () => {
    btnShow.value = false
    chat_model.value = ''
    messages.value = []
    messageId = 0
    newMessage.value = ''
    msgShow.value = false
    msg.value = ''
    success.value = false
    threadId.value = ''
    threadDelete()
    onMounted(() => {
        messages.value.push({ id: messageId++, content: '당신의 이름을 알려주십쇼.', type: 'gpt' })
    })
}

const showLoading = () => {
    loader.value = proxy.$loading.show({
        container: proxy.$refs.loaderRef,
        zIndex: 9999,
        width: 50,
        height: 50,
        loader: "dots",
        canCancel: false,
    })
}

const scrollToBottom = () => {
    nextTick(() => {
        const messagesContainer = document.querySelector('.mbti_box .messages')
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
    })
}

const threadDelete = () => {
    httpDelete(`${endPoints.GPT_THREAD_DELETE}?threadId=${threadId.value}`, 'Mbti', false, (res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })
}

const sendMessage = () => {
    if (success.value) {
        msg.value = '응답이 도착할때까지 기다려주세요.'
        msgShow.value = true
        return
    }
    if (newMessage.value.trim() !== '') {
        var messageContent = newMessage.value
        messages.value.push({ id: messageId++, content: newMessage.value, type: 'user' })
        newMessage.value = ''
        scrollToBottom()
    }

    newMessage.value = ''

    const data = {
        prompt: messageContent,
        threadId: threadId.value,
    }

    showLoading()
    success.value = true

    httpPost(endPoints.GTP_KADAN_AI, 'Beta', data, false, (res) => {
        messages.value.push({ id: messageId++, content: res.data[0].content, type: 'gpt' })
        threadId.value = res.data[0].threadId
        scrollToBottom()
        msgShow.value = false

    }, (err) => {
        console.log(err)
        msg.value = '서버 오류입니다. 잠시 후 다시 시도해주세요.'
        msgShow.value = true
    }, null, () => {
        loader.value.hide()
        success.value = false
    })
}

</script>

<template>
<!--  <div class="container_absolute"></div>-->
  <div class="container_mbti">
    <div class="mbti_box_title">
      <label v-show="!btnShow">위대한 AI 카단과 <br/> 대화를 시작해볼까요?</label>
      <label style="color: #FFBA53" v-show="btnShow">AI 카단은 무엇이든 가능합니다! <br/> 대화를 시작해보세요.</label>
    </div>
    <img v-show="!btnShow" class="mbti_avata_img" src="/imgs/kadan.png" alt="avata"/>
    <span v-show="!btnShow" class="mbti_avata_name">AI 카단</span>
    <div v-show="btnShow" class="mbti_box">
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id" :class="['message', msg.type]">
          <template v-if="msg.type === 'user'">
            <!-- 사용자 메시지 -->
            <div class="message-content">{{ msg.content }}</div>
          </template>
          <template v-else>
            <!-- GPT 응답 메시지 -->
            <img class="profile-img" src="/imgs/kadan.png" alt="GPT">
            <div class="message-details">
              <div class="gpt-name">AI 카단 {{ chat_model }}</div>
              <div class="message-content">{{ msg.content }}</div>
            </div>
          </template>
        </div>
        <div style="margin-left: 20px" ref="loaderRef"></div>
      </div>
    </div>
    <div class="div_form" v-show="btnShow">
      <input type="text" maxlength="100" v-model="newMessage" placeholder="메시지 입력..." @keyup.enter="sendMessage">
      <button class="mbti_submit" @click="sendMessage">보내기</button>
    </div>

    <button class="mbti_button" v-show="!btnShow" @click="start">시작하기</button>
    <button class="mbti_button" v-show="btnShow" @click="reset">다시하기</button>
    <p class="mbti_p" v-show="msgShow">{{ msg }}</p>
  </div>
</template>

<style scoped>
.container_absolute {
    position: absolute;
    top: 30%;
    left: 5%;
    width: 400px;
    height: 400px;
}
.container_mbti {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}
.mbti_avata_img {
    width: 80px;
    height: 100px;
    border-radius: 50%;
    margin-top: 100px;
}
.mbti_avata_name {
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    color: #494949;
    margin-top: 20px;
}
.mbti_box_title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.5;
    width: 100%;
    height: 50px;
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    color: #494949;
    margin-bottom: 30px;
}
.mbti_button {
    margin-top: 50px;
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
.mbti_button:hover {
    opacity: 1;
    transition: 0.5s ease-in-out;
    background: #4b4b4b;
}
.mbti_box {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 500px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow-y: auto;
}
.mbti_p {
    margin-top: 8px;
    font-family: Consolas, sans-serif;
    font-size: 0.8rem;
    color: #ff1f1f;
}
.div_form {
    display: flex;
    width: 500px;
}

input[type="text"] {
    flex-grow: 1;
}

input {
    padding: 5px 10px;
    border: 1px solid #ccc;
    outline: none;
}

.mbti_submit {
    padding: 5px 10px;
    background: #4b4b4b;
    border: none;
    color: #fff;
    cursor: pointer;
}
.messages {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
    overflow-x: hidden;
}

.message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 100%;
    padding: 4px;
}

.user .message-content {
    background-color: #f0f0f0;
    color: #212121;
    padding: 5px 10px;
    border-radius: 10px;
    line-height: 1.4;
    max-width: 80%;
    word-wrap: break-word;
    align-self: flex-end;
}

.message-content {
    font-size: 0.8rem;
}

.gpt .message-content {
    background-color: #4b4b4b;
    color: #fff;
    line-height: 1.4;
    align-self: flex-start;
}

.gpt {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.gpt-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.gpt .profile-img {
    width: 40px;
    height: 50px;
    border-radius: 50%;
    background: #494949;
}

.gpt .message-details {
    margin-left: 10px;
}

.message-content {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #494949;
    color: #fff;
    max-width: 80%; /* 최대 길이를 80%로 설정 */
    word-wrap: break-word; /* 자동 줄바뀜 활성화 */
}

/* 스크롤바 전체 스타일 */
div::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
    height: 6px; /* 스크롤바의 높이 (가로 스크롤일 경우) */
}

/* 스크롤바 트랙 (바탕) 스타일 */
div::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 트랙의 배경색 */
}

/* 스크롤바 핸들 (움직이는 부분) 스타일 */
div::-webkit-scrollbar-thumb {
    background: #888; /* 스크롤바 핸들의 색상 */
}

/* 스크롤바 핸들을 호버할 때 스타일 */
div::-webkit-scrollbar-thumb:hover {
    background: #555; /* 호버 시 핸들의 색상 */
}

@media (max-width: 768px) {
    .container_absolute {
        top: 8%;
        left: 20%;
        width: 200px;
        height: 200px;
    }
    .mbti_avata_img {
        width: 100px;
        height: 100px;
        margin-top: 50px;
    }
    .mbti_avata_name {
        font-size: 1rem;
        margin-top: 10px;
    }
    .mbti_box_title {
        margin-top: 50px;
        margin-bottom: 0;
        font-size: 0.8rem;
    }
    .mbti_button {
    }
    .mbti_box {
        width: 90%;
        height: 300px;
    }
    .div_form {
        display: flex;
        width: 90%;
    }
    .gpt-name {
        font-size: 0.7rem;
    }
    .message-content {
        font-size: 0.7rem;
    }
}
</style>
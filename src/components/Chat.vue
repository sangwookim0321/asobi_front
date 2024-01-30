<script setup>
import { getCurrentInstance, ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from "vue-router"
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
    if (chat_model.value === '') {
        msg.value = 'AI 상담사를 선택해주세요.'
        msgShow.value = true
        return
    }

    msg.value = ''
    msgShow.value = false
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
    threadDelete()
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
        const messagesContainer = document.querySelector('.chat_box_2 .messages')
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
    if (newMessage.value.trim() === '') {
        msg.value = '메시지를 입력해주세요.'
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

    let type = ''
    if (chat_model.value === '신지윤') {
        type = 'MODEL_1'
    } else if (chat_model.value === '남도윤') {
        type = 'MODEL_2'
    }

    const data = {
        prompt: messageContent,
        type: type,
        threadId: threadId.value,
    }

    showLoading()
    success.value = true

    httpPost(endPoints.GPT_CHAT_HELPER, 'Chat', data, false, (res) => {
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
  <div class="container_absolute"></div>
  <div class="container_chat">
    <div class="chat_box_title">
      <label v-show="!btnShow">AI 에게 뭐든지 상담을 해보세요! <br/> 우선 AI 상담사를 골라볼까요?</label>
      <label v-show="btnShow">상담사에게 인사 후 상담을 시작해보세요!</label>
    </div>

    <div v-show="!btnShow" class="chat_box_1">

      <div class="chat_model_box" @click="chat_model = '신지윤'">
        <div :style="chat_model === '신지윤' ? 'opacity: 0.8' : ''" class="chat_model_1">
          <img class="chat_model_1_img" src="/public/imgs/ai-model-img1.png" alt="img"/>
        </div>
        <div class="chat_model_span">
          <span :style="chat_model === '신지윤' ? 'color: #3DA46C;' : ''">AI 상담사 신지윤</span>
        </div>
      </div>
      <div class="chat_model_box" @click="chat_model = '남도윤'">
        <div :style="chat_model === '남도윤' ? 'opacity: 0.8' : ''" class="chat_model_2">
          <img class="chat_model_2_img" src="/public/imgs/ai-model-img2.png" alt="img"/>
        </div>
        <div class="chat_model_span">
          <span :style="chat_model === '남도윤' ? 'color: #3DA46C;' : ''">AI 상담사 남도윤</span>
        </div>
      </div>

    </div>

    <div v-show="btnShow" class="chat_box_2">
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id" :class="['message', msg.type]">
          <template v-if="msg.type === 'user'">
            <!-- 사용자 메시지 -->
            <div class="message-content">{{ msg.content }}</div>
          </template>
          <template v-else>
            <!-- GPT 응답 메시지 -->
            <img class="profile-img" :src="chat_model === '신지윤' ? '/public/imgs/ai-model-img1.png' : '/public/imgs/ai-model-img2.png'" alt="GPT">
            <div class="message-details">
              <div class="gpt-name">AI 상담사 {{ chat_model }}</div>
              <div class="message-content">{{ msg.content }}</div>
            </div>
          </template>
        </div>
        <div style="margin-left: 50px" ref="loaderRef"></div>
      </div>
    </div>
      <div class="div_form" v-show="btnShow">
        <input type="text" maxlength="100" v-model="newMessage" placeholder="메시지 입력..." @keyup.enter="sendMessage">
        <button class="chat_submit" @click="sendMessage">보내기</button>
      </div>

    <button class="chat_button" v-show="!btnShow && !success" @click="start">선택 완료</button>
    <p class="chat_p" v-show="msgShow">{{ msg }}</p>
    <button class="chat_button" v-show="btnShow" @click="reset">다시하기</button>
  </div>
</template>

<style scoped>
.container_absolute {
    position: absolute;
    top: 40%;
    left: 5%;
    width: 400px;
    height: 400px;
    background-image: url("/public/imgs/MoneyverseStanding2.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.container_chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.chat_box_title {
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
}
.chat_box_1 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 500px;
    border-radius: 12px;
    margin-top: 140px;
}
.chat_model_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
}
.chat_model_span {
    margin-top: 32px;
    font-family: Consolas, sans-serif;
    font-weight: bold;
    font-size: 1rem;
    color: #494949;
    cursor: pointer;
}
.chat_model_1 {
    display: flex;
    background: #494949;
    border-radius: 50%;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}
.chat_model_1:hover {
    transform: scale(1.2, 1.2);
    transition: 0.3s ease-in-out;
    opacity: 0.8;
}
.chat_model_1_img {
    width: 150px;
    height: 150px;
}
.chat_model_2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #494949;
    border-radius: 50%;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}
.chat_model_2:hover {
    transform: scale(1.2, 1.2);
    transition: 0.3s ease-in-out;
    opacity: 0.8;
}
.chat_model_2_img {
    width: 150px;
    height: 150px;
}
.chat_button {
    margin-top: 30px;
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
.chat_button:hover {
    opacity: 1;
    transition: 0.5s ease-in-out;
    background: #3DA46C;
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

.chat_p {
    margin-top: 8px;
    font-family: Consolas, sans-serif;
    font-size: 0.8rem;
    color: #ff1f1f;
}

.chat_box_2 {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 500px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow-y: auto;
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
}

.message-content {
    font-size: 0.8rem;
}

.gpt .message-content {
    background-color: #3DA46C;
    color: #fff;
    line-height: 1.4;
    align-self: flex-start;
}

.gpt {
    display: flex;
    flex-direction: row;
}

.gpt-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.gpt .profile-img {
    width: 50px;
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
    max-width: 80%;
    word-wrap: break-word;
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

.chat_submit {
    padding: 5px 10px;
    background: #3DA46C;
    border: none;
    color: #fff;
    cursor: pointer;
}
.chat_submit:hover {
    background: #368f5f;
}
@media (max-width: 768px) {
    .container_absolute {
        top: 8%;
        left: 20%;
        width: 200px;
        height: 200px;
    }
    .container_chat {
        padding-top: 200px;
    }
    textarea {
        font-size: 0.9rem;
    }
    .chat_box_title {
        font-size: 0.8rem;
    }
    .chat_box_1 {
        width: 200px;
        height: 200px;
        margin-top: 12px;
    }
    .chat_box_2 {
        width: 90%;
        height: 300px;
    }
    .chat_button {
        bottom: 18%;
        width: 100px;
        height: 35px;
        font-size: 0.8rem;
    }
    .chat_model_1:hover {
        transform: scale(1.1, 1.1);
        transition: 0.3s ease-in-out;
        opacity: 0.8;
    }
    .chat_model_2:hover {
        transform: scale(1.1, 1.1);
        transition: 0.3s ease-in-out;
        opacity: 0.8;
    }
    .chat_model_box {
        margin: 0 10px;
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
    .chat_model_span {
        font-size: 0.8rem;
    }
}
</style>
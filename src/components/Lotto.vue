<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

const msg = ref('')
const msgShow = ref(false)
const btnShow = ref(false)
const success = ref(false)
const loader = ref('')

const item = ref({ content: [], role: '', threadId: '' })

onMounted(() => {
    const canvas = document.getElementById('lottoCanvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 500 // lotto_box의 너비에 맞춤
    canvas.height = 500 // lotto_box의 높이에 맞춤

    class Ball {
        constructor(x, y, number) {
            this.x = x
            this.y = y
            this.number = number
            this.size = 20
            this.c = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
            this.angle = Math.random() * (Math.PI * 2)
            this.power = 8
            this.directionX = this.power * Math.cos(this.angle)
            this.weight = this.power * Math.sin(this.angle)
        }

        update() {
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.weight *= -1
            }

            if (this.x > canvas.width - this.size || this.x - this.size < 0) {
                this.directionX *= -1
            }

            this.x += this.directionX
            this.y += this.weight
        }

        draw() {
            ctx.fillStyle = this.c
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.fill()

            ctx.fillStyle = 'black'
            ctx.font = '15px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(this.number, this.x, this.y)
        }
    }

    let balls = []

    function init() {
        for (let i = 0; i < 45; i++) {
            balls.push(new Ball(canvas.width / 2, canvas.height / 2, i + 1))
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < balls.length; i++) {
            balls[i].update()
            balls[i].draw()
        }

        requestAnimationFrame(animate)
    }

    init()
    animate()
})

const start = () => {
    const today = new Date().toISOString().split('T')[0] // 현재 날짜를 'YYYY-MM-DD' 형식으로 가져옴
    const storedData = JSON.parse(localStorage.getItem('lottoApiCount') || '{"date": "", "count": 0}') // 로컬 스토리지에 저장된 API 호출 횟수를 가져옴

    if (storedData.date === today && storedData.count >= 1) {
        // 오늘 날짜에 이미 2회 이상 API를 호출했다면 메시지를 표시하고 함수를 종료
        msg.value = '로또번호 추천 서비스는 하루 1회만 이용 가능합니다.'
        msgShow.value = true
        return
    }

    if (storedData.date !== today) {
        // 날짜가 변경되었다면 카운트를 초기화
        storedData.date = today
        storedData.count = 0
    }

    msg.value = '10초~1분 이상의 시간이 소요됩니다. 잠시만 기다려주세요.'
    msgShow.value = true
    btnShow.value = true

    showLoading()

    const data = {
        type: 'lotto',
    }

    proxy.$post(proxy.$GPT_HELPER, 'Lotto', data, false, (res) => {
        const { role, threadId } = res.data[0]
        let contentArray = JSON.parse(res.data[0].content)

        item.value = { content: contentArray, role, threadId }

        btnShow.value = false
        success.value = true
        loader.value.hide()
        msg.value = '추천 번호가 나왔어요! 1등 당첨을 기원합니다.'

        // API 호출 성공 시 카운트를 증가시키고 로컬 스토리지에 저장
        storedData.count += 1
        localStorage.setItem('lottoApiCount', JSON.stringify(storedData))

        threadDelete()
    }, (err) => {
        console.log(err)
        btnShow.value = false
        msgShow.value = false
        loader.value.hide()
        if (err.response.status === 500) {
            msgShow.value = true
            msg.value = '서버 오류입니다. 잠시 후 다시 시도해주세요.'
        }
    })
}

const threadDelete = () => {
    proxy.$delete(`${proxy.$GPT_THREAD_DELETE}?threadId=${item.value.threadId}`, 'Lotto', false, (res) => {
        console.log(res)
    }, (err) => {
        console.log(err)
    })
}

const showLoading = () => {
    loader.value = proxy.$loading.show({
        container: proxy.$refs.textareaRef,
        zIndex: 9999,
        width: 60,
        height: 60,
        loader: "bars",
        canCancel: false,
    })
}

const reset = () => {
    item.value = { content: [], role: '', threadId: '' }
    success.value = false
    msgShow.value = false
    threadDelete()
}
</script>

<template>
  <div class="container_absolute"></div>
  <div class="container_lotto">
    <div class="lotto_box_title">
      <label>1 ~ 현재까지의 회차 번호를 학습한 AI가 로또번호를 추천 해줍니다!</label>
    </div>
    <div class="lotto_box">
      <canvas style="border: 1px solid #494949" v-show="item.content.length === 0" id="lottoCanvas"></canvas> <!-- 캔버스 추가 -->
      <div v-show="item.content.length > 0" class="numbers-container">
        <div :style="index === item.content.length - 1 ? 'color: #ab74e1; font-weight: bold' : ''" v-for="(number, index) in item.content" :key="index" class="number-circle">
          <span v-if="index === item.content.length - 1">+</span>
          {{ number }}
        </div>
      </div>
    </div>
    <button class="lotto_button" v-show="!btnShow && !success" @click="start">추첨하기</button>
    <button class="lotto_button" v-show="success" @click="reset">다시하기</button>
    <div v-show="btnShow" ref="textareaRef"></div>
    <p :style="msg === '10초~1분 이상의 시간이 소요됩니다. 잠시만 기다려주세요.' || msg === '추천 번호가 나왔어요! 1등 당첨을 기원합니다.' ? 'color: #3DA46C' : ''" class="lotto_p" v-show="msgShow">{{ msg }}</p>
  </div>
</template>


<style scoped>
.container_absolute {
    position: absolute;
    top: 40%;
    left: 5%;
    width: 400px;
    height: 400px;
    background-image: url("/imgs/moneyverse.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.container_lotto {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.lotto_box_title {
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
.lotto_box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    border-radius: 12px;
}
#lottoCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
.lotto_button {
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
.lotto_button:hover {
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

.lotto_p {
    margin-top: 8px;
    font-family: Consolas, sans-serif;
    font-size: 0.8rem;
    color: #ff1f1f;
}

.number-circle {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #494949;
    color: #fff;
    margin: 5px;
    font-size: 1rem;
}
.numbers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    .container_absolute {
        top: 8%;
        left: 20%;
        width: 200px;
        height: 200px;
    }
    .container_lotto {
        padding-top: 200px;
    }
    textarea {
        font-size: 0.9rem;
    }
    .lotto_box_title {
        width: 80%;
        font-size: 0.8rem;
        text-align: center;
    }
    .lotto_box {
        width: 200px;
        height: 200px;
    }
    .lotto_button {
        margin-top: 18px;
        bottom: 18%;
        width: 100px;
        height: 35px;
        font-size: 0.8rem;
    }
    .lotto_p {
        width: 80%;
        text-align: center;
    }
}
</style>
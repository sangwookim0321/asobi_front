<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

onMounted(() => {
    const canvas = document.getElementById('lottoCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500; // lotto_box의 너비에 맞춤
    canvas.height = 500; // lotto_box의 높이에 맞춤

    class Ball {
        constructor(x, y, number) {
            this.x = x;
            this.y = y;
            this.number = number;
            this.size = 20;
            this.c = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
            this.angle = Math.random() * (Math.PI * 2);
            this.power = 8;
            this.directionX = this.power * Math.cos(this.angle);
            this.weight = this.power * Math.sin(this.angle);
        }

        update() {
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.weight *= -1;
            }

            if (this.x > canvas.width - this.size || this.x - this.size < 0) {
                this.directionX *= -1;
            }

            this.x += this.directionX;
            this.y += this.weight;
        }

        draw() {
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.font = '15px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.number, this.x, this.y);
        }
    }

    let balls = [];

    function init() {
        for (let i = 0; i < 45; i++) {
            balls.push(new Ball(canvas.width / 2, canvas.height / 2, i + 1));
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < balls.length; i++) {
            balls[i].update();
            balls[i].draw();
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
});
</script>



<template>
  <div class="container_absolute"></div>
  <div class="container_lotto">
    <div class="lotto_box_title">
      <label>1 ~ 현재까지의 회차 번호를 학습한 AI가 로또번호를 추천 해줍니다!</label>
    </div>
    <div class="lotto_box">
      <canvas id="lottoCanvas"></canvas> <!-- 캔버스 추가 -->
    </div>
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
.container_lotto {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
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
    background: #e1e1e1;
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
        font-size: 1rem;
    }
    .lotto_box {
        width: 200px;
        height: 200px;
    }
    .lotto_button {
        bottom: 18%;
        width: 80px;
        height: 25px;
        font-size: 0.8rem;
    }
}
</style>
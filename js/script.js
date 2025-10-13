// 日期
const dateEl = document.getElementById("date");
const nowDate = new Date();
dateEl.innerText = nowDate.toDateString();

// 分-個位數
const minuteUnits = document.getElementById("minute-units");
const minuteUnitsArray = [];
// 圓的半徑(px（長度）)
const radius = 225; // 450的一半
for (let i = 0; i < 10; i++) {
  const rad = (i - 2) * 36;
  // Math.PI / 180 是角度轉弧度的轉換公式，代表每度幾個弧度
  const arc = (rad * Math.PI) / 180;
  // 數學上「單位圓」的標準公式
  // 根據圓形的三角函數定義來的
  // 在半徑為 r 的圓上，角度是rad時
  // X 座標 = r × cos(角度)
  // Y 座標 = r × sin(角度)
  const x = radius * Math.cos(arc); // X 座標（橫向）
  const y = radius * Math.sin(arc); // Y 座標（縱向）

  const div = document.createElement("div");
  div.className = "seat";
  // 以中心點為基準放置東西的通用寫法
  // left = `calc(50% + x - 元件寬度的一半)`
  // top  = `calc(50% + y - 元件高度的一半)`
  div.style.left = `calc(50% + ${x}px - 25px)`; // 水平位置
  div.style.top = `calc(50% + ${y}px - 25px)`; // 垂直位置
  minuteUnits.append(div);
  minuteUnitsArray.push(div);
}

const minuteUnitsText = 10; //0-9
const updateSeat = () => {
  const now = new Date().getMinutes();
  const mU = now % 10;

  for (let i = 0; i < 10; i++) {
    // 31 % 10 = 1
    // 1 - ((1-2)+10) % 10 = -8 < 0
    // (-8+10) % 10 = 2 > 0
    const text = (mU - ((i - 2 + minuteUnitsText) % minuteUnitsText) + 10) % 10;
    minuteUnitsArray[i].innerText = text;

    const highlight = 2;
    if (i === highlight) {
      minuteUnitsArray[i].classList.add("highlight");
    } else {
      minuteUnitsArray[i].classList.remove("highlight");
      minuteUnitsArray[i].classList.add("minute-units-text");
    }
  }
};
updateSeat();
setInterval(updateSeat, 1000);

/***************/
// 分-十位數
const minuteTens = document.getElementById("minute-tens");
let nowMT = null;
let prevMU = null; // 判斷個位數是否從9變成0

const minuteTensTime = () => {
  const now = new Date().getMinutes();
  return Math.floor(now / 10);
};

const showMT = (time) => {
  if (time === nowMT) return;
  nowMT = time;

  // 清空後建立前後面板
  minuteTens.innerHTML = "";

  const front = document.createElement("div");
  front.className = "mt-div";
  front.innerText = time;

  const back = document.createElement("div");
  back.className = "mt-div mt-div-back";
  back.innerText = time;

  minuteTens.append(front);
  minuteTens.append(back);
};

showMT(minuteTensTime());
setInterval(() => {
  const mU = new Date().getMinutes() % 10;

  if (prevMU === 9 && mU === 0) {
    // 設定翻牌的動畫
    minuteTens.style.transition = "transform 0.4s ease"; // 延長動畫時間
    minuteTens.style.transform = "translate(-50%, -50%) rotateY(180deg)"; // 進行180度翻轉

    // 更新數字
    setTimeout(() => {
      showMT(minuteTensTime());
      // 重置旋轉狀態
      minuteTens.style.transition = "none"; // 移除翻牌動畫
      minuteTens.style.transform = "translate(-50%, -50%) rotateY(0deg)"; // 回到初始狀態
    }, 100);
  }
  prevMU = mU; // 更新prevMU的值
}, 1000);

/***************/
// 時-十位數
const hourTens = document.getElementById("hour-tens");
let nowHT = null;

const hourTensTime = () => {
  const now = new Date().getHours();
  return Math.floor(now / 10);
};

const showHT = (time) => {
  if (time === nowHT) return;
  nowHT = time;

  // 清空後建立前後面板
  hourTens.innerHTML = "";

  const front = document.createElement("div");
  front.className = "ht-div";
  front.innerText = time;

  const back = document.createElement("div");
  back.className = "ht-div ht-div-back";
  back.innerText = time;

  hourTens.append(front);
  hourTens.append(back);
};

showHT(hourTensTime());

let prevHUL = null; // 判斷個位數是否從9變成0
setInterval(() => {
  const HU = new Date().getHours() % 10;
  const HT = Math.floor(new Date().getHours() / 10);

  if (HT !== nowHT) {
    // 設定翻牌的動畫
    hourTens.style.transition = "transform 0.4s ease"; // 延長動畫時間
    hourTens.style.transform = "translate(-50%, -50%) rotateX(180deg)"; // 進行180度翻轉

    // 更新數字
    setTimeout(() => {
      showHT(HT);
      // 重置旋轉狀態
      hourTens.style.transition = "none"; // 移除翻牌動畫
      hourTens.style.transform = "translate(-50%, -50%) rotateX(0deg)"; // 回到初始狀態
    }, 100);
  }
  prevHUL = HU; // 更新prevHU的值
}, 1000);

/***************/
// 時-個位數
const hUList = document.getElementById("hu-list");
const hUHeight = 400;
const hUNums = 5;
const hUNumsHeight = 75;

const hourUnitsTime = () => {
  const now = new Date().getHours();
  return now % 10;
};

for (let i = -2; i < 13; i++) {
  // -2 ~ 12（總共15項）
  const hUDiv = document.createElement("div");
  hUDiv.className = "hu-number";
  hUDiv.innerText = (i + 10) % 10;
  hUList.append(hUDiv);
}

let prevHU = null;
const updateHU = () => {
  const hU = hourUnitsTime();
  if (hU !== prevHU) {
    // 取得目前時間對應的 index：中間是2~11（因為前面多了2個）
    const index = hU + 2;

    // 加動畫
    hUList.style.transition = "top 0.3s ease-out";
    hUList.style.top = `-${hU * hUNumsHeight}px`;

    // 標記 highlight（所有節點數為15）
    const huNumbers = document.querySelectorAll(".hu-number");
    huNumbers.forEach((el, i) => {
      if (i === index) {
        el.classList.add("hu-highlight");
      } else {
        el.classList.remove("hu-highlight");
      }
    });

    prevHU = hU;

    // 無限捲動：等動畫跑完後重設位置，不讓使用者察覺
    setTimeout(() => {
      hUList.style.transition = "none";
      hUList.style.top = `-${hU * hUNumsHeight}px`;
    }, 310);
  }
};

updateHU();
setInterval(updateHU, 1000);

/***************/
// 秒
const second = document.getElementById("second");
const dots = [];

for (let i = 0; i < 60; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  // 彩虹色設定
  // 計算每個點的顏色角度
  const hue = (i / 60) * 360;
  // hsl() 函數標記根據其色相、飽和度和明度來表達 sRGB 顏色
  const color = `hsl(${hue}, 80%, 60%)`;
  // 設定 CSS 變數
  // element.style.setProperty('--變數名稱', 值)
  // CSS 中變數的寫法一定要以 -- 開頭
  dot.style.background = color;
  // 設定 HTML 元素的 自訂屬性 data-*
  // 屬於 HTML 屬性資料儲存機制
  // element.dataset.屬性名稱 = 值;
  dot.dataset.color = color;

  // 定位點
  // 算出這個點在圓上的角度（以弧度為單位）
  const angle = ((2 * Math.PI) / 60) * i;
  // 對應的點在 X 與 Y 軸 的位置偏移量
  // 減掉 Math.PI / 2是為了讓第一個點（0 秒）從上方（12 點鐘方向）開始
  // 正常 0 弧度 是右邊（3 點鐘方向）
  // 從上面開始轉要把整個圓「逆時針旋轉 90 度」
  // 用三角函數公式，算出每個點在圓上的 x、y 位置
  const center = { x: 300, y: 300 }; // 圓心的位置，圓半徑 + 點半徑(px（座標）)
  const secondRadius = 270;
  const x = center.x + Math.cos(angle - Math.PI / 2) * secondRadius;
  const y = center.y + Math.sin(angle - Math.PI / 2) * secondRadius;
  // x - (px) / y - (px)：點寬高是 16px，所以要往回移一半才能讓圓心對齊
  dot.style.left = `${x - 8}px`;
  dot.style.top = `${y - 8}px`;

  second.append(dot);
  dots.push(dot);
}

setInterval(() => {
  const now = new Date().getSeconds();

  // 先把所有點 opacity 降低（讓它慢慢 fade out）
  dots.forEach((dot) => {
    let opacity = parseFloat(dot.style.opacity) || 0; //取得目前透明度（預設為 0）
    opacity = Math.max(0, opacity - 0.2); // 每秒讓透明度減少 0.2，讓尾巴慢慢消失
    dot.style.opacity = opacity;
    dot.style.boxShadow = "none"; //移除光暈效果（但如果該點是當前秒數，後面會重新加回來）
  });

  // 點亮當前秒針位置
  const dot = dots[now]; //找到目前「該秒」的點
  dot.style.opacity = 1; //把它的透明度設為 1
  const color = dot.dataset.color;
  dot.style.backgroundColor = color;
  dot.style.boxShadow = `0 0 5px 2px ${color}`;
}, 1000);

/***************/
// particles.js
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "js/particlesjs-config.json", function () {
  console.log("callback - particles.js config loaded");
});

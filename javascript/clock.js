const currentTimeText = document.querySelector(".current-time");

function getCurrentTime() {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentSecond = date.getSeconds();
    currentTimeText.innerText =
        `${currentHour > 12 ? currentHour - 12 : currentHour
        } : ${currentMinute > 9 ? currentMinute : `0${currentMinute}`} : ${currentSecond > 9 ? currentSecond : `0${currentSecond}`} `;
}

function init() {
    getCurrentTime();
    setInterval(getCurrentTime, 1000);
}

init();
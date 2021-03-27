const form = document.querySelector(".name-asking-form");
const input = document.querySelector(".name-asking-input");
const welcome = document.querySelector(".name-welcome");
const isNowShowing = "is-now-showing";
const nameKey = "name";

function whenNameSubmitted(event) {
    event.preventDefault();
    const userName = input.value;
    localStorage.setItem(nameKey, userName);
    showGreeting(userName);
}

function requestName() {
    welcome.classList.remove(isNowShowing);
    form.classList.add(isNowShowing);
    form.addEventListener("submit", whenNameSubmitted);
}

function showGreeting(userName) {
    form.classList.remove(isNowShowing);
    welcome.classList.add(isNowShowing);
    welcome.innerText = `WELCOME, ${userName}.`;
}

function init() {
    const userName = localStorage.getItem(nameKey);
    if (userName === null) {
        requestName();
    }
    else {
        showGreeting(userName);
    }
}

init();
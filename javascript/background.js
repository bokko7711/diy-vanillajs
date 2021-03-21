const body=document.querySelector(".body");
const NUMBER_CEILING=3;

function getRandomNumber(ceil){
    return (
        Math.floor(Math.random()*ceil)+1
    );
}

function getWallPaper(randomNumber){
    const image=new Image();
    image.src=`images/image${randomNumber}.jpg`;
    image.classList.add("wallpaper");
    body.append(image);
}

function init(){
    const ranNum=getRandomNumber(NUMBER_CEILING);
    getWallPaper(ranNum);
}

init();
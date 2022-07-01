let Result = document.getElementById("result");
let ChanceArea = document.getElementById("chances");
let userInput = document.getElementById("user-input");
let userReset = document.getElementById("user-reset");
let userButton = document.getElementById("user-button");
let chances = 5;
let gameOver = false;
let history = [];


userButton.addEventListener("click", play);
userReset.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
});

function pickRandomNum () {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답 : " , computerNum);
}

function play () {
    if(userInput.value < 1 || userInput.value > 100){
        Result.textContent = "1부터 100사이의 숫자를 입력하여 주세요";
        return;
    }
    

    if(history.includes(userInput.value)){
        Result.textContent = "이미 시도한 값입니다.";
        return;
    }
    chances --;
   
    if(userInput.value > computerNum){
        Result.textContent = "down";
    } else if(userInput.value < computerNum){
        Result.textContent = "up";
    } else{
        Result.textContent = "correct";
        gameOver = true;
    }
    ChanceArea.textContent = `남은 기회 : ${chances}`;
    history.push(userInput.value);

    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        userButton.disabled = true;
    }
    console.log(history);
}
    
function reset () {
    Result.textContent = "숫자를 입력해주세요";
    chances = 5;
    ChanceArea.textContent = `남은 기회 : ${chances}`;
}



pickRandomNum();
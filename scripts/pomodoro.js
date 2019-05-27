const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const timeDisplay = document.querySelector(".time-remaining");
const sessionTime_input = document.querySelector(".clock-option input[name=session-time]");
const sessionTime_display = document.querySelector(".session-time");
const breakTime_input = document.querySelector(".clock-option input[name=break-time]");
const breakTime_display = document.querySelector(".break-time");
const timerButtonStates = {
    startTime : 1,
    resumeTime: 2,
    pauseTime : 3

}
var timerState = timerButtonStates.startTime;
var sessionTime = 25;
var breaktime = 5;
var countdown;
var remainingTime;


startButton.addEventListener("click", () => {

    if(timerState == timerButtonStates.startTime){

        sessionTime = sessionTime_input.value;
        breakTime = breakTime_input.value;
        
        startTimer(sessionTime*60);
        timerState = timerButtonStates.pauseTime;
        startButton.textContent = "Pause";


    }else if(timerState == timerButtonStates.pauseTime){

        clearInterval(countdown);
        startButton.textContent = "Resume";
        timerState = timerButtonStates.resumeTime;

    }else if(timerState == timerButtonStates.resumeTime){

        startTimer(remainingTime);
        startButton.textContent = "Pause";
        timerState = timerButtonStates.pauseTime;
    }
    
});

resetButton.addEventListener("click", () => {

    clearInterval(countdown);
    timerState = timerButtonStates.startTime;
    startButton.textContent = "Start";
    displayRemainingTime(sessionTime*60);

});

sessionTime_input.addEventListener("change", updateSessionTime);
sessionTime_input.addEventListener("mousemove", updateSessionTime);

breakTime_input.addEventListener("change", updateBreakTime);
breakTime_input.addEventListener("mousemove", updateBreakTime);


function updateSessionTime(){

    sessionTime_display.textContent = this.value;
    
    if(timerState == timerButtonStates.startTime){

        sessionTime = +sessionTime_display.textContent;
        displayRemainingTime(sessionTime*60);

    }
    
}

function updateBreakTime(){

    breakTime_display.textContent = this.value;
}

function startTimer(timeInSec){

    let finishTime = Date.now() + timeInSec*1000;
   
    countdown = setInterval(() => {

        remainingTime = Math.round((finishTime - Date.now())/1000);
        displayRemainingTime(remainingTime);

        if(remainingTime <= 0){
            
            clearInterval(countdown);
        }

    }, 1000);

}

function displayRemainingTime(timeInSec){

    let seconds = (timeInSec)%60;
    let minutes = Math.floor(timeInSec/60)%60;
    let hours = Math.floor(timeInSec/(60*60))%12;

    timeDisplay.textContent = `${adjustedTime(minutes)}:${adjustedTime(seconds)}`;
    
    
    if(hours > 0){
        timeDisplay.textContent = `${adjustedTime(hours)}:${timeDisplay.textContent}`;
    }
    
}

function adjustedTime(time){

    if(time <= 9){
        return `0${time}`
    }else{
        return `${time}`
    }
}
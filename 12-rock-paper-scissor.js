
// let's make rock, paper,scissor game
 let user = '';
 let computer = '';
 let result = '';
 let is_auto_playing = false;
 let intervalId ;
//  const status = {
//     wins : 0,
//     losses:  0 ,
//     draws:   0
//  };
const status = JSON.parse(localStorage.getItem('score'));//get the saved var in local storage, then convert it into object
 
 // 1. get the button element and add event listener to it
 const rock = document.querySelector('.rock');
 const paper = document.querySelector('.paper');
 const scissor = document.querySelector('.scissor');
 const reset = document.querySelector('.reset');
 const js_score_element = document.querySelector('.js-score');
 const auto_play_element = document.querySelector('.auto-play-button');

 const checkMessage = document.querySelector('.checkMessage');


 rock.addEventListener('click',()=>{
    user = 'rock';
    playGame(user);
   
})
 paper.addEventListener('click',()=>{
    user = 'paper';
    playGame(user);
    
})
 scissor.addEventListener('click',()=>{ 
    user = 'scissor';
    playGame(user);
   
})
 reset.addEventListener('click',()=>{
    displayCheckMessage();
 })

 //  function to get random number between two numbers
 function getRandomInt(min , max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
    }
 function defineComputerRule(computerNumber){
    if (computerNumber === 0){
        return 'rock';
    }
    else if (computerNumber === 1){
        return 'paper';
    }

    else if (computerNumber === 2){
        return 'scissor';
    }
}    
 function alertMessage(user, computer,status,state){
   
    js_score_element.innerHTML = `
You <img src="/LESSON10/${user}-emoji.png" class="move-icon">
<img src="/LESSON10//${computer}-emoji.png" class="move-icon">
Computer
\n<p class ="s">Wins:${status.wins}, Loses: ${status.losses}, Draws: ${status.draws}</p> `;
}


auto_play_element.addEventListener('click',()=>{
        if(!is_auto_playing){
             intervalId = setInterval(()=>{
                is_auto_playing = true;
                let playerMove = getRandomInt(0,2);
                playerMove = defineComputerRule(playerMove);
                playGame(playerMove);
                auto_play_element.innerHTML = 'Stop playing'
            },1000); 
        }// we want to run the code every 1 second
        else{
                clearInterval(intervalId);//to stop the auto playing
                is_auto_playing = false;
                auto_play_element.innerHTML = 'Auto Play';
        }
});


function playGame(user){
    computerNumber = getRandomInt(0,2);
    computer = defineComputerRule(computerNumber);
    // console.log(computer);
    if (user === 'rock'){
            if (computer === 'rock'){
                status.draws += 1;
                result = 'Tie';
                alertMessage(user,computer,status,result)
        
            }
            else if (computer === 'paper'){
                status.losses += 1;
                result = 'lose';
                alertMessage(user,computer,status,result) 
            }

            else{
                result = 'win';
                status.wins += 1;
            alertMessage(user,computer,status,result)
            
            }
            localStorage.setItem('score',JSON.stringify(status));// this function takes 2 strings, the first one is only name, and the second one is the vaiable you want to save in local storage, but it must be as string. This
        }  
    else if (user === 'paper'){
        computerNumber = getRandomInt(0,2);
        computer = defineComputerRule(computerNumber);
        if (computer === 'paper'){
        status.draws += 1;
        result = 'Tie';
        alertMessage(user,computer,status,result);
            
        }
        else if (computer === 'rock'){
             result = 'Win';
             status.wins += 1;
             alertMessage(user,computer,status,result);
           
        }
    
        else{ 
            result = 'Lose';
            status.losses += 1 ;
            alertMessage(user,computer,status,result);
    
        }
        localStorage.setItem('score',JSON.stringify(status));// this function takes 2 strings, the first one is only name, and the second one is the vaiable you want to save in local storage, but it must be as string.
    }    
    else if(user === 'scissor'){
        computerNumber = getRandomInt(0,2);
        computer = defineComputerRule(computerNumber);
        if (computer === 'scissor'){
            result = 'Tie';
            status.draws += 1;
            alertMessage(user,computer,status,result);
        }
        else if (computer === 'paper'){
            result = 'Win';
            status.wins += 1;
            alertMessage(user,computer,status,result);
        }
        else{ 
            result = 'Lose';
            status.losses += 1;
            alertMessage(user,computer,status,result);
        }
        localStorage.setItem('score',JSON.stringify(status));// this function takes 2 strings, the first one is only name, and the second one is the vaiable you want to save in local storage, but it must be as string.
    }  
}

// to play the game using keyboard r,p,s
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        console.log('rock');
        playGame('rock');
    }
    else if(event.key === 'p'){
        console.log('paper');
        playGame('paper');
    }
    else if(event.key === 's'){
        console.log('scissor');
        playGame('scissor');
    }
});

//auto play the game when click on a
document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'a'){
        // let user = getRandomInteger(0,2);
        // user = defineComputerRule(user);
        auto_play_element.click();
        
    }
});

// backspace key to reset the score
document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'Backspace'){
        reset.click();
    }
});

function displayCheckMessage(){//this method to display the check message, if the user want to reset the score or not
    const html = `<p class = "message">Are you sure you want the reset the score?</p>
    <button class="yesButton">Yes</button>
    <button class="noButton">No</button>`;
    checkMessage.innerHTML = html;

    const yesButton = document.querySelector('.yesButton');
    const noButton = document.querySelector('.noButton');

    
   yesButton.addEventListener('click',()=>{
        do_reset();
        checkMessage.innerHTML = '';
   });
   noButton.addEventListener('click',()=>{
        checkMessage.innerHTML = '';
   });



}


function do_reset(){ // this method will reset the score
    status.wins = 0;
    status.losses = 0;
    status.draws=  0;
    localStorage.setItem('score',JSON.stringify(status));// this function takes 2 strings, the first one is only name, and the second one is the vaiable you want to save in local storage, but it must be as string.
    js_score_element.innerText = `WINS:${status.wins}, Loses: ${status.losses}, Draws: ${status.draws}`
    displayCheckMessage();
}
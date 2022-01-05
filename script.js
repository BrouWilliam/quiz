questionOption = document.querySelector('.option_list')
// Elements Box
infoBox = document.querySelector('.info_box')
resultBox = document.querySelector('.result_box')
quizBox = document.querySelector('.quiz_box')
// Buttons
startQuiz = document.querySelector('.start_btn button')
continueQuiz = document.querySelector('.next-btn')
quitQuiz = document.querySelector('.buttons button.quit')
nextQuiz = document.querySelector('.buttons button.restart')

//btnFinish = document.querySelector('.buttons button.quit_finish')
restartFinish = document.querySelector('.buttons button.restart_finish')

timeCount = document.querySelector('.time_sec')
timeLine = document.querySelector('.time_line')
timeOff = document.querySelector('.time_text')


restartFinish.addEventListener('click', () => {
    window.location.reload()
})

let que_count = 0
let que_numb = 1
let counter;
let counterLine;
let timeValue = 15
let widthValue = 0
let userScore = 0

// restartFinish.addEventListener('click', () => {
//     resultBox.classList.remove('d-block')
//     quizBox.classList.add('d-block')
    
//     let que_count = 0
//     let que_numb = 1
//     let counter;
//     let counterLine;
//     let timeValue = 15
//     let widthValue = 0
//     let userScore = 0

//     showQuestions(que_count)
//     contagem(que_numb)
//     clearInterval(counter)
//     clearInterval(counterLine)
//     startTimer(timeValue)
//     startTimerLine(widthValue)
//     timeOff.textContent = 'Time Left'

//     continueQuiz.classList.remove('d-block')

    
// })


// Star Quiz
startQuiz.addEventListener('click', () => {infoBox.classList.add('d-block')})

// Quit Quiz
quitQuiz.addEventListener('click', () =>{window.location.reload()})



// Continue Quiz
    nextQuiz .addEventListener('click', () => {

        
        infoBox.classList.remove('d-block')
        quizBox.classList.add('d-block')
        resultBox.classList.remove('d-block')

        showQuestions(que_count)
        contagem(que_numb)
        clearInterval(counter)
        startTimer(timeValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)
        timeOff.textContent = 'Time Left'
        
    })

    




// Questions
function showQuestions(index){
    const questionTitle = document.querySelector('.que_text')
    let questionTag = '<span>' +questions[index].numb+ '.' + questions[index].question +'</span>'
    questionTitle.innerHTML = questionTag



    let optionTag =   '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
                    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
                    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
                    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>'
    questionOption.innerHTML = optionTag
    const option = questionOption.querySelectorAll('.option')
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', "optionSelected(this)")

    }


}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterLine)

    let userAns = answer.textContent
    let correctAns = questions[que_count].answer
    let allOptions = questionOption.children.length

    
    
    if(userAns == correctAns){
        
        userScore += 1
        answer.classList.add('correct')
        answer.insertAdjacentHTML('beforeend', tickIcon)
    }
    else{
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML('beforeend', crossIcon)
        console.log('Answer is wrong')
        for (let i = 0; i < allOptions; i++) {
            if(questionOption.children[i].textContent == correctAns){
                questionOption.children[i].setAttribute('class', "option correct")
                questionOption.children[i].insertAdjacentHTML('beforeend', tickIcon)
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        questionOption.children[i].classList.add('disabled')
    }
    continueQuiz.style.display = 'block'

}


// Next button

continueQuiz.addEventListener('click', () =>{
    if(que_count < questions.length -1){
        que_count++;
        que_numb++;
        showQuestions(que_count)
        contagem(que_numb)
        clearInterval(counter)
        startTimer(timeValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)
        continueQuiz.style.display = "none"
        timeOff.textContent = 'Time Left'

    }else{
        showResultBox()
        clearInterval(counter)
        clearInterval(counterLine)
    }
})



function contagem(index){
    const contagemQuiz = document.querySelector('.total_que')
    let totalQuestionTag = '<span><p>' +index+ '</p>Of<p>' +questions.length+ '</p>Questions</span>'

    contagemQuiz.innerHTML = totalQuestionTag
}


function showResultBox(){
    resultBox.classList.add('d-block')
    quizBox.classList.remove('d-block')
    scoreText = document.querySelector('.score_text')
    if(userScore > 3){
        let scoreTag = '<span>and Congrats! You got <p>' +userScore+ '</p> out of <p>' +questions.length+ '</p> </span>'
        scoreText.innerHTML = scoreTag
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got <p>' +userScore+ '</p> out of <p>' +questions.length+ '</p> </span>'
        scoreText.innerHTML = scoreTag
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>' +userScore+ '</p> out of <p>' +questions.length+ '</p> </span>'
        scoreText.innerHTML = scoreTag
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000)

    function timer(){
        timeCount.textContent = time
        time--;
        if(time < 9){
            let addZero = timeCount.textContent
            timeCount.textContent = "0" + addZero
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"
            timeOff.textContent = 'Time Off'

            let correctAns = questions[que_count].answer
            let allOptions = questionOption.children.length

            for (let i = 0; i < allOptions; i++) {
                if(questionOption.children[i].textContent == correctAns){
                    questionOption.children[i].setAttribute('class', "option correct")
                    questionOption.children[i].insertAdjacentHTML('beforeend', tickIcon)
                }
            }

            for (let i = 0; i < allOptions; i++) {
                questionOption.children[i].classList.add('disabled')
            }
            continueQuiz.style.display = 'block'
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29)

    function timer(){

        time += 1
        timeLine.style.width = time + "px"
        if(time > 549){
            clearInterval(counterLine)
        }
    }
}
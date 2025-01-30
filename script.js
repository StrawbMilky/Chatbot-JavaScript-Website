var questionNumber = 0;

function runChatbot(){
    event.preventDefault(); //prevents default submission behavior = reloading the page
    
    const response = document.getElementById("response");
    const answer = document.getElementById("answer").value;
    const question = document.getElementById("question");

    if (questionNumber === 0) { //good practise to use === to check for a quality in js 
        response.innerText = "Your name is " + answer + ".";
        question.innerText = "When is your birthday?";

        questionNumber++; 

        document.getElementById("birthdayForm").style.visibility = "visible";
        document.getElementById("answerForm").style.visibility = "hidden";
    }
    else {
        response.innerText = "You entered a birthday";
        question.innerText = "What is your favorite holiday?";
    }

}

const answerForm = document.getElementById("answerForm");
answerForm.addEventListener("submit", function(event){
    
    runChatbot();
});

const birthdayForm = document.getElementById("birthdayForm");
birthdayForm.addEventListener("submit", function(event){
   
    runChatbot();
});

var questionNumber = 0;

const response = document.getElementById("response");


function calculateHowManyDaysAway(date){
    
    const differenceInMiliseconds = date - new Date();

    const millisecondsInASecond = 1000;

    const differenceInSeconds= differenceInMiliseconds / millisecondsInASecond;

    const secondsInAMinute = 60;

    const differenceInMinutes = differenceInSeconds / secondsInAMinute;

    const minutesInAnHour = 60;

    const differenceInHours = differenceInMinutes / minutesInAnHour;

    const hoursInADay = 24;

    const differenceInDays = differenceInHours / hoursInADay;

    const howManyDaysAwayIstheDate = differenceInDays;

    return Math.ceil(howManyDaysAwayIstheDate); //converts number to an integer 
}

function calculateNextbirthday(){

    let birthdayYear = new Date().getFullYear();

    const selectedBirthdayMonthElement = document.getElementById("months");
    const birthdayMonth = selectedBirthdayMonthElement.selectedIndex + 1;

    const birthdayDay = document.getElementById("birthdayDayAnswer").value;

    let birthdayDate = new Date(birthdayYear + "-" + birthdayMonth + "-" + birthdayDay); //let = can assign value

    if (new Date() > birthdayDate) { //if the current date is greater than the birthday date = birthday has already occured
        birthdayYear = birthdayYear + 1; //if the condition is true, then it has to go to the next year
        birthdayDate = new Date(birthdayYear + "-" + birthdayMonth + "-" + birthdayDay); 
    }

    response.innerText = "Your birthday is " + calculateHowManyDaysAway(birthdayDate) + " days away.";
}

function calculateNextHoliday(){

    const holidays = document.getElementById("holidays");

    const favoriteHoliday = holidays.options[holidays.selectedIndex].value;

    let month = 1;
    let day = 1;

    switch (favoriteHoliday){ //used if there is a lot of different options

        case "Chinese New Year":
            month = 1;
            day = 22;
            break; //neccessary to be able to exit case

        case "Christmas":
            month = 12;
            day = 24;
            break;
        
        case "Halloween":
            month = 10;
            day = 31;
            break;

        case "Hannukah":
            month = 12;
            day = 7;
            break;
        
        case "Kwanza":
            month = 12;
            day = 26;
            break;

        case "New Year":
            month = 1;
            day = 1;
            break;
        
        case "Ramadan":
            month = 3;
            day = 26;
            break;

        default: //if all the cases above fail
            month = 1;
            day = 1;
    }

    let year = new Date().getFullYear();
    let holidayDate = new Date(year + "-" + month + "-" + day);

    if (new Date() > holidayDate){
        year++
        holidayDate = new Date(year + "-" + month + "-" + day);
    }

    const howManyDaysAwayIsTheHoliday = calculateHowManyDaysAway(holidayDate);

    response.innerText = favoriteHoliday +  " is " + howManyDaysAwayIsTheHoliday + " days away."; //SHOWS A DEFAULT TIMEZONE. MAYBE I CHANGE?
}

function runChatbot(){

    event.preventDefault(); //prevents default submission behavior = reloading the page
    
    const answer = document.getElementById("answer").value;
    const question = document.getElementById("question");
    const answerForm = document.getElementById("answerForm");
    const birthdayForm = document.getElementById("birthdayForm")
    const holidayForm = document.getElementById("holidayForm");
    const restartButton = document.getElementById("restartButton");

    if (questionNumber === -1){

        question.innerText = "What is your name?";
        response.innerText = "";

        answerForm.style.display = "block";
        birthdayForm.style.display = "none";
        holidayForm.style.display = "none";
        restartButton.style.display = "none";
    }
    

    else if (questionNumber === 0) { //good practise to use === to check for a quality in js 
        response.innerText = "Your name is " + answer + ".";
        question.innerText = "When is your birthday?";

        birthdayForm.style.display = "block";
        answerForm.style.display = "none";
    }
    else if (questionNumber === 1) {

        calculateNextbirthday();

        question.innerText = "What is your favorite holiday?";

        birthdayForm.style.display = "none";
        holidayForm.style.display = "block";
    }

    else if (questionNumber === 2){

        calculateNextHoliday();

        document.getElementById("answer").value = "";
        question.innerText = "How old are you?";
        answerForm.style.display = "block";
        holidayForm.style.display = "none";
    }

    else if (questionNumber === 3){

        const yearOfBirth = new Date().getFullYear() - answer; 
        response.innerText = "You were born in " + yearOfBirth + ".";

        question.innerText = "Thanks for playing!";

        answerForm.style.display = "none";
        restartButton.style.display = "block";
    }

    questionNumber++; 
}

const answerForm = document.getElementById("answerForm");
answerForm.addEventListener("submit", function(event){
    runChatbot();
    document.getElementById("answer").value = "";
});

const birthdayForm = document.getElementById("birthdayForm");
birthdayForm.addEventListener("submit", function(event){
    runChatbot();
    document.getElementById("answer").value = "";
});

const holidayForm = document.getElementById("holidayForm");
holidayForm.addEventListener("submit", function(event){
    runChatbot();
    document.getElementById("answer").value = "";
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", function (event){
    questionNumber = -1;

    //clear all input field inside all forms
    document.querySelectorAll("input, select").forEach(field => {
        if (field.tagName === "INPUT"){
            field.value = "";
        } else if (field.tagName === "SELECT"){
            field.selectedIndex = 0; //reset select dropdown
        }
    });
    
    runChatbot();
})



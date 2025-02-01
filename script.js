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

    response.innerText = "Your favorite holiday " + favoriteHoliday + " is X days away.";
}

function runChatbot(){

    event.preventDefault(); //prevents default submission behavior = reloading the page
    
    const answer = document.getElementById("answer").value;
    const question = document.getElementById("question");

    if (questionNumber === 0) { //good practise to use === to check for a quality in js 
        response.innerText = "Your name is " + answer + ".";
        question.innerText = "When is your birthday?";

        document.getElementById("birthdayForm").style.visibility = "visible";
        document.getElementById("answerForm").style.visibility = "hidden";
    }
    else if (questionNumber === 1) {

        calculateNextbirthday();

        question.innerText = "What is your favorite holiday?";
    }

    else if (questionNumber === 2){

        calculateNextHoliday();

        question.innerText = "How old are you?";
    }

    questionNumber++; 
}

const answerForm = document.getElementById("answerForm");
answerForm.addEventListener("submit", function(event){
    
    runChatbot();
});

const birthdayForm = document.getElementById("birthdayForm");
birthdayForm.addEventListener("submit", function(event){
   
    runChatbot();
});

const holidayForm = document.getElementById("holidayForm");
holidayForm.addEventListener("submit", function(event){

    runChatbot();
});

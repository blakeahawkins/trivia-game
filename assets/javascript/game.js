$(document).ready(function() {
    var queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple";
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var questions = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for(i=0; i < questions.length; i++) {
            questions[i] = {
                question: response.results[i].question,
                answers: {
                    correct: response.results[i].correct_answer,
                    incorrect: [
                        response.results[i].incorrect_answers[0],
                        response.results[i].incorrect_answers[1],
                        response.results[i].incorrect_answers[2]
                    ]
            }
            }
        }
    })
    console.log(questions);
    $(".container").append("<button id='start-button'>Start!</button>")
    $("#start-button").on("click", function() {
        $("#start-button").hide();
        var questionsRemaining = 10;
        var play = true;
        for(i = 0; i < questions.length; i++) {
            // Write the Question and Answers. #answer-1 is always correct.
            var triviaQuestion = $("<div>").text(questions[i].question);
            $("#trivia-question").text(triviaQuestion);

            var triviaAnswers = $("<ol>");
            var answersList = [
                questions[i].answers.correct,
                questions[i].answers.incorrect[0],
                questions[i].answers.incorrect[1],
                questions[i].answers.incorrect[2]
            ];
            
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                                
            return array;
            }

            answersList = shuffle(answersList);
            
            for(i = 0; i < answersList.length; i++) {
                var triviaAnswer = $("<li>").text(answersList[i]);
                triviaAnswers.append(triviaAnswer);
            }
            $("#trivia-answers").append(triviaAnswers);
            
            // function correctGuess();

            // function incorrectGuess();

            function timesUp() {
                $("#trivia-question").text("Out of time!");
                $("#trivia-answers").text(questions[i].answers.correct);
            }

            var timer = 30;
            while(timer > 0) {
                var countdown = setTimeout(function() {
                        timer--;
                        $("#timer").text(timer);
                }, 1000);
            }
            if(timer = 0) {
                timesUp();
            }
        }
    })




})
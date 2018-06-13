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
        function triviaLoop() {
            for(i = 0; i < questions.length; i++) {
                // Shuffle Answer Divs
                $(".triviaAnswer").each(function() {
                    var divs = $(this).find("div");
                    for(var m = 0; m < divs.length; m++) {
                        $(divs[m]).remove();
                    }
                    function shuffle(array) {
                        var currentIndex = array.length, temporaryValue, randomIndex;
                        
                        while (0 !== currentIndex) {
                        
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex -= 1;
                        
                            temporaryValue = array[currentIndex];
                            array[currentIndex] = array[randomIndex];
                            array[randomIndex] = temporaryValue;
                        }
                        
                        return array;
                    }
                    divs = shuffle(divs);
                    for(var m = 0; m < divs.length; m++) {
                        $(divs[m]).appendTo(this);
                    }
                });
                // Write the Question and Answers. #answer-1 is always correct.
                $("#trivia-question").text(questions[i].question);
                $("#answer-1").text(questions[i].answers.correct);
                $("#answer-2").text(questions[i].answers.incorrect[0]);
                $("#answer-3").text(questions[i].answers.incorrect[1]);
                $("#answer-4").text(questions[i].answers.incorrect[2]);
                
                // function correctGuess();

                // function incorrectGuess();

                function timesUp() {
                    $("#trivia-question").text("Out of time!");
                    $("#answer-2").empty();
                    $("#answer-3").empty();
                    $("#answer-4").empty();
                }

                var timer = 30;
                while(timer > 0) {
                    var countdown = setTimeout(function() {
                            timer--;
                    }, 1000);
                }
                if(timer = 0) {
                    timesUp();
                }
            }
        }
    })




})
$(function(){
  var state = {
    questions: [
     {q: "The longest possible time a person could now serve as President is:",
      choices: ["8 years", "12 years", "4 years", "10 years"],
      answerIndex: 0,
      answerGiven: false
     },
     {q: "A man accused of a crime in court has a right to:",
      choices: ["be tried wherever he wants", "hear the witnesses against him", "have any judge he wants", "change courts"],
      answerIndex: 1,
      answerGiven: false
     },
     {q: "The major department head who is appointed by the President to deal with foreign countries is the:",
      choices: ["Secretary of Defense", "Attorney General", "Secretary of Commerce", "Secretary of State"],
      answerIndex: 3,
      answerGiven: false
     },
     {q: "The President is elected if he:",
      choices: ["wins a majority of the electoral votes", "wins most of the country’s vote", "wins all of the States’ votes", "wins most of the States’ votes"],
      answerIndex: 0,
      answerGiven: false
     },
     {q: "The Bill of Rights is:",
      choices: ["all of the amendments", "the Fifteenth Amendment", "the first ten amendments", "the entire Constitution"],
      answerIndex: 2,
      answerGiven: false
     }
   ],
   score: 0,
   currentQuestionIndex: 0,
   route: "start",
   reset: false
  };



  function startQuiz (element) {
    state.currentQuestionIndex = 0;
    state.score = 0;
    renderApp();
  };

function endQuiz() {
  $(".quiz").addClass("hidden");
  $(".results").html(
      '<h3>The quiz is over!  Results:</h3>' +
      '<h6>Final Score:' + state.score + '</h6>'
  )
};

  function renderQuestions (state, element){
    var questionsHTML = state.questions[state.currentQuestionIndex].choices.map(function(choice, index){
     return (
      '<li>' +
        '<input type="radio" name="user-answer" value="' + index + '" required>' +
        '<label>' + choice + '</label>' +
      '</li>'
    );
  });
    element.html(questionsHTML);

  };

function showAnswer(index) {
  var correctChoice = state.questions[state.currentQuestionIndex].answerIndex;
  $(".next-button").toggleClass("hidden");
  $(".js-submit-button").toggleClass("hidden");
  if (index == correctChoice ) {
    $(".js-correct-answer").html("<h1 style='color:green'>Correct!<h1>")
  } else {
    $(".js-correct-answer").html("<h1 style='color:red'>Wrong! The correct answer is: " + state.questions[state.currentQuestionIndex].choices[correctChoice] + "<h1>")
  }
};


function checkAnswer(index) {
  if (index == state.questions[state.currentQuestionIndex].answerIndex ) {
  state.score = state.score + 1;
};
};

  function renderApp () {
    var index = state.currentQuestionIndex;
    if(state.currentQuestionIndex <= 4) {
        var element = $(".quiz");
        element.removeClass("hidden");
        element.children(".js-question-number").text("Question " + (index + 1));
        element.children(".js-question-content").text(state.questions[index].q);
        renderQuestions(state, $(".form-questions"));
        element.children(".current-score").text("Score: " + state.score)
        element.children(".num-questions").text("Question " + (index + 1) + " out of 5");
    } else {
      endQuiz();
      renderApp();
    };

};

function nextQuestion (state) {
  if (state.questions[state.currentQuestionIndex]) {
      state.currentQuestionIndex = state.currentQuestionIndex + 1;
      $(".js-submit-button").toggleClass("hidden");
      $(".next-button").toggleClass("hidden");
      $(".js-correct-answer").html("<h1></h1>")
      renderApp();
  } else {
      alert("No more questions!")
  };
};

function prevQuestion (state) {
  state.currentQuestionIndex = state.currentQuestionIndex - 1;
  renderApp();
};


$("#start-quiz-button").on("click", function() {
    startQuiz($(this));

});


$("form[name='user-quiz']").submit(function(event) {
  event.preventDefault();
  var userAnswer = $("input[name='user-answer']:checked").val();
  checkAnswer(userAnswer);
  showAnswer(userAnswer);
  renderApp();
});


$(".next-button").on("click", function(){
  nextQuestion(state);
});

$(".prev-button").on("click", function(){
  prevQuestion(state);
});

});

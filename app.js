$(function(){
  var state = {
    questions: [
     {q: 'The longest possible time a person could now serve as President is:',
      choices: ['8 years', '12 years', '4 years', '10 years'],
      answerIndex: 0
     },
     {q: 'A man accused of a crime in court has a right to:',
      choices: ['be tried wherever he wants', 'hear the witnesses against him', 'have any judge he wants', 'change courts'],
      answerIndex: 1
     },
     {q: 'The major department head who is appointed by the President to deal with foreign countries is the:',
      choices: ['Secretary of Defense', 'Attorney General', 'Secretary of Commerce', 'Secretary of State'],
      answerIndex: 3
     },
     {q: 'The President is elected if he:',
      choices: ['wins a majority of the electoral votes', 'wins most of the country’s vote', 'wins all of the States’ votes', 'wins most of the States’ votes'],
      answerIndex: 0
     },
     {q: 'The Bill of Rights is:',
      choices: ['all of the amendments', 'the Fifteenth Amendment', 'the first ten amendments', 'the entire Constitution'],
      answerIndex: 2
     }
   ],
   score: 0,
   currentQuestionIndex: 0,
   route: 'start',
   reset: false
  }

  function startQuiz (state, element) {
    element.attr('id', 'reset-quiz-button');
    element.text('Reset Quiz');
    state.reset = true;
    state.currentQuestionIndex = 0;
    renderApp(state, $('.quiz'));
    console.log(state.currentQuestionIndex);
  };

  function renderQuestions (state, element){
    var questionsHTML = state.questions[state.currentQuestionIndex].choices.map(function(item){
     return '<input class="js-answer-option" type="radio" name="answer" value="">' + item + '<br>';
  });
    element.html(questionsHTML);

  };


  function renderApp () {
    var index = state.currentQuestionIndex;
    var element = $('.quiz');
    element.removeClass('hidden');
    element.children('.js-question-number').text('Question ' + (index + 1))
    element.children('.js-question-content').text(state.questions[index].q);
    renderQuestions(state, $('.form-questions'));
    element.children('.current-score').text('Score: ' + state.score)
    element.children('.num-questions').text('Question ' + (index + 1) + ' out of 5');
    console.log(state.currentQuestionIndex);

  //   if (state.currentQuestionIndex = 0) {
  //     element.children('.prev-button').attr('disabled', 'true');
  //   }
  //   else if (state.currentQuestionIndex = 4) {
  //   element.children('.next-button').attr('disabled', 'true');
  // };
};

function nextQuestion (state) {
  // console.log(state.questions[state.currentQuestionIndex])
  if (state.questions[state.currentQuestionIndex]) {
  state.currentQuestionIndex = state.currentQuestionIndex + 1
  renderApp();
}
  else {alert('No more questions!')};
}

function prevQuestion (state) {
  state.currentQuestionIndex = state.currentQuestionIndex - 1
  renderApp();
}

$('#start-quiz-button').on('click', function() {
  // startQuiz(state, $(this));
  nextQuestion(state);

});

$('.next-button').on('click', function(){
  nextQuestion(state);
});

$('.prev-button').on('click', function(){
  prevQuestion(state);
});

});

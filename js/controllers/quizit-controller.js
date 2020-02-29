(function(window) {
    'use strict';
    let quizItController = {
        startQuiz: function() {
            app.quizItView.toggleLoader();
            app.quizItModel.currentQuizID = this.dataset.js;
            app.quizItModel.getData(app.quizItModel.currentQuizID);
            app.quizItView.toggleQuizModal();
        },
        populateListDataWhenReady: function() {
            app.quizItView.populateQuestionList(app.quizItModel.quizList);
            setTimeout(app.quizItView.toggleLoader, 1000);
        },
        populateQuizDataWhenReady: function(quizID) {
            app.quizItView.populateQuizModal(app.quizItModel.quizList[quizID], app.quizItModel.selectedQuizData[quizID].quizQuestions);
            
            setTimeout(app.quizItView.toggleLoader, 1000);
        },
        checkAnswer: function(e) {
            e.preventDefault();
            app.quizItView.quizInputChoiceElements.forEach(element => {
                
                if(element.checked) {
                    if(element.value === app.quizItModel.selectedQuizData[app.quizItModel.currentQuizID].quizQuestions[app.quizItView.currentQuestionCounter].answer) {
                        alert('correct')
                    } else {
                        alert('wrong');
                    }
                }
            });
        },
        init: function() {
            app.quizItModel.init();
            app.quizItView.init();
            console.log('controller initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItController = quizItController;
    app.quizItController.init();
})(window);
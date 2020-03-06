(function(window) {
    'use strict';
    let quizItController = {
        totalQuestionCount: 0,
        startQuiz: function() {
            app.quizItView.toggleLoader();
            app.quizItModel.currentQuizID = this.dataset.js;
            app.quizItModel.correctAnswersCounter = 0;
            app.quizItModel.getData(app.quizItModel.currentQuizID);
            app.quizItView.toggleQuizModal();
        },
        populateListDataWhenReady: function() {
            app.quizItView.populateQuestionList(app.quizItModel.quizList);
            setTimeout(app.quizItView.toggleLoader, 1000);
        },
        populateQuizDataWhenReady: function(quizID) {
            app.quizItView.populateQuizModal(app.quizItModel.quizList[quizID], app.quizItModel.selectedQuizData[quizID].quizQuestions);
            app.quizItController.totalQuestionCount = app.quizItModel.selectedQuizData[quizID].totalQuestionCount;
            setTimeout(app.quizItView.toggleLoader, 1000);
        },
        checkAnswer: function(e) {
            e.preventDefault();
            app.quizItView.quizInputChoiceElements.forEach(element => {
                
                if(element.checked) {
                    console.log(app.quizItView.currentQuestionCounter);
                    if(element.value === app.quizItModel.selectedQuizData[app.quizItModel.currentQuizID].quizQuestions[app.quizItView.currentQuestionCounter].answer) {
                        app.quizItView.toggleAnswerMessage(true);
                        app.quizItModel.correctAnswersCounter++
                    } else {
                        app.quizItView.toggleAnswerMessage(false, app.quizItModel.selectedQuizData[app.quizItModel.currentQuizID].quizQuestions[app.quizItView.currentQuestionCounter].choices[app.quizItModel.selectedQuizData[app.quizItModel.currentQuizID].quizQuestions[app.quizItView.currentQuestionCounter].answer]);
                    }

                    app.quizItView.currentQuestionCounter++
                    app.quizItView.toggleQuizButtons();
                }
            });

            return;
        },
        nextQuestion: function(e) {
            e.preventDefault();
            app.quizItView.toggleLoader();

            if(app.quizItView.currentQuestionCounter > Object.keys(app.quizItModel.selectedQuizData[app.quizItModel.currentQuizID].quizQuestions).length) {
                app.quizItView.showQuizResults(app.quizItModel.correctAnswersCounter);
                app.quizItView.quizModalClose.removeEventListener('click', app.quizItView.toggleQuizModal);
                app.quizItView.quizModalClose.addEventListener('click', app.quizItView.resetInitialQuizState);
                return;
            }

            app.quizItView.resetRadioButtons();
            app.quizItView.toggleAnswerMessage(true, 0, true);
            app.quizItView.toggleQuizButtons();
            app.quizItController.populateQuizDataWhenReady(app.quizItModel.currentQuizID);
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
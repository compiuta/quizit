(function(window) {
    'use strict';
    let quizItController = {
        startQuiz: function() {
            let quizID = this.dataset.js;
            app.quizItModel.getData(quizID);
            app.quizItView.toggleQuizModal();
        },
        populateListDataWhenReady: function() {
            app.quizItView.populateQuestionList(app.quizItModel.quizList);
        },
        populateQuizDataWhenReady: function(quizID) {
            app.quizItView.populateQuizModal(app.quizItModel.quizList[quizID], app.quizItModel.selectedQuizData);
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
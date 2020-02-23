(function(window) {
    'use strict';
    let quizItController = {
        startQuiz: function() {
            let quizID = this.dataset.js;
            let selectedCellData = app.quizItModel.getData(quizID);
            app.quizItView.populateQuizModal(selectedCellData);
            app.quizItView.toggleQuizModal();
        },
        populateDataWhenReady: function() {
            app.quizItView.populateQuestionList(app.quizItModel.quizList);
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
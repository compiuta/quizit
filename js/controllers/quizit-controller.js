(function(window) {
    'use strict';
    let quizItController = {
        startQuiz: function() {
            let dataCell = this.dataset.js;
            let selectedCellData = app.quizItModel.getData(dataCell);
            app.quizItView.populateQuizModal(selectedCellData);
            app.quizItView.toggleQuizModal();
        },
        init: function() {
            app.quizItModel.init();
            app.quizItView.init();
            app.quizItView.populateQuestionList(app.quizItModel.quizList);
            console.log('controller initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItController = quizItController;
    app.quizItController.init();
})(window);
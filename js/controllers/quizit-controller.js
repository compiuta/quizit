(function(window) {
    'use strict';
    let quizItController = {
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
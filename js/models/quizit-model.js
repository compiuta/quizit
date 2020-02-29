(function(window) {
    'use strict';
    let quizItModel = {
        quizList: {},
        selectedQuizData: {},
        currentQuizID: '',
        fetchQuizList: function() {
            fetch('https://api.github.com/repos/compiuta/quizit/contents/js/models/data/quiz-list.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let content = atob(data.content);

                app.quizItModel.quizList = JSON.parse(content);
                app.quizItController.populateListDataWhenReady();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        getData: function(quizID) {
            fetch('https://api.github.com/repos/compiuta/quizit/contents/js/models/data/' + quizID + '.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let content = atob(data.content);

                app.quizItModel.selectedQuizData = JSON.parse(content);
                app.quizItController.populateQuizDataWhenReady(quizID);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            return app.quizItModel.selectedQuizData;
        },
        init: function() {
            this.fetchQuizList();
            console.log('model initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItModel = quizItModel;
})(window);
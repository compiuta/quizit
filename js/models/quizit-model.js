(function(window) {
    'use strict';
    let quizItModel = {
        quizList: {},
        selectedQuizData: {},
        githubSampleAjax: function() {
            fetch('https://api.github.com/repos/compiuta/quizit/contents/README.md')
            .then((response) => {
                return response.text()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        getData: function(cell) {
            let selectedCellData = this.selectedQuizData[cell];
            return selectedCellData;
        },
        saveData: function () {

        },
        init: function() {
            this.githubSampleAjax();
            console.log('model initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItModel = quizItModel;
})(window);
(function(window) {
    'use strict';
    let quizItModel = {
        quizList: {},
        selectedQuizData: {},
        fetchQuizList: function() {

            fetch('https://api.github.com/repos/compiuta/quizit/contents/js/models/data/quiz-list.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let linkToFetch = data._links.git;
                fetch(linkToFetch, {
                    headers: {
                        Accept: "application/vnd.github.v3.raw"
                    }
                })
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    app.quizItModel.quizList = json;
                    app.quizItController.populateDataWhenReady();
                });
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
                let linkToFetch = data._links.git;
                fetch(linkToFetch, {
                    headers: {
                        Accept: "application/vnd.github.v3.raw"
                    }
                })
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    app.quizItModel.selectedQuizData = json;
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            return app.quizItModel.selectedQuizData;
        },
        saveData: function () {

        },
        init: function() {
            this.fetchQuizList();
            console.log('model initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItModel = quizItModel;
})(window);
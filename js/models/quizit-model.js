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
                let content = atob(data.content);

                app.quizItModel.quizList = JSON.parse(content);
                app.quizItController.populateDataWhenReady();
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
                console.log(data);
                app.quizItModel.selectedQuizData = JSON.parse(content);

               
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            return app.quizItModel.selectedQuizData;
        },
        updateMmodelQuizTakenCount: function(quizID, sha) {
            
            fetch('https://api.github.com/repos/compiuta/quizit/contents/js/models/data/' + quizID + '.json', {
                
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Authorization': 'token 41d1302d463c0973885f0146f31676c68888ebbd',
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify({
                    "message": "my commit message",
                    "content": "bXkgbmV3IGZpbGUgY29udGVudHM=",
                    "sha": ""
                  })
              })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },
        init: function() {
            this.fetchQuizList();
            console.log('model initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItModel = quizItModel;
})(window);
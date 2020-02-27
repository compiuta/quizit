(function(window) {
    'use strict';
    let quizItView = {
        currentQuestionCounter: 1,
        populateListItem: function(data) {
            let quizListItem = document.createElement('a');
            let quizListItemTitle = document.createElement('h4');

            quizListItem.classList.add('quiz-list__item');
            quizListItemTitle.classList.add('quiz-list__item-title');

            quizListItem.href = 'javascript:void(0);';
            quizListItemTitle.innerText = data.quizName;

            quizListItem.appendChild(quizListItemTitle);

            return quizListItem;
        },
        populateQuestionList: function(data) {
            let fragment = document.createDocumentFragment();

            for(let key in data) {
                let listItem = this.populateListItem(data[key]);
                listItem.setAttribute('data-js', key);
                listItem.addEventListener('click', app.quizItController.startQuiz);
                fragment.appendChild(listItem);
            }

            this.quizListContainer.appendChild(fragment);

        },
        populateModalQUestionElements: function() {
            let questionElement = document.createElement('div');
        },
        populateQuizModal: function(quizInfo, quizData) {

            if(app.quizItView.currentQuestionCounter > Object.keys(quizData).length) {
                app.quizItView.showQuizResults();
                return;
            }

            console.log(quizData);
            app.quizItView.quizTitle.innerText = quizInfo.quizName;

            for(let i = 0; i < Object.keys(quizData).length; i++) {
                this.populateModalQUestionElements(quizData[i]);
            }
        },
        showQuizResults: function() {
            app.quizItView.currentQuestionCounter = 1;
            
        },
        toggleQuizModal: function() {
            app.quizItView.quizModal.classList.toggle('hide-quiz');
            app.quizItView.quizModal.classList.toggle('reveal-quiz');
        },
        getDomElements: function() {
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
            this.quizModalClose = document.querySelector('[data-js="quizModalClose"]');
        },
        addEventListeners: function() {
            this.quizModalClose.addEventListener('click', this.toggleQuizModal);
        },
        init: function() {
            this.getDomElements();
            this.addEventListeners();
            console.log('view initialised');
            
        }
    };

    window.app = window.app || {};
    window.app.quizItView = quizItView;
})(window);
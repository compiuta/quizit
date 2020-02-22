(function(window) {
    'use strict';
    let quizItView = {
        populateListItem: function(data) {
            let quizListItem = document.createElement('a');
            let quizListItemTitle = document.createElement('h4');
            let quizListItemCounter = document.createElement('span');

            quizListItem.classList.add('quiz-list__item');
            quizListItemTitle.classList.add('quiz-list__item-title');
            quizListItemCounter.classList.add('quiz-list__item-counter');

            quizListItem.href = 'javascript:void(0);';
            quizListItemTitle.innerText = data.quizName;
            quizListItemCounter.innerText = data.quizTakenCount;

            quizListItem.appendChild(quizListItemTitle);
            quizListItem.appendChild(quizListItemCounter);

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
        populateQuizModal: function(data) {

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
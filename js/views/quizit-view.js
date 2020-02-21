(function(window) {
    'use strict';
    let quizItView = {
        populateListItem: function(data) {
            let quizListItemTemplateClone = this.quizListItemTemplate.content.cloneNode(true);
            quizListItemTemplateClone.querySelector('[data-js="quizListItemTitle"]').innerText = data.quizName;
            quizListItemTemplateClone.querySelector('[data-js="quizListItemCounter"]').innerText = data.quizTakenCount;
            return quizListItemTemplateClone;
        },
        populateQuestionList: function(data) {
            let fragment = document.createDocumentFragment();

            for(let key in data) {
                fragment.appendChild(this.populateListItem(data[key]));
            }

            this.quizListContainer.appendChild(fragment);

        },
        getDomElements: function() {
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
            this.quizListItemTemplate = document.querySelector('[data-js="quizListItemTemplate"]');
        },
        init: function() {
            this.getDomElements();
            console.log('view initialised');
            
        }
    };

    window.app = window.app || {};
    window.app.quizItView = quizItView;
})(window);
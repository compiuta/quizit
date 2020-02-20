(function(window) {
    'use strict';
    let quizItView = {
        getDomElements: function() {
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
        },
        init: function() {
            this.getDomElements();
        }
    };

    window.app = window.app || {};
    window.app.quizItView = quizItView;
})(window);
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
        toggleLoader: function() {
            app.quizItView.loader.classList.toggle('hide');
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
        populateModalQuestionElements: function(data) {
            app.quizItView.quizQuestion.innerText = data.question;
            app.quizItView.quizChoiceOneTitle.innerText = data.choices.a;
            app.quizItView.quizChoiceTwoTitle.innerText = data.choices.b;
            app.quizItView.quizChoiceThreeTitle.innerText = data.choices.c;
            app.quizItView.quizChoiceFourTitle.innerText = data.choices.d;

        },
        populateQuizModal: function(quizInfo, quizData) {

            if(app.quizItView.currentQuestionCounter > Object.keys(quizData).length) {
                app.quizItView.showQuizResults();
                return;
            }

            console.log(quizData);
            app.quizItView.quizTitle.innerText = quizInfo.quizName;
            app.quizItView.populateModalQuestionElements(quizData[app.quizItView.currentQuestionCounter]);
            app.quizItView.currentQuestionCounter++
        },
        showQuizResults: function() {
            app.quizItView.currentQuestionCounter = 1;

        },
        toggleQuizModal: function() {
            app.quizItView.quizModal.classList.toggle('hide-quiz');
            app.quizItView.quizModal.classList.toggle('reveal-quiz');
        },
        getDomElements: function() {
            this.loader = document.querySelector('[data-js="loader"]');
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
            this.quizModalClose = document.querySelector('[data-js="quizModalClose"]');
            this.quizQuestion = document.querySelector('[data-js="quizQuestion"]');
            this.quizChoiceOneTitle = document.querySelector('[js-data="ChoiceOneTitle"]');
            this.quizChoiceTwoTitle = document.querySelector('[js-data="ChoiceTwoTitle"]');
            this.quizChoiceThreeTitle = document.querySelector('[js-data="ChoiceThreeTitle"]');
            this.quizChoiceFourTitle = document.querySelector('[js-data="ChoiceFourTitle"]');
            this.submitAnswerButton = document.querySelector('[data-js="submitAnswer"]');
            this.nextQuestionButton = document.querySelector('[data-js="nextQuestion"]');
            this.quizInputChoiceElements = document.querySelectorAll('[name="choice"]');
        },
        addEventListeners: function() {
            this.quizModalClose.addEventListener('click', this.toggleQuizModal);
            this.submitAnswerButton.addEventListener('click', app.quizItController.checkAnswer);
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
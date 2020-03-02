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
            app.quizItView.quizTitle.innerText = quizInfo.quizName;
            app.quizItView.populateModalQuestionElements(quizData[app.quizItView.currentQuestionCounter]);
        },
        showQuizResults: function(score) {
            app.quizItView.quizScore.innerText = score;
            app.quizItView.toggleResults();
            app.quizItView.currentQuestionCounter = 1;
            app.quizItView.toggleAnswerMessage(true, 0, true);
            setTimeout(app.quizItView.toggleLoader, 1000);
        },
        toggleQuizModal: function() {
            app.quizItView.quizModal.classList.toggle('hide-quiz');
            app.quizItView.quizModal.classList.toggle('reveal-quiz');
            app.quizItView.currentQuestionCounter = 1;
        },
        toggleResults: function() {
            app.quizItView.quizQuestionsContainer.classList.toggle('hide');
            app.quizItView.quizResultsContainer.classList.toggle('hide');
        },
        resetInitialQuizState: function() {
            app.quizItView.toggleQuizModal();
            app.quizItView.resetRadioButtons();
            app.quizItView.toggleResults();
            app.quizItView.toggleQuizButtons();
            app.quizItView.quizModalClose.addEventListener('click', app.quizItView.toggleQuizModal);
            app.quizItView.quizModalClose.removeEventListener('click', app.quizItView.resetInitialQuizState);
        },
        toggleAnswerMessage: function(isCorrect, answer, nextQuestion) {

            if(nextQuestion) {
                app.quizItView.answerAlert.classList.add('hide');
                app.quizItView.answerAlert.classList.remove('alert-success');
                app.quizItView.answerAlert.classList.remove('alert-warning');
                return;
            }

            if(isCorrect) {
                app.quizItView.answerMessage.innerText = 'Correct!'
                app.quizItView.answerAlert.classList.add('alert-success');
            } else {
                app.quizItView.answerMessage.innerText = 'Wrong! The correct answer is: ' + answer;
                app.quizItView.answerAlert.classList.add('alert-warning');
            }

            app.quizItView.answerAlert.classList.remove('hide');
        },
        toggleQuizButtons: function() {
            app.quizItView.submitAnswerButton.classList.toggle('hide');
            app.quizItView.nextQuestionButton.classList.toggle('hide');
        },
        resetRadioButtons: function() {
            app.quizItView.quizInputChoiceElements.forEach(element => {
                if(element.checked) {
                    element.checked = false;
                }
            });
        },
        getDomElements: function() {
            this.loader = document.querySelector('[data-js="loader"]');
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
            this.quizModalClose = document.querySelector('[data-js="quizModalClose"]');
            this.quizQuestion = document.querySelector('[data-js="quizQuestion"]');
            this.quizChoiceOneTitle = document.querySelector('[data-js="ChoiceOneTitle"]');
            this.quizChoiceTwoTitle = document.querySelector('[data-js="ChoiceTwoTitle"]');
            this.quizChoiceThreeTitle = document.querySelector('[data-js="ChoiceThreeTitle"]');
            this.quizChoiceFourTitle = document.querySelector('[data-js="ChoiceFourTitle"]');
            this.submitAnswerButton = document.querySelector('[data-js="submitAnswer"]');
            this.nextQuestionButton = document.querySelector('[data-js="nextQuestion"]');
            this.quizInputChoiceElements = document.querySelectorAll('[name="choice"]');
            this.answerAlert = document.querySelector('[data-js="answerAlert"]');
            this.answerMessage = document.querySelector('[data-js="answerMessage"]');
            this.quizResultsContainer = document.querySelector('[data-js="quizResults"]');
            this.quizScore = document.querySelector('[data-js="quizScore"]');
        },
        addEventListeners: function() {
            this.quizModalClose.addEventListener('click', this.toggleQuizModal);
            this.submitAnswerButton.addEventListener('click', app.quizItController.checkAnswer);
            this.nextQuestionButton.addEventListener('click', app.quizItController.nextQuestion);
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
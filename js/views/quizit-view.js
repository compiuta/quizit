(function(window) {
    'use strict';
    let quizItView = {
        currentQuestionCounter: 1,
        populateListItem: function(data, counter) {
            let quizListItem = document.createElement('a');
            let quizListItemTitle = document.createElement('h4');
            let cardColor;

            if(counter === 1) {
                cardColor = 'blue-card';
            } else if(counter === 2) {
                cardColor = 'yellow-card';
            } else if(counter === 3) {
                cardColor = 'green-card';
            } else if(counter === 4) {
                cardColor = 'red-card';
            }

            quizListItem.classList.add('quiz-card');
            quizListItemTitle.classList.add('quiz-card__title');

            quizListItem.href = 'javascript:void(0);';
            quizListItemTitle.innerText = data.quizName;

            quizListItem.appendChild(quizListItemTitle);

            return quizListItem;
        },
        toggleLoader: function() {

            if(app.quizItView.loader.classList.contains('hide')) {
                app.quizItView.loader.classList.remove('hide');
            } else {
                app.quizItView.loaderFadeOut();
            }

        },
        loaderFadeOut: function() {
            app.quizItView.loader.classList.add('fade-loader');
            setTimeout(function() {
                app.quizItView.loader.classList.remove('fade-loader');
            }, 300);
            setTimeout(function() {
                app.quizItView.loader.classList.add('hide');
            }, 300);
        },
        populateQuestionList: function(data) {
            let fragment = document.createDocumentFragment();
            let cardCounter = 1;

            for(let key in data) {
                let listItem = this.populateListItem(data[key], cardCounter);
                listItem.setAttribute('data-js', key);
                listItem.addEventListener('click', app.quizItController.startQuiz);
                fragment.appendChild(listItem);

                if(cardCounter === 4) {
                    cardCounter = 1;
                } else {
                    cardCounter++;
                }
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
            app.quizItView.quizScore.innerText = score + ' / ' + app.quizItController.totalQuestionCount;
            app.quizItView.toggleResults();
            app.quizItView.toggleAnswerMessage(true, 0, true);
            setTimeout(app.quizItView.toggleLoader, 800);
        },
        toggleQuizModal: function(resetState) {
            app.quizItView.bodyTag.classList.toggle('active-quiz')
            app.quizItView.quizListContainer.classList.toggle('hide');
            app.quizItView.quizModal.classList.toggle('hide');
            app.quizItView.currentQuestionCounter = 1;
        },
        toggleResults: function() {
            app.quizItView.bodyTag.classList.toggle('quiz-end');
            app.quizItView.quizResultsContainer.classList.toggle('hide');
        },
        resetInitialQuizState: function() {
            app.quizItView.toggleLoader();

            if(app.quizItView.bodyTag.classList.contains('quiz-end')) {
                console.log(app.quizItView.currentQuestionCounter);
                console.log(app.quizItController.totalQuestionCount);
                app.quizItView.toggleResults();
            }

            if(app.quizItView.submitAnswerButton.classList.contains('hide')) {
                app.quizItView.toggleQuizButtons();
            }

            app.quizItView.toggleQuizModal();
            app.quizItView.resetRadioButtons();
            app.quizItView.toggleAnswerMessage(false,false,true);

            setTimeout(app.quizItView.toggleLoader, 800);
        },
        toggleAnswerMessage: function(isCorrect, answer, nextQuestion) {

            if(nextQuestion) {
                app.quizItView.answerAlert.classList.add('hide');
                app.quizItView.bodyTag.classList.remove('alert-success');
                app.quizItView.bodyTag.classList.remove('alert-warning');
                return;
            }

            if(isCorrect) {
                app.quizItView.answerMessage.innerText = 'Correct!';
                app.quizItView.bodyTag.classList.add('alert-success');
            } else {
                app.quizItView.answerMessage.innerText = 'Wrong! The correct answer is: ' + answer;
                app.quizItView.bodyTag.classList.add('alert-warning');
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
            this.bodyTag = document.querySelector('[data-js="bodyTag"]');
            this.loader = document.querySelector('[data-js="loader"]');
            this.quizListContainer = document.querySelector('[data-js="quizListContainer"]');
            this.quizModal = document.querySelector('[data-js="quizModal"]');
            this.quizTitle = document.querySelector('[data-js="quizTitle"]');
            this.quizQuestionsContainer = document.querySelector('[data-js="quizQuestionsContainer"]');
            this.quizModalClose = document.querySelectorAll('[data-js="quizModalClose"]');
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
            this.quizModalClose.forEach((element) => {
                element.addEventListener('click', this.resetInitialQuizState);
            });
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
(function(window) {
    'use strict';
    let quizItModel = {
        quizList: {
            quizCellA1: {
                quizName: 'Quiz Name',
                quizID: 0,
                quizLocation: 'cellA1',
                quizTakenCount: 0
            }
        },
        selectedQuizData: {
            quizCellA1: {
                quizQuestions: {
                    1: {
                        question: 'How do you spell the number 1?',
                        answer: 'a',
                        choices: {
                            a: 'one',
                            b: 'won',
                            c: 'uan',
                            d: 'wand'
                        }
                    },
                    2: {
                        question: 'How do you spell the number 1?',
                        answer: 'a',
                        choices: {
                            a: 'one',
                            b: 'won',
                            c: 'uan',
                            d: 'wand'
                        }
                    },
                    3: {
                        question: 'How do you spell the number 1?',
                        answer: 'a',
                        choices: {
                            a: 'one',
                            b: 'won',
                            c: 'uan',
                            d: 'wand'
                        }
                    },
                    4: {
                        question: 'How do you spell the number 1?',
                        answer: 'a',
                        choices: {
                            a: 'one',
                            b: 'won',
                            c: 'uan',
                            d: 'wand'
                        }
                    }
                }
            }
        },
        getData: function() {
            console.log('hello');
        },
        saveData: function () {

        },
        init: function() {
            console.log('model initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItModel = quizItModel;
})(window);
(function(window) {
    'use strict';
    let quizItView = {
        init: function() {
            console.log('view initialised');
        }
    };

    window.app = window.app || {};
    window.app.quizItView = quizItView;
})(window);
define([
    'settings',
    'text!templates/cards.tmpl'
], function (settings, template) {
    return Backbone.View.extend({
        template: _.template(template),
        tagName: "section",
        className: "cards",
        
        events: {
            "click .black": "selectQuestion",
            "click .question": "discardQuestion",
            "click .overview": "selectAnswer",
            "click .closed": "openAnswer",
            "click .open": "discardAnswer"
        },

        initialize: function (options) {
            this.questions = options.questions;
            this.answers = options.answers;
            this.hand = this.answers.first(10);
            this.questionsIndex = 0;
            this.answersIndex = 9;
            this.selected = null;
            this.status = null;
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template(this));
            return this;
        },
        
        selectQuestion: function () {
            this.status = "question";
            this.render();
        },
        
        discardQuestion: function () {
            this.status = null;
            ++this.questionsIndex;
            this.render();
        },
        
        selectAnswer: function (e) {
            this.selected = $(e.currentTarget).data("index");
            this.status = "closed";
            this.render();
        },
        
        openAnswer: function () {
            this.status = "open";
            this.render();
        },
        
        discardAnswer: function () {
            this.status = null;
            this.hand[this.selected] = this.answers.at(++this.answersIndex);
            this.selected = null;
            this.render();
        }
    });
});

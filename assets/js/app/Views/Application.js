define([
    'settings',
    'Collections/Questions',
    'Collections/Answers',
    'text!templates/application.tmpl',
    'Views/Cards'
], function (settings, QuestionsCollection, AnswersCollection, template, CardsView) {
    return Backbone.View.extend({
        template: _.template(template),
        
        events: {
        },

        initialize: function () {
            this.questions = new QuestionsCollection(settings.cards.black);
            this.questions.reset(this.questions.shuffle(), {silent:true});
            this.answers = new AnswersCollection(settings.cards.white);
            this.answers.reset(this.answers.shuffle(), {silent:true});
            this.cardsView = new CardsView({
                answers: this.answers,
                questions: this.questions
            });
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template(this));
            this.$el.append(this.cardsView.el);
            return this;
        }
    });
});

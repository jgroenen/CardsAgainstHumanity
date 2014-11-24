define([
    'settings',
    'Collections/Questions',
    'Collections/Answers',
    'text!templates/application.tmpl',
    'Views/Cards',
    'cards'
], function (settings, QuestionsCollection, AnswersCollection, template, CardsView, cards) {
    return Backbone.View.extend({
        template: _.template(template),
        
        events: {
        },

        initialize: function () {
            //this.questions = new QuestionsCollection(settings.cards.black);
            this.questions = new QuestionsCollection(cards
                .filter(function (card) {
                    return card.cardType === "Q";
                })
                .map(function (card) {
                    card.question = card.text;
                    return card;
                })
            );
            this.questions.reset(this.questions.shuffle(), {silent:true});
            //this.answers = new AnswersCollection(settings.cards.white);
            this.answers = new AnswersCollection(cards
                .filter(function (card) {
                    return card.cardType === "A";
                })
                .map(function (card) {
                    card.answer = card.text;
                    return card;
                })
            );
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

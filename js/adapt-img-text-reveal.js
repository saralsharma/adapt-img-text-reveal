define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

    var ImageTextRevealView = ComponentView.extend({

        preRender: function() {
            // this.$el.addClass('no-state');
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();
            this.setupInviewCompletion();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        }

    });
    var ImageTextRevealModel = ComponentModel.extend({
        // implement your component model
    });
    return Adapt.register('imageTextReveal', {
        model: ImageTextRevealModel,
        view: ImageTextRevealView
    });
});

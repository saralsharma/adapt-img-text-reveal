define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

    var ImageTextRevealView = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
            this.checkIfResetOnRevisit();

        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize, true);
            this.setReadyStatus();
            // this.setupInview();
            this.showHideText();

            // this.setupInviewCompletion();
        },
        // setupInview: function() {
        //     var selector = this.getInviewElementSelector();
        //     if (!selector) {
        //         this.setCompletionStatus();
        //         return;
        //     }
        //     this.setupInviewCompletion(selector);
        // },
        /**
         * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
         */
        getInviewElementSelector: function() {
            if (this.model.get('body')) return '.component-body';

            if (this.model.get('instruction')) return '.component-instruction';

            if (this.model.get('displayTitle')) return '.component-title';

            return null;
        },
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },
        resizeImage: function(width, setupInView) {
            var imageWidth = width === 'medium' ? 'small' : width;
            var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
            this.$('.graphic-widget img').attr('src', imageSrc);

            this.$('.graphic-widget').imageready(function() {
                this.setReadyStatus();

                if (setupInView) {
                    this.setupInviewCompletion('.component-widget');
                }
            }.bind(this));
        },
        showHideText: function(){
            this.$(".graphic-widget img").click(function(){
                var revealTxtSelector=$('.imageTextReveal-item-revealText');
                if (revealTxtSelector.is(':visible')) revealTxtSelector.slideUp(this.duration); else {
                    revealTxtSelector.slideDown(this.duration);
                    this.setCompletionStatus();
                }
        });
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

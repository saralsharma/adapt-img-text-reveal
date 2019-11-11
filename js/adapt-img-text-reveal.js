define([
    'core/js/adapt',
    'core/js/views/componentView',
    'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

    var ImageTextRevealView = ComponentView.extend({

        events:{
          "click .graphic-widget img":"showHideText"
        },
        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.setReadyStatus();

        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },
        resizeImage: function(width) {
            var imageWidth = width === 'medium' ? 'small' : width;
            var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
            this.$('.graphic-widget img').attr('src', imageSrc);
            this.$('.graphic-widget').imageready(function() {
                this.setReadyStatus();

            }.bind(this));
        },

        showHideText: function(event){
            var duration=this.model.get('duration');
                event.preventDefault();
                // var revealTxtSelector=$(event.currentTarget).parent().siblings('.imageTextReveal-item-revealText');
                var revealTxtSelector=$("#"+this.model.get("_id")+"-revealTxt");

                if (revealTxtSelector.is(':visible')) revealTxtSelector.slideUp(duration); else {
                    revealTxtSelector.slideDown(duration);
                    if (this.model.get('_setCompletionOn') === 'inview') {
                        this.setupInviewCompletion('.component-widget');
                    }
                }

    }

    });
    var ImageTextRevealModel = ComponentModel.extend({
        // Model functions goes here

    });
    return Adapt.register('imageTextReveal', {
        model: ImageTextRevealModel,
        view: ImageTextRevealView
    });
});

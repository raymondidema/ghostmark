(function ( $ ) {
    $.fn.ghostmark = function( options ) {
        var settings = $.extend({
            // background: "#556b2f",
            markdownClass: "#ghostmark",
            mirrorClass: "#mirror",
            GhostRegex: /^!\[(|[\w\s]+)]\(([\w\-\:\/\.\~\%]*|)\)/igm,
            GhostConverter: {
                extensions: ['twitter', 'github', 'prettify', 'imagereplacement']
            },
            dropzoneConfig: {
                url: "/file-upload.php",
                createImageThumbnails: false,
                maxFiles: 1,
                dictDefaultMessage: '<span class="media"><i class="fa fa-picture-o"></i></span> Voeg hier je afbeelding toe',
                init: function () {
                    this.on("success", function (file) 
                    {
                        offset = $(this).get(0).element.dataset.offset;
                        link = file.xhr.response;
                        submitLinkImage(link, offset);
                    });
                }
            },
            codeMirror: {
                lineWrapping: true
            }
        }, options );
        var GhostConverter = new Showdown.converter(settings.GhostConverter);
        var GhostMirror = CodeMirror.fromTextArea(ghostmark, settings.codeMirror);

        var build = {
            converter: GhostConverter,
            mirror: GhostMirror,
            dropzone: settings.dropzoneConfig,
            regex: settings.GhostRegex,
            this: this
        };

        return build;
    };

    /**
     * WordCount Module
     * @param  {class} location listener
     * @return {mixed}
     */
    $.fn.wordCount = function ( options ) {
        var settings = $.extend( {}, $.fn.wordCount.defaults, options );
        if(this.text().length > 0)
            var count = $.trim(this.text()).split(/\s/).length;
        else
            var count = this.text().length;
        var wordcount = (count == 1) ? count + ' word' : count + ' words';
        $(settings.location).html(wordcount);
        return this;
    };

    /**
     * @type {Object}
     */
    $.fn.wordCount.defaults = {
        location: ".ghost-word-count"
    };

}( jQuery ));
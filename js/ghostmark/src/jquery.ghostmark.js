$(document).ready( function () {

    ghostMark = $('body').ghostmark();
    ghostMark.mirror.on("change", function (mirror, change) {
        mirror.save();
        markDownKey();
        prettyPrint();
    });

    markDownKey();
    $('body').on('submit', 'form', function (event) { event.preventDefault(); submitLinkImage($(this)); });
    $( '.CodeMirror-scroll' ).scroll(function ()
    {
        var codeHeight = $('.CodeMirror-code').height();
        var mirrorHeight = $('.ghostmirror').height();
        var percent = $(this).scrollTop()/codeHeight;
        console.log('codeheight: '+ codeHeight);
        $('.ghostmirror').scrollTop(percent*mirrorHeight);
    });

    $('body').on('click', '.ghost-url', function(e) {
        e.preventDefault();
        var offset = $(this).prev().attr(('data-offset'));
        var submitTemplate =    '<div class="ghost-add-link"><form data-offset="'+offset+'">'+
                                '<input type="text" placeholder="Add image from url...">'+
                                '<a href="#" class="ghost-close-link"><i class="fa fa-times"></i></a>'+
                                '</form></div>';
        $(this).parent().append(submitTemplate).find('.ghost-add-link').fadeIn(200, function() {
            $(this).find('input').focus();
        });
    });

    $('body').on('click', '.ghost-close-link', function(e) {
        e.preventDefault();
        $(this).parent().parent().fadeOut(200, function() {
            $(this).remove();
        });
    });

    $('body').on('click', '.ghost-trash', function(e){
        e.preventDefault();
        removeLinkImage($(this).attr('data-offset'));
    });

    $('body').on('submit', '.ghost-add-link form', function (e) {
        e.preventDefault();
        var itemOffset = $(this).attr('data-offset');
        submitLinkImage($(this).find('input').val(), itemOffset);
    });
});

/**
 * Converts Markdown
 * @return {mixed}
 */
function markDownKey() {
    var markdown = $('#ghostmark').val();
    $('#ghostmirror').html(ghostMark.converter.makeHtml(markdown));
    $(".dropzone-js").dropzone(ghostMark.dropzone);
    $('#ghostmirror').wordCount();
};
/**
 * Handles the submit link on the image
 * @param  {mixed} event
 * @return {mixed}
 */
function submitLinkImage(link, itemOffset) {
    var Content = $('#ghostmark').val();

    var newContent = Content.replace(ghostMark.regex, function (match, alt, src, offset, string) {
        if(offset+2 == itemOffset)
        {
            return '!['+alt+']('+link+')';
        }
        else
        {
            return match;
        }
    });
    ghostMark.mirror.setValue(newContent);
    ghostMark.mirror.save();
    markDownKey();
};

function removeLinkImage(itemOffset) {
    var Content = $('#ghostmark').val();

    var newContent = Content.replace(ghostMark.regex, function (match, alt, src, offset, string) {
        if(offset+2 == itemOffset)
        {
            return '!['+alt+']()';
        }
        else
        {
            return match;
        }
    });
    ghostMark.mirror.setValue(newContent);
    ghostMark.mirror.save();
    markDownKey();
};
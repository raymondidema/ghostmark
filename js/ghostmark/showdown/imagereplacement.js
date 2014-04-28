(function() {
    var imagereplacement = function(converter) {
        return [
            {
                type    : 'lang',
                filter  : function(text)
                {
                    var imageRegex = /^!\[(|[\w\s]+)]\(([\w\-\:\/\.\~\%]*|)\)/igm;
                    return text.replace(imageRegex, function(match, alt, src, offset, string){
                        if(src.length)
                        {
                            return '<section class="ghost-image"><a href="#" class="ghost-trash" data-offset="'+offset+'" title="Delete image?"><i class="fa fa-trash-o"></i></a><img src="'+src+'" alt="'+alt+'"></section>';
                        }else{
                            return  '<section class="ghost-upload">'+
                                    '<div id="new_'+offset+'" data-offset="'+offset+'" class="dropzone-js dropzone">'+
                                    '<div class="fallback"><input name="file" type="file" multiple /></div>'+
                                    '</div>'+
                                    '<a href="#" class="ghost-url" title="Add image from url"><i class="fa fa-link"></i></a>'+
                                    '</section>';
                            // return '<div><form id="new_'+offset+'" data-offset="'+offset+'"><input type="text" name="newlink" placeholder="new Link"><button type="submit">submit</button></form></div>';
                        }
                    });
                }
            }
        ];
    };

    // CLient-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.imagereplacement = imagereplacement; }
    if (typeof module !== 'undefined') module.exports = imagereplacement;
}());